var mongoose = require('mongoose');
var event = require('../Models/EventModel');
var hub = require('../Models/HubModel');
const uuidv1 = require('uuid/v1');

exports.create = async function (customer) {
    var result = false;
    try {
        var newCustomer = {
            strid: uuidv1(),
            strfirstname: customer.firstname,
            strsecondname: customer.secondname,
            stridentitynumber: customer.identitynumber,
            stridentitynumbertype: customer.identitynumbertype,
            strnacionality: customer.nacionality,
            strnumbercompany: customer.numbercompany,
            strnumbertypecompany: customer.numbertypecompany,
            strnamecompany: customer.namecompany,
            strcharge: customer.charge,
            strinstructiongrade: customer.instructiongrade,
            intposition: customer.position,
            straddress: customer.address,
            strphone: customer.phone,
            strcelular: customer.celular,
            stremail: customer.email,
            strdistrict: customer.district,
            inttype: customer.type,
            bitactive: 1,
            dttcreationdate: datetimeNow(),
            dttmodifieddate: null,
            strcreatedby: customer.createdby,
            strupdatedby: ""
        };
        var response = hub.collection.update({}, { $push: { "customer": newCustomer } },
            { safe: true, upsert: true, new: true },
            function (err, model) {});
    } catch (e) {
        throw Error("Error Occured while Creating the item " + e.message);
    }
    return response;
};

exports.delete = async function (id) {
    try {
        var elementDeleted = await hub.update(
            {},
            { $pull: { customer: { strid: id } } },
            { multi: true },
            function conection(err, obj) {
            }
        );
        return elementDeleted;
    } catch (e) {
        throw Error("Error Occured while Deleting the item " + e.message);
    }
};

exports.getAll = async function () {
    try {
        var result = await hub.find({}, { _id: 0, customer: 1 }).lean();
        return result[0]['customer'];
    } catch (e) {
        throw Error("Error Occured while Deleting the item " + e.message);
    }
};

exports.get = async function (id) {
        try {
            var response =await hub.aggregate([
                {
                    $project: {
                        customer: {
                            "$map": {
                                "input": {
                                    $filter: {
                                        input: "$customer",
                                        as: "item",
                                        cond: { $eq: ["$$item.strid", id] }
                                    }
                                },
                                "as": "item",
                                "in": {
                                    "id": "$$item.strid",
                                    "firstname": "$$item.strfirstname",
                                    "secondname": "$$item.strsecondname",
                                    "identitynumber": "$$item.stridentitynumber",
                                    "identitynumbertype": "$$item.stridentitynumbertype",
                                    "nacionality": "$$item.strnacionality",
                                    "numbercompany": "$$item.strnumbercompany",
                                    "numbertypecompany": "$$item.strnumbertypecompany",
                                    "namecompany": "$$item.strnamecompany",
                                    "charge": "$$item.strcharge",
                                    "instructiongade": "$$item.strinstructiongade",
                                    "position": "$$item.intposition",
                                    "address": "$$item.straddress",
                                    "phone": "$$item.strphone",
                                    "celular": "$$item.strcelular",
                                    "email": "$$item.stremail",
                                    "district": "$$item.strdistrict",
                                    "type": "$$item.inttype",
                                    "active": "$$item.bitactive",
                                    "creationdate": "$$item.dttmodifiedDate",
                                    "modifieddate": "$$item.dttmodifiedDate",
                                    "createdBy": "$$item.strcreatedBy",
                                    "updatedby": "$$item.strupdatedby"
                                }

                            }
                        }
                    }
                }
            ]);
        
         return response[0]['customer'][0];
    } catch (e) {
            throw Error("Error Occured while Selecting the item " + e.message);
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

exports.createInEvent = async function (idEvent, customer) {
    var result = false;
    try {

        idEvent = '0aa9ed40-b0c7-11e8-8b99-69bdc9a7fc8e';

        var newCustomer = {
            strid: customer.id,
            strfirstname: customer.firstname,
            strsecondfirstname: customer.secondfirstname,
            strlastname: customer.lastname,
            strsecondlastname: customer.secondlastname,
            stridentitynumber: customer.identitynumber,
            stridentitynumbertype: customer.identitynumbertype,
            strnacionality: customer.nacionality,
            strcountry: customer.country,
            strdepartment: customer.department,
            strprovince: customer.province,
            strnumbercompany: customer.numbercompany,
            strnumbertypecompany: customer.numbertypecompany,
            strnamecompany: customer.namecompany,
            strcharge: customer.charge,
            strinstructiongade: customer.instructioncharge,
            intposition: customer.position,
            straddress: customer.address,
            strphone: customer.phone,
            strcelular: customer.celular,
            stremail: customer.email,
            strdistrict: customer.district,
            strtokennumberiimp: customer.fichvnro,
            bitactive: customer.active,
            dttcreationDate: datetimeNow(),
            dttmodifiedDate: null,
            strcreatedBy: customer.createdby,
            strupdatedby: ""
        };

        console.log(newCustomer);

        var updatedElement = await event.collection.update({ strid: idEvent }, { $push: { "objCustomers": newCustomer } },
            {},
            function (err, model) {
                return model.result;
            });
            result = true;
        
    } catch (e) {
        throw Error("Error Occured while Creating the item " + e.message);
    }
    return result;
};

