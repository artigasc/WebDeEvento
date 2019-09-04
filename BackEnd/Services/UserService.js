var mongoose = require('mongoose');
var hub = require('../Models/HubModel');
const uuidv1 = require('uuid/v1');


exports.getAll = async function () {
    try {
        var user = await hub.find({}, {_id:0,user:1});
        return user;
    } catch (e) {
        throw Error(e.message + " service");
    }
};
exports.create = async function (user, lang) {
    var result = false;
    try {
        var newUser = {
            strid: uuidv1(),
            [lang]: {
                stridentitynumber: user.identitynumber,
                stridentitynumbertype: user.identitynumbertype,
                strname: user.name,
                strlastname: user.lastname,
                strpictureurl: user.pictureurl,
                strusername: user.username,
                strpassword: user.password,
                strphone: user.phone,
                strcelular: user.celular,
                stremail: user.email,
                strcharge: user.charge,
                bitactive: 1,
                dttcreationdate: user.creationdate,
                dttmodifieddate: null,
                strcreatedby: user.createdby,
                strmodifiedby: ""
            }
        };
        hub.collection.update({}, { $push: { "user": newUser } },
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
            { $pull: { user: { strid: id } } },
            { multi: true },
            function conection(err, obj) {

                return obj;
            }
        );

        if (elementDeleted.ok)
            result = true;

    } catch (e) {
        throw Error("Error Occured while Deleting the item " + e.message);
    }
    return result;
};

exports.getUser = async function (id,lang) {
    var user = null;
    try {
        var userlang = "";
        userlang = "$$item." + lang;
        user = hub.aggregate([
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
        return user;
    } catch (e) {
        throw Error(e.message + " service");
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