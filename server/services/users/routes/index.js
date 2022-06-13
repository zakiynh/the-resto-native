const router = require('express').Router();
const Controller = require('../controllers/userController');

router.post('/create', Controller.createUser);
router.get('/', Controller.findAll);
router.get('/:id', Controller.findOne);
router.delete('/:id', Controller.deleteUser);

module.exports = router;