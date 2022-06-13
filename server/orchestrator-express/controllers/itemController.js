const redis = require("../config/redisConfig");
const axios = require("axios");
const baseUrl = "http://localhost:3000/items";

class Controller {
    static async findAll(req, res, next) {
        try {
            let items;
            let response = await redis.get("items");
            console.log("response: ");
            if (response) {
                items = JSON.parse(response);
            } else {
                response = await axios({
                    method: "get",
                    url: baseUrl,
                });
                if (response.status !== 200) throw response.data;
                items = response.data;
                redis.set("items", JSON.stringify(items));
            }
            res.status(200).json(items);
        } catch (error) {
            console.log(error)
            next(error);
        }
    }

    static async findOne(req, res, next) {
        try {
            let items;
            let response = await redis.get("items");
            if (response.length) {
                items = JSON.parse(response);
            } else {
                response = await axios({
                    method: "get",
                    url: baseUrl + '/' + req.params.id,
                });
                if (response.status !== 200) throw response.data;
                items = response.data;
                redis.set("items", JSON.stringify(items));
            }
            res.status(200).json(items);
        } catch (error) {
            console.log(error, 'ERROR FIND ONE')
            next(error);
        }
    }

    static async createItem(req, res, next) {
        try {
            const { name, description, price, imgUrl, categoryId, ingredients, authorId } = req.body;
            let response = await axios({
                method: "post",
                url: baseUrl + '/add',
                data: {
                    name,
                    description,
                    price,
                    imgUrl,
                    categoryId,
                    ingredients,
                    authorId
                }
            })
            if (response.status !== 201) throw response.data;
            await redis.del("items");
            res.status(200).json(response.data);
        } catch (error) {
            next(error);
        }
    }

    static async updateItem(req, res, next) {
        try {
            const { name, description, price, imgUrl, categoryId, ingredients, authorId } = req.body;
            let response = await axios({
                method: "put",
                url: baseUrl + '/update/' + req.params.id,
                data: {
                    name,
                    description,
                    price,
                    imgUrl,
                    categoryId,
                    ingredients,
                    authorId
                }
            })
            if (response.status !== 200) throw response.data;
            await redis.del("items");
            res.status(200).json(response.data);
        } catch (error) {
            console.log(error, 'UPDATE ERROR')
            next(error);
        }
    }

    static async deleteItem(req, res, next) {
        try {
            let response = await axios({
                method: "delete",
                url: baseUrl + '/delete/' + req.params.id,
            })
            if (response.status !== 200) throw response.data;
            await redis.del("items");
            res.status(200).json(response.data);
        } catch (error) {
            console.log(error, 'DELETE ERROR')
            next(error);
        }
    }
}

module.exports = Controller;
