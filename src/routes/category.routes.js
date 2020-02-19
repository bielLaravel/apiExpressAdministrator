const express = require('express');
const router = express.Router();
const categoryController = require('../controllers/category.controller.js');

router.get('/', categoryController.findAll);
router.post('/', categoryController.create);
router.get('/:id', categoryController.findOne);

module.exports = router
