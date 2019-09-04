'use strict';
var express = require('express');
var router = express.Router();
var LanguageController = require('../Controllers/LanguageController');

router.get('/:id', LanguageController.getLanguage);
router.get('/', LanguageController.getAll);
router.post('/', LanguageController.create);
router.delete('/:id', LanguageController.remove);

module.exports = router;