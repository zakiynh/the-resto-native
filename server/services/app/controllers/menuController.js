const { Item, User, Category, Ingredient, sequelize } = require('../models');

class Controller {
    static async getMenus(req, res, next) {
        try {
            const items = await Item.findAll({
                attributes: {
                    exclude: ['createdAt', 'updatedAt']
                },
                include: [{
                    model: Category,
                    attributes: {
                        exclude: ['createdAt', 'updatedAt']
                    },
                    key: 'categoryId'
                }, {
                    model: User,
                    attributes: {
                        exclude: ['createdAt', 'updatedAt']
                    },
                    key: 'userId'
                }, {
                    model: Ingredient,
                    attributes: {
                        exclude: ['createdAt', 'updatedAt']
                    },
                    key: 'itemId'
                }],
            });
            res.status(200).json(items);
        } catch (error) {
            next(error);
        }
    }

    static async getMenusId(req, res, next) {
        try {
            const { id } = req.params;
            const item = await Item.findByPk(id, {
                attributes: {
                    exclude: ['createdAt', 'updatedAt']
                },
                include: [{
                    model: Category,
                    attributes: {
                        exclude: ['createdAt', 'updatedAt']
                    },
                    key: 'categoryId'
                }, {
                    model: Ingredient,
                    attributes: {
                        exclude: ['createdAt', 'updatedAt']
                    },
                    key: 'itemId'
                }, {
                    model: User,
                    attributes: {
                        exclude: ['createdAt', 'updatedAt', 'password']
                    },
                    key: 'userId'
                }],
            });
            if(!item) throw { name: 'Item not found' }
            res.status(200).json(item);
        } catch (error) {
            next(error);
        }
    }
}

module.exports = Controller