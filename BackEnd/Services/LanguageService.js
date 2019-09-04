var mongoose = require('mongoose');
var hub = require('../Models/HubModel');
var event = require('../Models/EventModel');
_this = this;

exports.getLanguage = async function (id) {
    var language = null;
    try {
        var categorylang = "";
        language = await hub.aggregate([
            {
                $project: {
                    "language": {
                        "$map": {
                            "input": {
                                $filter: {
                                    input: "$language",
                                    as: "item",
                                    cond: { $eq: ["$$item.strid", id] }
                                }
                            },
                            "as": "item",
                            "in": {
                                "strid": "$$item.strid",
                                "strname": "$$item.strname",
                                "strdescription": "$$item.strdescription",
                                "bitactive": "$$item.bitactive",
                                "dttcreationdate": "$$item.dttcreationdate",
                                "dttmodifieddate": "$$item.dttmodifieddate",
                                "strcreatedby": "$$item.strcreatedby",
                                "strmodifiedby": "$$item.strmodifiedby"
                            }
                        }
                    }
                }
            }
    ]);
    } catch (e) {
        throw Error(e.message + " service");
    }
    return language[0]['language'][0];
};

exports.getAll=async function(){
    try {
        var language = await hub.find({}, { _id: 0, language:1});
        return language[0]['language'];
    } catch (e) { 
        throw Error(e.message + " service");
    }
};

exports.create = async function (language, name) {
    try {
        var newLanguage = {
            strid: language.strid,
            strname: language.strname,
            strdescription: language.strdescription,
            bitactive: language.bitactive,
            dttcreationdate: datetimeNow(),
            dttmodifieddate: null,
            strcreatedby: language.strcreatedby,
            strmodifiedby: null
        };
        await hub.collection.update({}, { $push: { "language": newLanguage } }, { safe: true, upsert: true, new: true });

        //Insert in User
        var objUser = await hub.find({}, { 'user': 1 }).lean();
        var a = objUser[0]['user'][0]['en'];
        objUser[0].user.forEach(async (element) => {
            element[name] = a;
        });
        await hub.collection.update({}, { $set: { "user": objUser[0].user } });

        //Insert in Exhibitor
        var objExhibitor = await hub.find({}, { 'exhibitor': 1 }).lean();
        var b = objExhibitor[0]['exhibitor'][0]['en'];
        objExhibitor[0].exhibitor.forEach(async (element) => {
            element[name] = b;
        });
        await hub.collection.update({}, { $set: { "exhibitor": objExhibitor[0].exhibitor } });

        //Insert in Concept
        var objConcept = await hub.find({}, { 'concept': 1 }).lean();
        var c = objConcept[0]['concept'][0]['es'];
        objConcept[0].concept.forEach(async (element) => {
            element[name] = c;
        });
        await hub.collection.update({}, { $set: { "concept": objConcept[0].concept } });

        //Insert in Category
        var objCategory = await hub.find({}, { 'category': 1 }).lean();
        var d = objCategory[0]['category'][0]['en'];
        objCategory[0].category.forEach(async (element) => {
            element[name] = d;
        });
        await hub.collection.update({}, { $set: { "category": objCategory[0].category } });

        //Insert in Master
        var objMaster = await hub.find({}, { 'master': 1 }).lean();
        var e = objMaster[0]['master']['en'];
        var body = objMaster[0];
        Object.keys(body).forEach(function (key) {
            body[key][name] = e;
        });
        await hub.collection.update({}, { $set: { "master": body['master'] } });

        //Insert in forms
        var objForm = await hub.find({}, { 'forms': 1 }).lean();
        var f = objForm[0]['forms'][0]['es'];
        objForm[0].forms.forEach(async (element) => {
            element[name] = f;
        });
        await hub.collection.update({}, { $set: { "forms": objForm[0].forms } });

        //Insert in Menu
        var ObjMenu = await hub.find({}, { 'menu': 1 }).lean();
        var g = ObjMenu[0]['menu'][0]['en'];
        ObjMenu[0].menu.forEach(async (element) => {
            element[name] = g;
        });
        await hub.collection.update({}, { $set: { "menu": ObjMenu[0].menu } });
} catch (e) {
    throw Error(e.message + " service");
}
};
exports.remove = async function (id) {
    try {
        var result = false;
        var elementDeleted = await hub.update(
            {},
            { $pull: { language: { strid: id } } },
            { multi: true },
            function conection(err, obj) { }
        );
        if (elementDeleted) {
            result = true;
        }
      //  console.log(elementDeleted);
        return result;
    } catch (e) {
        throw Error("Error Occured while Deleting the Language " + e.message);
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