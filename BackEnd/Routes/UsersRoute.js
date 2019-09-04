'use strict';
var express = require('express');
var router = express.Router();
var UserController = require('../Controllers/UserController');
/* GET users listing. */

router.post('/', UserController.create);
router.get('/:id', UserController.getUser);
router.delete('/:id', UserController.deleteById);
router.get('/', UserController.getAll);
module.exports = router;  
