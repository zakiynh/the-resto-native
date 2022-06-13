const Users = require('../models/users');
const bcrypt = require('../helpers/bcrypt');
const errorTypes = require('../utils/errorTypes');

class UserController {
    static async createUser(req, res, next) {
        try {
            let { username, email, password, phoneNumber, address } = req.body;
            if (!username || !email || !password || !phoneNumber || !address) throw { name: errorTypes.BadRequest };
            await Users.create({ username, email, password, role:'admin', phoneNumber, address });
            res.status(201).json({message: 'User created successfully'});
        } catch (error) {
            next(error);
        }
    }

    static async findAll(req, res, next) {
        try {
            const users = await Users.findAll();
            res.status(200).json(users);
        } catch (error) {
            next(error);
        }
    }

    static async findOne(req, res, next) {
        try {
            const id = req.params.id;
            if (!id) throw { name: errorTypes.missingId };
            const user = await Users.findOne(id);
            if (!user) throw { name: errorTypes.dataNotFound };
            res.status(200).json(user);
        } catch (error) {
            next(error);
        }
    }

    static async deleteUser(req, res, next) {
        try {
            const id = req.params.id;
            if (!id) throw { name: errorTypes.missingId };
            const user = await Users.deleteUser(id);
            if (!user) throw { name: errorTypes.dataNotFound };
            res.status(200).json({ message: 'User deleted successfully' });
        } catch (error) {
            next(error);
        }
    }
}

module.exports = UserController;