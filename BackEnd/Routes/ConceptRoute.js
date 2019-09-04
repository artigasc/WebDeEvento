'use strict';
var express = require('express');
var router = express.Router();
var ConceptController = require('../Controllers/ConceptController');

router.get('/', ConceptController.getAll);
router.post('/', ConceptController.create);
router.get('/:id', ConceptController.getConcept);

module.exports = router; 