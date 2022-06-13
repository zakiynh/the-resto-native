const redis = require('../config/redisConfig');
const axios = require('axios');
const baseUrl = 'http://localhost:4000';

class Controller {
    static async findAll(req, res, next) {
        try {
            let users
            let response = await redis.get('users');
            if (response) {
                users = JSON.parse(response);
            } else {
                response = await axios({
                    method: 'get',
                    url: baseUrl,
                })
                if (response.status !== 200) throw response.data
                users = response.data;
                redis.set('users', JSON.stringify(users));
            }
            res.status(200).json(users);
        } catch (error) {
            next(error);
        }
    }

    static async findOne(req, res, next) {
        try {
            let user
            let isFound = false
            let response = await redis.get('users');
            if (response) {
                const users = JSON.parse(response);
                user = users.find(user => user.id === parseInt(req.params.id))
                if (user) isFound = true;
            }

            if (!isFound) {
                response = await axios({
                    method: 'get',
                    url: baseUrl + '/' + req.params.id,
                })
                user = response.data;
            }
            res.status(200).json(user);
        } catch (error) {
            next(error);
        }
    }

    static async createUser(req, res, next) {
        try {
            const { username, email, password, phoneNumber, address } = req.body;
            let response = await axios({
                method: 'post',
                url: baseUrl + '/create',
                data: { username, email, password, role:'admin', phoneNumber, address }
            })
            if (response.status !== 201) throw response.data
            await redis.del('users');
            res.status(201).json({message: 'User created successfully'});
        } catch (error) {
            next(error);
        }
    }

    static async deleteUser(req, res, next) {
        try {
            let response = await axios({
                method: 'delete',
                url: baseUrl + '/' + req.params.id,
            })
            if (response.status !== 200) throw response.data
            await redis.del('users');
            res.status(200).json({ message: 'User deleted successfully' });
        } catch (error) {
            next(error);
        }
    }
}

module.exports = Controller;