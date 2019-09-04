var Service = require('../Services/MasterService');
_this = this;


exports.getAll = async function (req, res, next) {
    try {
        var lang = req.query.lang;
        var master = await Service.getAll(lang);
        return res.status(200).json({ status: 200, data: master, message: "Succefully Menu Listed" });
    } catch (e) {
        return res.status(400).json({ status: 400, message: e.message });
    }
};


exports.TypeDocument = async function (req, res, next) {
    try {
        var code = req.params.id;
        var lang = req.query.lang;
        var master = await Service.getTypeDocumentByCode(code,lang);
        return res.status(200).json({ status: 200, data: master, message: "Succefully Menu Listed" });
    } catch (e) {
        return res.status(400).json({ status: 400, message: e.message });
    }
};

exports.NameNationality = async function (req, res, next) {
    try {
        var code = req.query.code;
        var lang = req.query.lang;
        var master = await Service.getNameNationalityByCode(code, lang);
        return res.status(200).json({ status: 200, data: master, message: "Succefully Menu Listed" });
    } catch (e) {
        return res.status(400).json({ status: 400, message: e.message });
    }
};

exports.MethodPayment = async function (req, res, next) {
    try {
        var code = req.query.code;
        var lang = req.query.lang;
        var master = await Service.getMethodPaymentByCode(code, lang);
        return res.status(200).json({ status: 200, data: master, message: "Succefully Menu Listed" });
    } catch (e) {
        return res.status(400).json({ status: 400, message: e.message });
    }
};

exports.TaxDocument = async function (req, res, next) {
    try {
        var code = req.query.code;
        var lang = req.query.lang;
        var master = await Service.getNameTaxDocumentByCode(code, lang);
        return res.status(200).json({ status: 200, data: master, message: "Succefully Menu Listed" });
    } catch (e) {
        return res.status(400).json({ status: 400, message: e.message });
    }
};

exports.TypeCustomer = async function (req, res, next) {
    try {
        var code = req.query.code;
        var lang = req.query.lang;
        var master = await Service.getTypeCustomerByCode(code, lang);
        return res.status(200).json({ status: 200, data: master, message: "Succefully Menu Listed" });
    } catch (e) {
        return res.status(400).json({ status: 400, message: e.message });
    }
};