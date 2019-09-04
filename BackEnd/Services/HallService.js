var mongoose = require('mongoose');
var hub = require('../Models/HubModel');
_this = this;

exports.getAll = async function () {
    try {
        var hall = await hub.find({}, {_id:0,hall:1});
        hall[0].hall.forEach(e => {
            console.log(e);
        });
        return hall;
    } catch (e) {
        throw Error(e.message + " service");
    }
};
exports.getHall = async function (id, lang) {
    var hall = null;
    try {
        var halllang = "";
        halllang = "$$item." + lang;
        hall = await hub.aggregate([
            {
                $project: {
                    "hall": {
                        "$map": {
                            "input": {
                                $filter: {
                                    input: "$hall",
                                    as: "item",
                                    cond: { $eq: ["$$item.strid", id] }
                                }
                            },
                            "as": "item",
                            "in": {
                                "id": "$$item.strid",
                                "title": "$$item." + lang + "." + "strtitle",
                                "name": "$$item." + lang + "." + "strname",
                                "lider": "$$item." + lang + "." + "strlider",
                                "responsible": "$$item." + lang + "." + "strresponsible",
                                "active": "$$item." + lang + "." + "bitactive",
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
    return hall[0]['hall'][0];
};
exports.create = async function (hall, language) {
    var result = false;
    try {
        var newHall = {
            strid: hall.id,
            [language]: {
                strtitle: hall.title,
                strname: hall.name,
                strlider: hall.lider,
                strresponsible: hall.responsible,
                bitactive: hall.active,
                dttcreationdate: datetimeNow(),
                dttmodifieddate: null,
                strcreatedby: hall.createdby,
                strmodifiedby: null
            }
        };
        console.log(newHall);
        hub.collection.update({}, { $push: { "hall": newHall } },
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
            { $pull: { hall: { strid: id } } },
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