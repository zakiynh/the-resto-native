const router = require('express').Router();
const Controller = require('../controllers/catController');

router.get('/', Controller.getCategories);
router.get('/:id', Controller.getCategoriesId);
router.post('/add', Controller.addCategories);
router.put('/update/:id', Controller.updateCategories);
router.delete('/delete/:id', Controller.deleteCategories);

module.exports = router;