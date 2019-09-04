var sponsorService = require('../Services/SponsorService');
_this = this;
const uuidv1 = require('uuid/v1');

exports.getAll = async function (req, res, next) {
    try {
        var sponsor = await sponsorService.getAll();
        return res.status(200).json({ status: 200, data: sponsor, message: "Succefully Sponsor Listed" });
    } catch (e) {
        return res.status(400).json({ status: 400, message: e.message });
    }
};


exports.create = async function (req, res, next) {

    var sponsor = {
        id: uuidv1(),
        urllogo: req.body.urllogo,
        urlpage: req.body.urlpage,
        name: req.body.name,
        position: req.body.position,
        type: req.body.type,
        createdby: req.body.createdby
    };

    try {
        var createdSponsor = await sponsorService.create(sponsor);
        return res.status(201).json({ status: 201, data: createdMenu, message: "Succesfully Created Sponsor" });
    } catch (e) {


        return res.status(400).json({ status: 400, message: "Sponsor Creation was Unsuccesfull" });
    }
};

exports.deleteById = async function (req, res, next) {
    var id = req.params.id;
    try {
        var deleted = await sponsorService.deleteById(id);
        return res.status(204).json({ status: 200, data: deleted, message: "Succesfully item Deleted" });
    } catch (e) {
        return res.status(400).json({ status: 400, data: false, message: e.message });
    }

};

exports.getSponsor = async function (req, res, next) {
    if (req.params.id === undefined) {
        return res.status(400).json({ status: 400, data: null, message: "Id Not be Null" });
    }
    var id = req.params.id;
    try {
        var result = await sponsorService.getSponsor(id);
        return res.status(200).json({ status: 200, data: result, message: "Succesfully Sponsor Listed" });
    } catch (e) {
        return res.status(400).json({ status: 400, message: e.message });
    }
};