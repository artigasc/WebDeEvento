'use strict';
var express = require('express');
var router = express.Router();
var Controller = require('../Controllers/IncomingController');

router.get('/', Controller.getAll);
//router.get('/:id', Controller.getEvent);
//router.post('/', Controller.create);
//router.put('/:id', Controller.update);
//router.delete('/:id', Controller.delete);

module.exports = router;