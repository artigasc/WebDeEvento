'use strict';
var express = require('express');
var router = express.Router();
var PaymentController = require('../Controllers/PaymentController');

router.get('/', PaymentController.getAll);
//router.post('/', PaymentController.create);
router.get('/:id', PaymentController.getPayment);
router.delete('/:id', PaymentController.deleteById);
router.put('/:id', PaymentController.updateById);
module.exports = router; 