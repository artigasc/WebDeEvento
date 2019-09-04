'use strict';
var express = require('express');
var router = express.Router();
var CountryController = require('../Controllers/CountryController');

router.get('/', CountryController.getAll);

router.get('/departament', CountryController.getDepartament);

router.get('/province', CountryController.getProvince);

router.get('/district', CountryController.getDistricts);

module.exports = router;