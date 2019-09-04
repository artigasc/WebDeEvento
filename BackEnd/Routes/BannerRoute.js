'use strict';
var express = require('express');
var router = express.Router();
var controller = require('../Controllers/BannerController');
/* GET users listing. */

router.post('/:id', controller.add);
router.put('/:id', controller.edit);
router.delete('/:id', controller.deleteById);

//router.post('/getCategory', controller.getCatgory);

module.exports = router; 
