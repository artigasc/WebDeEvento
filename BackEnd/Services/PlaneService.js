var mongoose = require('mongoose');
var hub = require('../Models/HubModel');
const uuidv1 = require('uuid/v1');
_this = this;
exports.create = async function (plane, lang) {
    var result = false;
    try {
        var newPlane = {
            strid: uuidv1(),
            strurlregulation: plane.urlregulation,
            strurlbookingform: plane.urlbookingform,
            strurlplane: plane.urlplane,
            objcompany: plane.company,
            bitactive: 1,
            dttcreationdate: new Date(),
            dttmodifieddate: null,
            strcreatedby: plane.createdby,
            strmodifiedby: ""
        };
        hub.collection.update({}, { $push: { "plane": newPlane } },
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
            { $pull: { plane: { strid: id } } },
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

exports.getPlane = async function (id,lang) {
    var plane = null;
    try {
        plane = hub.aggregate([
            {
                $project: {
                    "plane": {
                        "$map": {
                            "input": {
                                $filter: {
                                    input: "$plane",
                                    as: "item",
                                    cond: { $eq: ["$$item.strid", id] }
                                }
                            },
                            "as": "item",
                            "in": {
                                "id": "$$item.strid",
                                "urlregulation": "$$item.strurlregulation",
                                "urlbookingform": "$$item.strurlbookingform",
                                "urlplane": "$$item.strurlplane",
                                "company": "$$item.objcompany",
                                "active": "$$item.active",
                                "creationdate": "$$item.dttcreationdate",
                                "modifieddate": "$$item.dttmodifieddate",
                                "createdby": "$$item.strcreatedby",
                                "modifiedby":"$$item.strmodifiedby"
                            }
                        }
                    }
                }
            }
        ]);
    } catch (e) {
        throw Error(e.message + " service");
    }
    return plane;
};

