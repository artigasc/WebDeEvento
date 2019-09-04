'use stirct';
var express = require('express');
var router = express.Router();
var FormController = require('../Controllers/FormController');

router.get('/', FormController.getAll);
router.get('/:id', FormController.getById);
//router.get('/by', FormController.getBy);

module.exports = router;