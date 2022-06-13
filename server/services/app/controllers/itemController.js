const { Item, User, Category, Ingredient, sequelize } = require('../models');

class Controller {
    static async getItems(req, res, next) {
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

    static async getItemsId(req, res, next) {
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

    static async addItems(req, res, next) {
        const t = await sequelize.transaction();
        try {
            const { name, description, price, imgUrl, categoryId, ingredients, authorId } = req.body;
            const item = await Item.create({ name, description, price, imgUrl, categoryId, authorId }, { transaction: t });
            
            let arr = [];
            ingredients.split(',').forEach((ingredient) => {
                arr.push({
                    itemId: item.id,
                    name: ingredient,
                })
            });

            await Ingredient.bulkCreate(arr, { transaction: t });
            await t.commit();
            res.status(201).json({ message: "Create item successfull" });
        } catch (error) {
            console.log(error)
            await t.rollback();
            next(error)
        }
    }

    static async updateItems(req, res, next) {
        const t = await sequelize.transaction();
        try {
            const { id } = req.params;
            const { name, description, price, imgUrl, categoryId, ingredients } = req.body;
            const item = await Item.findByPk(id);
            if(!item) throw { name: 'Item not found' }
            await Item.update({ name, description, price, imgUrl, categoryId }, { where: { id } }, { transaction: t });
            await Ingredient.destroy({ where: { itemId: id } }, { transaction: t });
            
            let arr = [];
            ingredients.split(',').forEach((ingredient) => {
                arr.push({
                    itemId: id,
                    name: ingredient
                })
            });
            await Ingredient.bulkCreate(arr, { transaction: t });
            await t.commit();
            res.status(200).json({ message: 'Item updated successfully' });
        } catch (error) {
            await t.rollback();
            next(error)
        }
    }

    static async deleteItems(req, res, next) {
        try {
            const { id } = req.params;
            const item = await Item.findByPk(id);
            if(!item) throw { name: 'Item not found' }
            await item.destroy({ where: { id } });
            res.status(200).json({ message: 'Item deleted successfully' });
        } catch (error) {
            next(error);
        }
    }
}

module.exports = Controller