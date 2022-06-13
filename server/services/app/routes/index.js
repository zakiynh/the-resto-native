const express = require('express');
const router = express.Router();
const userRouter = require('./users');
const categoryRouter = require('./categories');
const itemRouter = require('./items');
const menuRouter = require('./menus');

router.use('/user', userRouter);
router.use('/categories', categoryRouter);
router.use('/items', itemRouter);
router.use('/menus', menuRouter)

module.exports = router