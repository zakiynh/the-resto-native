if (process.env.NODE_ENV !== "production") {
    require("dotenv").config();
}
const { ApolloServer, gql } = require("apollo-server");
const redis = require("./config/redisConfig");
const axios = require("axios");
const PORT = process.env.PORT || 4000;

const typeDefs = gql`
    type Ingredient {
        id: ID
        name: String
    }
    type User{
        _id: ID
        username: String
        email: String
        role:String
        password: String
        phoneNumber: String
        address: String
    }
    type Menu {
        id: ID
        name:String
        description:String
        price:String
        imgUrl:String
        categoryId:Int
        authorId:String
        Category:Category
        Ingredients:[Ingredient]
    }
    type MenuDetail{
        id: ID
        name:String
        description:String
        price:String
        imgUrl:String
        categoryId:Int
        authorId:String
        Ingredients:[Ingredient]
        User:User
        Category:Category
    }
    type Category {
        id: ID
        name: String!
    }
    type Query {
        ingredients:[Ingredient]
        menus(input: MenuInput):[Menu]
        categories:[Category]
        users:[User]
        user(_id:ID!):User
        menuDetail(id:ID!):MenuDetail
    }  
    type createResponse {
        message: String
    }
    input ingredientsInput{ 
        name:String
    }
    input MenuFilters{
        categoryId: ID
        name: String
    }
    input MenuInput{
        filter: MenuFilters
    }
    type Mutation {
        createMenu(
            name:String! 
            description:String! 
            price:Int! 
            imgUrl:String! 
            categoryId:Int! 
            authorId:Int! 
            ingredients:String!
            ) : createResponse
        updateMenu(id:ID!,name:String!,description:String!,price:Int!,imgUrl:String!,categoryId:Int!,authorId:String!,ingredients:[ingredientsInput]!):String
        deleteMenu(id:ID!):String
        createUser(username:String!,email:String!,password:String!,phoneNumber:String!,address:String!,role:String!):String
        deleteUser(id:ID!):String
    } 
`;


const resolvers = {
    Query: {
        menus: async (parent, args) => {
            try {
                let items;
                let response = await redis.get("items");
                if (response) {
                    items = JSON.parse(response);
                } else {
                    response = await axios({
                        method: "get",
                        url: process.env.APP_URL + "/items",
                    });
                    if (response.status !== 200) throw response.data;
                    items = response.data;
                    redis.set("items", JSON.stringify(items));
                }
                return items;
            } catch (error) {
                return error;
            }
        },
        menuDetail: async (parent, args) => {
            try {
                let item;
                let isFound = false;
                const id = args.id;
                let response = await redis.get("items");
                if (response) {
                    const items = JSON.parse(response);
                    item = items.find(item => item.id === parseInt(id));
                    if (item) isFound = true;
                }
                if (!isFound) {
                    response = await axios({
                        method: "get",
                        url: process.env.APP_URL + "/items/" + id,
                    });
                    if (response.status !== 200) throw response.data;
                    item = response.data;
                }

                return item;
            } catch (error) {
                return error;
            }
        },
        categories: async () => {
            try {
                let categories;
                let response = await redis.get("categories");
                if (response) {
                    categories = JSON.parse(response);

                } else {
                    response = await axios({
                        method: "get",
                        url: process.env.APP_URL + "/categories",
                    });
                    if (response.status !== 200) throw response.data;
                    categories = response.data;
                    redis.set("categories", JSON.stringify(categories));
                }
                return categories;
            } catch (error) {
                return error;
            }
        },
        users: async () => {
            try {
                let users;
                let response = await redis.get("users");
                if (response) {
                    users = JSON.parse(response);
                } else {
                    response = await axios({
                        method: "get",
                        url: process.env.USERS_URL + "/users",
                    });
                    if (response.status !== 200) throw response.data;
                    users = response.data;
                    redis.set("users", JSON.stringify(users));
                }
                return users;
            } catch (error) {
                return error
            }
        },
        user: async (parent, args) => {
            try {
                let user;
                let isFound = false;
                const id = args._id;
                let response = await redis.get("users");
                if (response) {
                    const users = JSON.parse(response);
                    user = users.find(user => user.id === parseInt(id));
                    if (user) isFound = true;
                }

                if (!isFound) {
                    response = await axios({
                        method: "get",
                        url: process.env.USERS_URL + "/" + id,
                    });
                    user = response.data;
                }
                return user;
            } catch (error) {
                return error;
            }
        }

    },
    Mutation: {
        createMenu: async (parent, args) => {
            try {
                const { name, description, price, imgUrl, categoryId, ingredients, authorId } = args;
                const response = await axios({
                    method: "post",
                    url: process.env.APP_URL + "/items/add",
                    data: { name, description, price, imgUrl, categoryId, ingredients, authorId }
                });
                if (response.status !== 200) throw response.data;
                await redis.del("items");
                return {message: "Success!"};
            } catch (error) {
                return error.message;
            }
        },
        updateMenu: async (parent, args) => {
            try {
                const { name, description, price, imgUrl, categoryId, ingredients, authorId } = args;
                const response = await axios({
                    method: "put",
                    url: process.env.APP_URL + "/items/" + args.id,
                    data: { name, description, price, imgUrl, categoryId, ingredients, authorId }
                });
                if (response.status !== 200) throw response.data;
                await redis.del("items");
                return response.data.message;
            } catch (error) {
                return error.message;
            }
        },
        deleteMenu: async (parent, args) => {
            try {
                const response = await axios({
                    method: "delete",
                    url: process.env.APP_URL + "/items/" + args.id,
                });
                if (response.status !== 200) throw response.data;
                await redis.del("items");
                return response.data.message;
            } catch (error) {
                return error.message;
            }
        },
        createUser: async (parent, args) => {
            try {
                let { username, email, password, role, phoneNumber, address } = args;
                const response = await axios({
                    method: "post",
                    url: process.env.USERS_URL + "/users",
                    data: { username, email, password, role, phoneNumber, address }
                });
                if (response.status !== 201) throw response.data;
                await redis.del("users");
                return response.data.message;
            } catch (error) {
                return error.message;
            }
        },
        deleteUser: async (parent, args) => {
            try {
                const response = await axios({
                    method: "delete",
                    url: process.env.USERS_URL + "/users/" + args.id,
                });
                if (response.status !== 200) throw response.data;
                await redis.del("users");
                return response.data.message;
            } catch (error) {
                return error.message;
            }
        }
    }
}

const server = new ApolloServer({
    typeDefs,
    resolvers,
    introspection: true,
    playground: true,
});
server.listen(PORT).then(({ url }) => {
    console.log(`🚀 Server ready at ${url}`);
});
