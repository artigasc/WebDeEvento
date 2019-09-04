var mongoose = require('mongoose');
var Event = require('../Models/EventModel');
var hub = require('../Models/HubModel');
var ConceptService = require('../Services/ConceptService');
var Constants = require('../app');
const uuidv1 = require('uuid/v1');
exports.getAll = async function (lang) {
    try {
        var category = await hub.find({}, { _id: 0, 'category': 1 }).lean();
        return category[0]['category'];
    } catch (e) {
        throw Error(e.message + " service");
    }
};

exports.create = async function (category, lang) {
    var result = false;
    try {
        var newCategory = {
            strid: uuidv1(),
            [lang]: {
                strname: category.name,
                bitactive: category.active,
                strisassociated: category.isassociated,
                stricon: category.icon,
                dttcreationdate: new Date(),
                dttmodifieddate: null,
                strcreatedby: category.createdby,
                strupdatedby: null
            }
        };
        await hub.collection.update({}, { $push: { "category": newCategory } },
            { safe: true, upsert: true, new: true },
            function (err, model) {

            });

        result = true;
    } catch (e) {
        throw Error("Error Occured while Deleting the item " + e.message);
    }
    return result;
};

exports.update = async function (idCategory, lang, category) {
    try {
        var oldCategory = await hub.find({}, { _id: 0, 'category': 1 }).lean();
        oldCategory[0]['category'].forEach((element) => {
            if (element.strid === idCategory) {
                element[lang].strname = category.name ? category.name : element[lang].strname;
                element[lang].bitactive = category.active ? category.active : element[lang].bitactive;
                element[lang].strisassociated = category.isassociated ? category.isassociated : element[lang].strisassociated;
                element[lang].stricon = category.icon ? category.icon : element[lang].stricon;
                element[lang].dttmodifieddate = new Date();
                element[lang].strupdatedby = category.updatedby ? category.updatedby : element[lang].strupdatedby;                        
        }        
     });
        var updatedCategory = await hub.collection.update({}, { $set: { 'category': oldCategory[0]['category'] } });
        return updatedCategory;
} catch (e) {
    throw Error("Error ocurred while Updating the Category");
}
};

exports.deleteById = async function (id) {
    try {
        var result = false;
        var elementDeleted = await hub.update(
            {},
            { $pull: { category: { strid: id } } },
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

exports.getCategory = async function (id,lang) {
    var category = null;
    try {
        category = await hub.aggregate([
            {
                $project: {
                    "category": {
                        "$map": {
                            "input": {
                                $filter: {
                                    input: "$category",
                                    as: "item",
                                    cond: { $eq: ["$$item.strid", id] }
                                }
                            },
                            "as": "item",
                            "in": {
                                "id": "$$item.strid",
                                "name": "$$item." + lang + "." + "strname",                                        
                                "isassociated": "$$item." + lang + "." + "strisassociated",                                        
                                "fileattachment": "$$item." + lang + "." + "bitfileattachment",
                                "icon": "$$item." + lang + "." + "strIcon",                                        
                                "active": "$$item." + lang + "." + "bitActive",
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
        var categoryData = category[0]['category'][0];
    } catch (e) {
        throw Error(e.message + " service");
    }
    return categoryData;
};

exports.getCategoryByEvent = async function (idcategory, lang, idobjConceptPay) {
    var category = null;
    try {

        var hubobjConceptPay = await Event.findOne({}, { 'content.objConceptPay': 1 }).lean();
      
        var idConcept = "";
        if (hubobjConceptPay.content.objConceptPay.length > 0) {
            arrobjConceptPay = hubobjConceptPay.content.objConceptPay;
            for (let el of arrobjConceptPay) {
                if (el.id === idobjConceptPay) {
                    idConcept = el.conceptId;
                    break;
                }
            }
        }
        
        var concepdata = await ConceptService.getConcept(idConcept, lang);
        
        var categoryInfo = null;
        if (concepdata.categories.length > 0) {
            for (let el of concepdata.categories) {
                if (el.strid === idcategory) {
                    categoryInfo = el;
                }
            }
       
        }
        
        if (categoryInfo !== null) {
           
            var durationData = getBindingDuartion(categoryInfo.objDuration);
            category = {
                name: categoryInfo.strname,
                duration: durationData
            };
        }
    } catch (e) {
        console.log(e.message + " service");
    }
    return category;
};

function getBindingDuartion(durations) {
    var result = null;
    if (durations.length > 0) {
        var differenceAcum = 99999;
        for (let el of durations) {
            var today = new Date();
            var difference = Constants.DateDiff.inDays(today,el.dttdateto);
            if (difference < differenceAcum) {
                result = {
                    mount: el.dblmount,
                    dateto: el.dttdateto
                };
            }
            differenceAcum = difference;
        }
    }
    return result;
}


