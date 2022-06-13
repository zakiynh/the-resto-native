const router = require('express').Router();
const Controller = require('../controllers/itemController');

router.get('/', Controller.getItems);
router.get('/:id', Controller.getItemsId);
router.post('/add', Controller.addItems);
router.put('/update/:id', Controller.updateItems);
router.delete('/delete/:id', Controller.deleteItems);

module.exports = router