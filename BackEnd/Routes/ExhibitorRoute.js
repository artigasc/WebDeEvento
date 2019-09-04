'use strict';
var express = require('express');
var router = express.Router();
var ExhibitorController = require('../Controllers/ExhibitorController');

router.get('/', ExhibitorController.getAll);
router.get('/:id', ExhibitorController.getExhibitor);
router.post('/', ExhibitorController.create);
router.put('/:id', ExhibitorController.update);
router.delete('/:id', ExhibitorController.delete);

module.exports = router;