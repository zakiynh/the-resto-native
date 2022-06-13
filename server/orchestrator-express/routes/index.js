const router = require('express').Router();
const items = require('./items');
const categories = require('./categories');
const users = require('./users');

router.use('/items', items);
router.use('/categories', categories);
router.use('/users', users);

module.exports = router;