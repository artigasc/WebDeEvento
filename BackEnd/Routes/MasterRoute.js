'use stirct';
var express = require('express');
var router = express.Router();
var Controller = require('../Controllers/MasterController');

router.get('/typedocument', Controller.getAll);
router.get('/typedocument/:id', Controller.TypeDocument);
router.get('/namenationality', Controller.NameNationality);
router.get('/methodpayment', Controller.MethodPayment);
router.get('/taxdocument', Controller.TaxDocument);
router.get('/typecustomer', Controller.TypeCustomer);


module.exports = router;