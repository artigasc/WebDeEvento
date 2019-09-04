var paymentService = require('../Services/PaymentService');
const uuidv1 = require('uuid/v1');

exports.getAll = async function (req,res,next) {
    try {
        payment = await paymentService.getAll();        
        return res.status(200).json({ status: 200, data: payment, message: "Succefully Event Listed" });
    } catch (e) {
        return res.status(400).json({ status: 400, message: e.message });
    }
};

//exports.create = async function (req, res, next) {
//    var payment = {
//        id: uuidv1(),
//        idcustomer: req.body.idcustomer,
//        idconcept: req.body.idconcept,
//        PaymentDetail: req.body.PaymentDetail,
//        createdby: req.body.createdby,
//console.log();
//        fichvmetpag: req.body.fichvmetpag,
//        fichvestpag: req.body.fichvestpag,
//        fichvidpag: req.body.fichvidpag,
//        fichvcmesspago: req.body.
//
//    };
//    try {
//        var createdPayment = await paymentService.create(payment);
//        return res.status(201).json({ status: 201, data: createdPayment, message: "Succesfully Created Payment" });
//    } catch (e) {        
//        return res.status(400).json({ status: 400, message: e.message+ " Payment Creation was Unsuccesfull" });
//    }
//};

exports.getPayment = async function (req, res, next) {
    var id = req.params.id;
    if (id === undefined) {
        return res.status(400).json({ status: 400, data: null, message: "Id Not be Null" });
    }    
    try {
        var result = await paymentService.getPayment(id);
        return res.status(200).json({ status: 200, data: result, message: "Succesfully Payment Listed" });
    } catch (e) {
        return res.status(400).json({ status: 400, message: e.message });
    }
};
exports.deleteById = async function (req,res,next) {
    if (req.params.id === undefined) {
        return res.status(400).json({ status: 400, data: null, message: "Id Not be Null" });
    }
    var id = req.params.id;
    try {
        var result = await paymentService.deleteById(id);
        return res.status(200).json({ status: 200, message: "Succesfully Payment Deleted" });
    } catch (e) {
        return res.status(400).json({ status: 400, message: e.message });
    }
};
exports.updateById = async function (req,res,next) {
    try {
        var idpayment = req.params.idpayment;
        var newPayment = {
            idcustomer: req.body.idcustomer ? req.body.idcustomer : null,
            idconcept: req.body.idconcept ? req.body.idconcept : null,
            active: req.body.active ? req.body.active : null,
            modifieddate: new Date(),
            modifiedby: req.body.modifiedby ? req.body.modifiedby : null
        };
        var updatedPayment = await paymentService.updateById(idpayment, newPayment);        
        return res.status(200).json({ status: 200, data: updatedPayment, message: "Succesfully Updated Hall of Event" });
    } catch (e) {
        return res.status(400).json({ status: 400, message: e.message });
    }
};