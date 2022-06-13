const router = require('express').Router();
const Controller = require('../controllers/itemController');

router.get('/', Controller.findAll);
router.post('/add', Controller.createItem);
router.get('/:id', Controller.findOne);
router.put('/:id', Controller.updateItem);
router.delete('/:id', Controller.deleteItem);

module.exports = router;