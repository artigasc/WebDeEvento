var ExhibitorService = require('../Services/ExhibitorService');
const uuidv1 = require('uuid/v1');

_this = this;

exports.getAll = async function (req, res, next) {
    try {
        var exhibitor = await ExhibitorService.getAll();
        //console.log(exhibitor);
        return res.status(200).json({ status: 200, data: exhibitor, message: "Succefully Exhibitor Listed" });
    } catch (e) {
        console.log("error");
        return res.status(400).json({ status: 400, message: e.message });
    }
};

exports.getExhibitor = async function (req, res, next) {
    var lang = req.query.lang;
    var id = req.params.id;
    try {
        var exhibitor;
        if (id !== undefined) {
            exhibitor = await ExhibitorService.getExhibitor(id,lang);
            //console.log(exhibitor);
        }
        return res.status(200).json({ status: 200, data: exhibitor, message: "Succefully Exhibitor Listed" });
    } catch (e) {
        return res.status(400).json({ status: 400, message: e.message });
    }
};

exports.create = async function (req, res, next) {
    try {
              
        var language = req.body.lang;
        var exhibitor = {
            id: uuidv1(),
            firstname: req.body.firstname,
            secondname: req.body.secondname,
            instruction: req.body.instruction,
            company: req.body.company,
            position: req.body.position,
            urlphoto: req.body.urlphoto,
            description: req.body.description,
            urlpresentation: req.body.urlpresentation,
            type: req.body.type,
            charge: req.body.charge,
            active: req.body.active,
            createdby: req.body.createdby
        };
            var createdExhibitor = await ExhibitorService.create(exhibitor, language);
               
        return res.status(201).json({ status: 201, data: createdExhibitor, message: "Succesfully Created Exhibitor " });
    } catch (e) {
        return res.status(400).json({ status: 400, data: false , message: "Exhibitor Creation was Unsuccesfull " + e.message });
    }
};

//falta actualizar
exports.update = async function (req, res, next) {
    var id = req.params.id;
    var exhibitor = {
        id,
        strid: req.body.strid ? req.body.strid : null,
        strfirstdname: req.body.strfirstdname ? req.body.strfirstdname : null,
        strsecondname: req.body.strsecondname ? req.body.strsecondname : null,
        strinstructioncharge: req.body.strinstructioncharge ? req.body.strinstructioncharge : null,
        strcompany: req.body.strcompany ? req.body.strcompany : null,
        intposition: req.body.intposition ? req.body.intposition : null,
        BitActive: req.body.BitActive ? req.body.BitActive : null,
        DttModifiedDate: req.body.DttModifiedDate ? req.body.DttModifiedDate : null,
        StrModifiedBy: req.body.StrModifiedBy ? req.body.StrModifiedBy : null
    };
    try {
        var updatedExhibitor = await ExhibitorService.update(exhibitor);
        return res.status(200).json({ status: 200, data: updatedExhibitor, message: "Succesfully Updated Exhibitor" });
    } catch (e) {
        return res.status(400).json({ status: 400., message: "Controller " + e.message });
    }
};
exports.delete = async function (req, res, next) {
    var id = req.params.id;
    try {
        if (id !== undefined) {
            var deleted = await ExhibitorService.remove(id);
        }       
        return res.status(200).json({ status: 200, message: "Succesfully Exhibitor Deleted" });
    } catch (e) {
        return res.status(400).json({ status: 400, message: e.message });
    }

};