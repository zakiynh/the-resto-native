import { gql } from "@apollo/client";

export const GET_ALL_ITEMS = gql`
    query ExampleQuery {
        menus {
            id
            name
            description
            price
            imgUrl
            categoryId
            authorId
            Category {
                id
                name
            }
            Ingredients {
                id
                name
            }
        }
    }
`;

export const GET_ITEMS_ID = gql`
    query ExampleQuery($menuDetailId: ID!) {
        menuDetail(id: $menuDetailId) {
            id
            name
            description
            price
            imgUrl
            categoryId
            authorId
            Ingredients {
                id
                name
            }
            Category {
                id
                name
            }
        }
    }
`;
