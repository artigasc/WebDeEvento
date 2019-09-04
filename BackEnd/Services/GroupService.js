var mongoose = require('mongoose');
var event = require('../Models/EventModel');
const uuidv1 = require('uuid/v1');
exports.create = async function (idEvent, group, lang) {
    var result = false;
    try {
        var newGroup = {
            strId: uuidv1(),
            [lang]: {
            objSponsors: [],
            strColor: group.color,
            intType: group.type,
            intPosition: group.position,            
            strGroupname: group.groupname,            
            bitActive: group.active,
            dttCreationdate: new Date(),
            dttModifieddate: null,
            strCreatedby: group.createdby,
            strUpdatedby: null
            }
        };
        var updatedElement = await event.collection.update({ strId: idEvent }, { $push: { "objGroups": newGroup } },
            { safe: true, upsert: false, new: true },
            function (err, model) {
                if (err) {
                    console.log(err + "error");
                }
            });
        if (updatedElement)
            result = true;

    } catch (e) {
        throw Error("Error Occured while adding the item " + e.message);
    }
    return result;
};


exports.getUser = async function (id,lang) {
    var user = null;
    try {
        var userlang = "";
        userlang = "$$item." + lang;
        user =await  hub.aggregate([
            {
                $project: {
                    "user": {
                        "$map": {
                            "input": {
                                $filter: {
                                    input: "$user",
                                    as: "item",
                                    cond: { $eq: ["$$item.strid", id] }
                                }
                            },
                            "as": "item",
                            "in": {
                                "id": "$$item.strid",
                                "identitynumber": "$$item." + lang + "." + "stridentitynumber",
                                "identitynumbertype": "$$item." + lang + "." + "stridentitynumbertype",
                                "name": "$$item." + lang + "." + "strname",
                                "lastname": "$$item." + lang + "." + "strlastname",  
                                "username": "$$item." + lang + "." + "strusername",  
                                "password": "$$item." + lang + "." + "strpassword",
                                "phone": "$$item." + lang + "." + "strphone",  
                                "celular": "$$item." + lang + "." + "strcelular",
                                "email": "$$item." + lang + "." + "stremail",
                                "charge": "$$item." + lang + "." + "strcharge",
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
    return user[0]['user'][0];
};
