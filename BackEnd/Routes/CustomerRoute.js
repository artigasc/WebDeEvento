'use strict';
var express = require('express');
var router = express.Router();
var  CustomerController = require('../Controllers/CustomerController');
/* GET users listing. */

router.get('/getAll', CustomerController.getAll);
router.get('/',  CustomerController.get);
router.post('/',  CustomerController.create);
router.delete('/:id',  CustomerController.delete);
module.exports = router; 
