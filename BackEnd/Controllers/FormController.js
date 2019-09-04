var FormService = require('../Services/FormService');
var macha = require('../Services/MasterService');
_this = this;

exports.getAll=async function(req,res,next){
    try {
        var form = await FormService.getAll();
        return res.status(200).json({ status: 200, data: form, message: "Succefully Form Listed" });
    } catch (e) {
        return res.status(400).json({ status: 400, message: e.message });
    }
};

exports.getById = async function (req, res, next) {
    try {
        id = req.params.id;
        lang = req.query.lang;
        var form = await FormService.getById(id,lang);

        return res.status(200).json({ status: 200, data: form, message: "Succefully Form by Id Listed" });
    } catch (e) {
        return res.status(400).json({ status: 400, message: e.message });
    }
};

exports.getBy = async function (req, res, next) {
    try {
        id = req.query.id;
        lang = req.query.lang;

        var form = await FormService.getBy(id, lang);

        return res.status(200).json({ status: 200, data: form, message: "Succefully Form by Id Listed" });
    } catch (e) {
        return res.status(400).json({ status: 400, message: e.message });
    }
}; 