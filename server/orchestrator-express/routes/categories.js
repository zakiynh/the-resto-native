const router = require('express').Router();
const Controller = require('../controllers/categoryController');

router.get('/', Controller.findAll);
router.post('/add', Controller.addCategories);

module.exports = router;