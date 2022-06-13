const { Category } = require('../models');

class Controller {
    static async getCategories(req, res, next) {
        try {
            const categories = await Category.findAll({
                attributes: {
                    exclude: ['createdAt', 'updatedAt']
                },
                order: [['id', 'DESC']]
            });
            res.status(200).json(categories);
        } catch (error) {
            next(error);
        }
    }

    static async getCategoriesId(req, res, next) {
        try {
            const { id } = req.params;
            const categories = await Category.findByPk(id,{
                attributes: {
                    exclude: ['createdAt', 'updatedAt']
                }
            });
            res.status(200).json(categories);
        } catch (error) {
            next(error);
        }
    }

    static async addCategories(req, res, next) {
        try {
            const { name } = req.body;
            const categories = await Category.create({
                name
            });
            res.status(201).json({
                message: 'Category created successfully',
                data: {
                    id: categories.id,
                    name: categories.name
                }
            });
        } catch (error) {
            next(error);
        }
    }

    static async updateCategories(req, res, next) {
        try {
            const { id } = req.params;
            const { name } = req.body;
            const category = await Category.findByPk(id)
            if(!category) throw { name: 'Category not found' }
            await Category.update({ name }, { where: { id } });
            res.status(200).json({ message: 'Category updated successfully' });
        } catch (error) {
            console.log(error)
            next(error);
        }
    }

    static async deleteCategories(req, res, next) {
        try {
            const { id } = req.params;
            const category = await Category.findByPk(id)
            if(!category) throw { name: 'Category not found' }
            await Category.destroy({ where: { id } });
            res.status(200).json({ message: 'Category deleted successfully' });
        } catch (error) {
            next(error);
        }
    }
}

module.exports = Controller