var customerService = require('../Services/CustomerService');
const uuidv1 = require('uuid/v1');
_this = this;


exports.create = async function (req, res, next) {
    var customer = {
        id: uuidv1(),
        firstname: req.body.firstname,
        secondname: req.body.secondname,
        identitynumber: req.body.identitynumber,
        identitynumbertype: req.body.identitynumbertype,
        nacionality: req.body.nacionality,
        numbercompany: req.body.numbercompany,
        numbertypecompany: req.body.numbertypecompany,
        namecompany: req.body.namecompany,
        charge: req.body.charge,
        instructiongrade: req.body.instructiongrade,
        position: req.body.position,
        address: req.body.address,
        phone: req.body.phone,
        celular: req.body.celular,
        email: req.body.email,
        district: req.body.district,
        type: req.body.type,
        strcreatedby: req.body.createdby
    };

    try {
       
        var createdMenu = await customerService.create(customer);
        return res.status(201).json({ status: 201, data: createdMenu, message: "Succesfully Created User" });
    } catch (e) {
        return res.status(400).json({ status: 400, message: "User Creation was Unsuccesfull" });
    }
};

exports.delete = async function (req, res, next) {
    var id = req.params.id;
    
    try {
        var deleted = await customerService.delete(id);
        return res.status(204).json({ status: 200, data: true, message: "Succesfully Customer Deleted" });
    } catch (e) {
        return res.status(400).json({ status: 400, data: false, message: e.message });
    }

};

exports.get = async function (req, res, next) {
    var id = req.query.id;
    if (id === undefined) {
        return res.status(400).json({ status: 400, data: null, message: "Id Not be Null" });
    }
    try {
        var result = await customerService.get(id);
        return res.status(200).json({ status: 200, data: result, message: "Succesfully Customer Listed" });
    } catch (e) {
        return res.status(400).json({ status: 400, message: e.message });
    }
};

exports.getAll = async function (req, res, next) {    
    try {
        var result = await customerService.getAll();
        return res.status(200).json({ status: 200, data: result, message: "Succesfully Customer Listed" });
    } catch (e) {
        return res.status(400).json({ status: 400, message: e.message });
    }
};