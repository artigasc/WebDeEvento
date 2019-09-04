'use strict';
var express = require('express');
var router = express.Router();
var SponsorController = require('../Controllers/SponsorController');
/* GET users listing. */

router.post('/', SponsorController.create);
router.get('/:id', SponsorController.getSponsor);
router.get('/', SponsorController.getAll);
router.delete('/:id', SponsorController.deleteById);
module.exports = router; 