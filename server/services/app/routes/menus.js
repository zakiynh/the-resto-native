const router = require('express').Router();
const Controller = require('../controllers/menuController');

router.get('/', Controller.getMenus);
router.get('/:id', Controller.getMenusId);

module.exports = router