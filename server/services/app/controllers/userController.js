const { User } = require('../models');
const { comparePassword } = require('../helpers/bcrypt');
const { signPayload } = require('../helpers/jwt');

class Controller {
    static async register(req, res, next) {
        const { name, email, password } = req.body;
        try {
            const newUser = await User.create({
                name,
                email,
                password,
                role: 'admin'
            });
            res.status(201).json({
                message: 'User created successfully',
                data: {
                    id: newUser.id,
                    name: newUser.name,
                    email: newUser.email,
                }
            });
        } catch (error) {
            next(error);
        }
    }

    static async login(req, res, next) {
        const { email, password } = req.body;
        try {
            const user = await User.findOne({
                where: {
                    email
                }
            });
            if (!user) {
                throw { name: 'incorrectLogin' };
            }
            const isMatch = comparePassword(password, user.password);
            if (!isMatch) {
                throw { name: 'incorrectLogin' };
            }
            const payload = {
                id: user.id,
                name: user.name,
                email: user.email,
                role: user.role
            };
            const access_token = signPayload(payload);
            res.status(200).json({
                message: 'Login success',
                data: {
                    access_token,
                    id: user.id,
                    name: user.name,
                    email: user.email,
                    role: user.role
                }
            });
        } catch (error) {
            next(error);
        }
    }
}

module.exports = Controller