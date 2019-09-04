var mongoose = require('mongoose');
var hub = require('../Models/HubModel');
var event = require('../Models/EventModel');
const uuidv1 = require('uuid/v1');
_this = this;

exports.getAll = async function () {
    try {
        var exhibitor = await hub.find({}, {_id:0,exhibitor:1}).lean();
        return exhibitor[0]['exhibitor'];
    } catch (e) {
        throw Error(e.message + " service");
    }
};

exports.getExhibitor = async function (id,lang) {
    var exhibitor = null;
    try {
        exhibitor =await  hub.aggregate([
            {
                $project: {
                    "exhibitor": {
                        "$map": {
                            "input": {
                                $filter: {
                                    input: "$exhibitor",
                                    as: "item",
                                    cond: { $eq: ["$$item.strid", id] }
                                }
                            },
                            "as": "item",
                            "in": {
                                "id": "$$item.strid",
                                "firstname": "$$item." + lang + "." + "strfirstname",
                                "secondname": "$$item." + lang + "." + "strsecondname",
                                "instruction": "$$item." + lang + "." + "strinstruction",
                                "company": "$$item." + lang + "." + "strcompany",
                                "position": "$$item." + lang + "." + "intposition",
                                "urlphoto": "$$item." + lang + "." + "strurlphoto",
                                "urlpresentation": "$$item." + lang + "." + "strurlpresentation",
                                "type": "$$item." + lang + "." + "inttype",
                                "charge": "$$item." + lang + "." + "strcharge",
                                "sctive": "$$item." + lang + "." + "bitActive",
                                "creationdate": "$$item." + lang + "." + "dttcreationdate",
                                "modifieddate": "$$item." + lang + "." + "dttmodifieddate",
                                "createdby": "$$item." + lang + "." + "strcreatedby",
                                "modifiedby": "$$item." + lang + "." + "strmodifiedby"                               
                            }
                        }
                    }
                }
            }
        ]);
        
    } catch (e) {
        throw Error(e.message + " service");
    }
    return exhibitor[0]['exhibitor'][0];
};

exports.create = async function (exhibitor, language) {
    var result = false;
    try {
        var newExhibitor = {
            strid: uuidv1(),
            [language]: {
                strfirstname: exhibitor.firstname,
                strsecondname: exhibitor.secondname,
                strinstruction: exhibitor.instruction,
                strcompany: exhibitor.company,
                intposition: exhibitor.position,
                strurlphoto: exhibitor.urlphoto,
                strdescription: exhibitor.description,
                strurlpresentation: exhibitor.urlpresentation,
                intidtype: exhibitor.type,
                strcharge: exhibitor.charge,
                bitActive: exhibitor.active,
                dttcreationdate: datetimeNow(),
                dttmodifieddate: null,
                strcreatedby: exhibitor.createdby,
                strmodifiedby: null
            }
        };  
        hub.collection.update({}, { $push: { "exhibitor": newExhibitor } },
            { safe: true, upsert: true, new: true },
            function (err, model) {
            });
        result = true;        
    } catch (e) {
        console.log(e.message);
    }
};

exports.remove = async function (id) {
    try {
        var result = false;
        var elementDeleted = await hub.update(
            {},
            { $pull: { exhibitor: { strid: id} } },
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

function datetimeNow() {
    var date = new Date();
    return (date.getDate() < 10 ? "0" : "") + date.getDate() + '/'
        + (date.getMonth() < 10 ? "0" : "") + date.getMonth() + '/'
        + date.getFullYear() + ' '
        + date.getHours() + ':'
        + (date.getMinutes() < 10 ? "0" : "") + date.getMinutes() + ':'
        + (date.getSeconds() < 10 ? "0" : "") + date.getSeconds();
}
