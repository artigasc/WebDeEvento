'use strict';
var MenuController = require('../Controllers/MenuController');
var express = require('express');
var router = express.Router();

router.get('/', MenuController.getAll);

router.get('/:id', MenuController.getSubmenu);

module.exports = router;