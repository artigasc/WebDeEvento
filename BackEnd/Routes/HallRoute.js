'use strict';
var express = require('express');
var router = express.Router();
var HallController = require('../Controllers/HallController');
/* GET users listing. */

router.post('/', HallController.create);
router.get('/', HallController.getAll);
router.delete('/:id', HallController.deleteById);
router.get('/:id', HallController.getHall);
module.exports = router; 