const { Item } = require('../models');
async function authorize(req, res, next) {
    try {
        if (req.user.role !== 'admin') throw { name: 'Forbidden' }
        next();
    } catch (error) {
        console.log(error);
        next(error);
    }
}

module.exports = authorize;