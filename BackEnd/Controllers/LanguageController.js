var LanguageService = require('../Services/LanguageService');
const uuidv1 = require('uuid/v1');

_this = this;

exports.getLanguage = async function (req, res, next) {
try {
    var id = req.params.id;
    var language;
    if (id !== undefined) {
            language = await LanguageService.getLanguage(id);
        }
        return res.status(200).json({ status: 200, data: language, message: "Succefully Language Listed" });
    } catch (e) {
        return res.status(400).json({ status: 400, message: e.message });
    }
};


exports.getAll = async function (req, res, next) {
    try {
        var Result = await LanguageService.getAll();
       
        return res.status(200).json({ status: 200, data: Result, message: "Succesfully Lenguaje Recieved" });
        
    } catch (e) {
        return res.status(400).json({ status: 400, message: e.message });
    }
};
exports.create = async function (req, res, next) {
try {
    var name = req.body.name;
  
        var language = {
            strid: uuidv1(),
            strname: req.body.name,
            strdescription: req.body.description,
            bitactive: req.body.active,
            dttcreationdate: new Date(),
            dttmodifieddate: null,
            strcreatedby: req.body.createdby
        };

        var createdLanguage = await LanguageService.create(language, name);
    
            return res.status(201).json({ status: 200, data: createdLanguage, message: "Succesfully Created Language" });
        } catch (e) {

            return res.status(400).json({ status: 400, message: "Language Creation was Unsuccesfull " + e.message });
        }

};
exports.remove = async function (req, res, next) {
    var id = req.params.id;
    try {
        if (id !== undefined) {
            var deleted = await LanguageService.remove(id);
        }
        return res.status(200).json({ status: 200, message: "Succesfully Language Deleted" });
    } catch (e) {
        return res.status(400).json({ status: 400, message: e.message });
    }
};