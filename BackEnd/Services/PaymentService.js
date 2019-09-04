var mongoose = require('mongoose');
var hub = require('../Models/HubModel');
const uuidv1 = require('uuid/v1');
var iimp = require('../Services/IIMPService');

exports.getAll = async function () {
    try {
        var Payment = await hub.find({}, { _id: 0, 'payment': 1 });
        return Payment;
    } catch (e) {
        throw Error(e.message + " service");
    }
    
};

exports.create = async function (payment) {
    var result = false;
    try {
        var objpaymentdetail = await GetPaymenDetailForCollection(payment);

        var newPayment = payment.CulqiDetail ? {
            strid: uuidv1(),
            stridcustomer: payment.idcustomer,
            idcategory: payment.idcategory,
            objPaymentDetail: objpaymentdetail,
            objCulqi: payment.CulqiDetail,
            bitactive: 1,
            dttcreationdate: datetimeNow(),
            dttmodifieddate: null,
            strcreatedby: payment.createdby,
            strmodifiedby: null
        } : {
            strid: uuidv1(),
            stridcustomer: payment.idcustomer,
            idcategory: payment.idcategory,           
            objPaymentDetail: objpaymentdetail,
            bitactive: 1,
            dttcreationdate: datetimeNow(),
            dttmodifieddate: null,
            strcreatedby: payment.createdby,
            strmodifiedby: null            
        };
        var createdPayment=await hub.collection.update({}, { $push: { "payment": newPayment } }, { safe: true, upsert: true, new: true });
        
        result = true;

    } catch (e) {
        result = false;
    }
    return result;
};
    
exports.getPayment = async function (id) {
    var payment = null;
    try {
        payment =await hub.aggregate([
            {
                $project: {
                    payment: {
                        "$map":{
                            "input": {
                                $filter: {
                                    input: "$payment",
                                    as: "item",
                                    cond: { $eq: ["$$item.strid", id] }
                                }
                            },
                            "as": "item",
                            "in": {
                                "id": "$$item.strid",
                                "idcustomer": "$$item.stridcustomer",
                                "idconcept": "$$item.stridconcept",
                                "PaymentDetail": "$$item.objPaymentDetail",
                                "active": "$$item.bitactive",
                                "creationdate": "$$item.dttcreationdate",
                                "modifieddate": "$$item.dttmodifieddate",
                                "createdby": "$$item.strcreatedby",
                                "modifiedby": "$$item.strmodifiedby"
                            }
                        }
                    }
                }
            }
        ]);    
    } catch (e) {
        throw Error(e.message + " service");
    }
    return payment[0]['payment'][0];
};

exports.deleteById = async function (id) {
    try {
        var result = false;
        var elementDeleted = await hub.update(
            {},
            { $pull: { payment: { strid: id } } },
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

async function GetPaymenDetailForCollection(payment) {
    var result = new Array();
    var paymentdetail = payment.PaymentDetail;
    result.push(
        {
            strid: uuidv1(),
            dttdate: paymentdetail.date,
            strname: paymentdetail.name,
            straddress: paymentdetail.address,
            strnamecontactperson: paymentdetail.namecontactperson,
            stremailcontactperson: paymentdetail.emailcontactperson,
            strphonecontactperson: paymentdetail.phonecontactperson,
            strtypedocument: paymentdetail.typedocument,
            strurldocument: paymentdetail.urldocument,
            intdocumentnumber: paymentdetail.documentnumber,
            inttmethod: paymentdetail.method,
            dblprice: paymentdetail.price,
            strcurrency: paymentdetail.currency,
            inttdistrict: paymentdetail.district,
            bitactive: 1,
            dttcreationdate: datetimeNow(),
            dttmodifieddate: null,
            strcreatedby: paymentdetail.createdby,
            modifiedby: ""
        });
        return result;
    }

function datetimeNow() {
    var date = new Date();
    return (date.getDate() < 10 ? "0" : "") + date.getDate() + '/'
        + (date.getMonth() < 10 ? "0" : "") + date.getMonth() + '/'
        + date.getFullYear() + ' '
        + date.getHours() + ':'
        + (date.getMinutes() < 10 ? "0" : "") + date.getMinutes() + ':'
        + (date.getSeconds() < 10 ? "0" : "") + date.getSeconds();
}
