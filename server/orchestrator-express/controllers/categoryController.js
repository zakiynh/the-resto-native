const redis = require("../config/redisConfig");
const axios = require("axios");
const baseUrl = "http://localhost:3000/categories";

class Controller {
    static async findAll(req, res, next) {
        try {
            let categories
            let response = await redis.get('categories');
            if (response) {
                categories = JSON.parse(response);
            } else {
                response = await axios({
                    method: 'get',
                    url: baseUrl,
                })
                if (response.status !== 200) throw response.data
                categories = response.data;
                redis.set('categories', JSON.stringify(categories));
            }
            res.status(200).json(categories);
        } catch (error) {
            next(error);
        }
    }

    static async addCategories(req, res, next) {
        try {
            const { name } = req.body;
            let response = await axios({
                method: 'post',
                url: baseUrl + '/add',
                data: { name }
            })
            if (response.status !== 201) throw response.data
            await redis.del('categories');
            res.status(201).json({message: 'Category created successfully'});
        } catch (error) {
            next(error);
        }
    }
}

module.exports = Controller;