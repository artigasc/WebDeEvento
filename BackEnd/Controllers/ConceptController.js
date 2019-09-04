var conceptService = require('../Services/ConceptService');
const uuidv1 = require('uuid/v1');


exports.getAll = async function (req, res, next) {
    try {
        var concept = await conceptService.getAll();
        return res.status(200).json({ status: 200, data: concept, message: "Succefully Concept Listed" });
    } catch (e) {
        return res.status(400).json({ status: 400, message: e.message });
    }
};

exports.create = async function (req, res, next) {
    if (req.body.lang === undefined) {
        return res.status(400).json({ status: 400, data: null, message: "Language Not be Null" });
    }
    var concept = {
        id: uuidv1(),
        name: req.body.name,
        category: req.body.category,
        startdate: req.body.startdate,
        enddate: req.body.enddate,
        createdby: req.body.createdby
    };
    try {
        var createdConcept = await conceptService.create(concept, req.body.lang);
        return res.status(201).json({ status: 201, data: createdConcept, message: "Succesfully Created Concept" });
    } catch (e) {
        return res.status(400).json({ status: 400, message: "Menu Creation was Unsuccesfull" });
    }
};

exports.getConcept = async function (req, res, next) {
    if (req.params.id === undefined) {
        return res.status(400).json({ status: 400, data: null, message: "Id Not be Null" });
    }
    var id = req.params.id;
    var lang = req.query.lang;
    try {
        var result = await conceptService.getConcept(id, lang);
        return res.status(200).json({ status: 200, data: result, message: "Succesfully Concept Listed" });
    } catch (e) {
        return res.status(400).json({ status: 400, message: e.message });
    }
};