var mongoose = require('mongoose');
var hub = require('../Models/HubModel');
const uuidv1 = require('uuid/v1');
_this = this;
exports.create = async function (sponsor, lang) {
    var result = false;
    try {
        var newSponsor = {
            strId: uuidv1(),
            strUrllogo: sponsor.urllogo,
            strUrlpage: sponsor.urlpage,
            intPosition: sponsor.position,
            intType: sponsor.type,
            bitActive: 1,
            dttCreationdate: new Date(),
            dttUpdatedate: null,
            strCreatedby: sponsor.createdby,
            strUpdatedby: ""
        };
        hub.collection.update({}, { $push: { "sponsor": newSponsor } },
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
            { $pull: { sponsor: { strId: id } } },
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

exports.getAll = async function () {
    try {
        var sponsor = await hub.find({}, {_id:0,sponsor:1});
        return sponsor;
    } catch (e) {
        throw Error(e.message + " service");
    }
};

exports.getSponsor = async function (id) {
    var sponsor = null;
    try {
        sponsor = await hub.aggregate([
            {
                $project: {
                    "sponsor": {
                        "$map": {
                            "input": {
                                $filter: {
                                    input: "$sponsor",
                                    as: "item",
                                    cond: { $eq: ["$$item.strId", id] }
                                }
                            },
                            "as": "item",
                            "in": {
                                "id": "$$item.strId",
                                "urllogo": "$$item.strUrllogo",
                                "urlpage": "$$item.strUrlpage",
                                "position": "$$item.intPosition",
                                "type": "$$item.intType",
                                "active": "$$item.bitActive",
                                "creationdate": "$$item.dttCreationdate",
                                "updatedate": "$$item.dttUpdatedate",
                                "createdby": "$$item.strCreatedby",
                                "updatedby":"$$item.strUpdatedby"
                            }
                        }
                    }
                }
            }
        ]);
    } catch (e) {
        throw Error(e.message + " service");
    }
    return sponsor[0]['sponsor'][0];
};

