'use strict';
var express = require('express');
var router = express.Router();
var CategoryController = require('../Controllers/CategoryController');
/* GET users listing. */

router.post('/create', CategoryController.create);
router.get('/', CategoryController.getAll);
router.get('/:id', CategoryController.getCategory);
router.delete('/:id', CategoryController.deleteById);
module.exports = router; 
