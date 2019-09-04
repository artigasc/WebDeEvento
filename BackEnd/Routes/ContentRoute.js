'use strict';
var express = require('express');
var router = express.Router();
var controller = require('../Controllers/ContentController');
/* GET users listing. */

router.get('/', controller.get);
module.exports = router; 
