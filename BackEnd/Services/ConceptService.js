var mongoose = require('mongoose');
var hub = require('../Models/HubModel');
const uuidv1 = require('uuid/v1');
exports.getAll = async function () {
    try {
        var concept = await hub.find({}, {_id:0,concept:1});        
        return concept[0]['concept'];
    } catch (e) {
        throw Error(e.message + " service");
    }
};

exports.create = async function (concept, lang) {
    var result = false;
    try {
        var newConcept = {
            strid: uuidv1(),
            [lang]: {
                strname: concept.name,
                objcategory: concept.category,
                dttstartdate: concept.startdate,
                dttenddate: concept.enddate,
                bitactive: 1,
                dttcreationdate: new Date(),
                dttmodifieddate: null,
                strcreatedby: concept.createdby,
                strmodifiedby: ""
            }
        };
        await hub.collection.update({}, { $push: { "concept": newConcept } },
            { safe: true, upsert: true, new: true },
            function (err, model) {

            });

        result = true;
    } catch (e) {
        throw Error("Error Occured while Deleting the item " + e.message);
    }
    return result;
};

exports.deleteById = async function (id) {
    try {
        var result = false;
        var elementDeleted = await hub.update(
            {},
            { $pull: { arruser: { strid: id } } },
            { multi: true },
            function conection(err, obj) { }
        );
        if (elementDeleted) {
            result = true;
        }
        return result;
    } catch (e) {
        throw Error("Error Occured while Deleting the item " + e.message);
    }
};

exports.getConcept = async function (id,lang) {
    var concept = null;
    try {
        var conceplang = "";
        conceplang = "$$item." + lang;
        concept = await hub.aggregate([
            {
                $project: {
                    "concept": {
                        "$map": {
                            "input": {
                                $filter: {
                                    input: "$concept",
                                    as: "item",
                                    cond: { $eq: ["$$item.strid", id] }
                                }
                            },
                            "as": "item",
                            "in": {
                                "id": "$$item.strid",
                                "name": "$$item." + lang + "." + "strname",
                                "categories": "$$item." + lang + "." + "objcategory",
                                "active": "$$item." + lang + "." + "bitactive",
                                "creationdate": "$$item." + lang + "." + "dttcreationdate",
                                "modifieddate": "$$item." + lang + "." + "dttmodifieddate",
                                "createdby": "$$item." + lang + "." + "strcreatedby",
                                "modifiedby": "$$item." + lang + "." + "modifiedby"
                                
                            }
                        }
                    }
                }
            }
        ]);
    } catch (e) {
        throw Error(e.message + " service");
    }
    return concept[0]['concept'][0];
};
