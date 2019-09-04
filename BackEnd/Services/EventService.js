var Event = require('../Models/EventModel');
var ExibitorService = require('../Services/ExhibitorService');
var CustomerService = require('../Services/CustomerService');
var SponsorService = require('../Services/SponsorService');
var GroupService = require('../Services/GroupService');
var LanguageService = require('../Services/LanguageService');
var IIMPService = require('../Services/IIMPService');
var PaymentService = require('../Services/PaymentService');
var ConceptService = require('../Services/ConceptService');
var ActivityService = require('../Services/ActivityService');
var CategoryService = require('../Services/CategoryService');
var MailHelper = require('../Helpers/mailingHelper');
var CulqiHelper = require('../Helpers/CulqiHelper');
var MasterService = require('../Services/MasterService');
var Constants = require('../app');
var mongoose = require('mongoose');
var _ = require('lodash');
const uuidv1 = require('uuid/v1');
var request = require('request');
var rp = require('request-promise');
var fs = require('fs');
var path = require("path");

_this = this;

exports.getEvent = async function (id, lang) {
    try {
        var event = await Event.findOne({ strId: id }, { _id: 0, strId: 1, [lang]: 1 }).lean();

        var result = {
            id: event.strId,
            code: event.strCode,
            title: event[lang].strTitle,
            description: event[lang].strDescription,
            logan: event[lang].strSlogan,
            place: event[lang].strPlace,
            latitude: event[lang].intLatitude,
            longitude: event[lang].intLongitude,
            dateBegin: event[lang].dttDatebegin,
            dateEnd: event[lang].dttDateend,
        //CAMPOS ----PREGUNTAR VVVVVVVVVVV
            inscription: event[lang].strInscription,
            program: event[lang].strProgram
        };

        return result;
    } catch (e) {
        throw Error(e.message + " service");
    }
};

exports.getByweb = async function (id, lang) {
    try {
        var event = await Event.findOne({ strId: id }, { _id: 0, strId: 1, [lang]: 1 }).lean();
        //var eventBinding = getBindingEventObject(event, lang);
        //return eventBinding;
        var master = new Array();
        master.push(event);
        for (let el of master) {
            var res = {
                Id: el.strId,
                Title: el[lang].strTitle,
                Description: el[lang].strDescription,
                Slogan: el[lang].strSlogan,
                Place: el[lang].strPlace,
                Latitude: el[lang].intLatitude,
                Longitude: el[lang].intLongitude,
                Datebegin: el[lang].dttDatebegin,
                Dateend: el[lang].dttDateend,
                Regulation: el[lang].strUrlregulation,
                Created_at: el[lang].dttCreated_at,
                Updated_at: el[lang].dttUpdated_at,
                Createdby: el[lang].strCreatedby,
                Updatedby: el[lang].strUpdatedby
            };
        }
        event = res;
        return event;
    } catch (e) {
        throw Error(e.message + " service");
    }
};

exports.getByphone = async function (id, lang) {
    try {
        var event = await Event.findOne({ strId: id }, { _id: 0, strId: 1, objContent: 1 }).lean();
        var master = event['objContent']['mobile'][lang];
        var ViewBody = new Array();
        master['objViews'].forEach((e) => {
            var a = {
                Name: e['strName'],
                Values: e['objValues']
            };
            ViewBody.push(a);
        });
        var res = {
            Views: ViewBody
        };
        //console.log(res);
        return res;
    } catch (e) {
        throw Error(e.message + " service");
    }
};

exports.create = async function (event, lang) {
    var newEvent = new Event({
        _id: new mongoose.Types.ObjectId(),
        strId: event.id,
        strCode: event.eventcode,
        objCustomers: [],
        objGroups: [],
        objActivities: [],
        objSessions: [],
        objStandPrices: [],
        objNotes: [],            
        objUrlBanners: [],
        objStandTypes:[],
        [lang]: {
            strTitle: event.title,
            strSubtitle: event.subtitle,
            strDescription: event.description,
            strSlogan:event.slogan,
            strPlace: event.place,
            strUrlmap: event.urlmap,
            dblLatitude: event.latitude,
            dblLongitud: event.longitud,
            dttDatebegin: event.datebegin,
            dttDateend: event.dateend,
            intThementype: event.thementype,            
            objGalleries: [],
            objHalls: [],
            objPlanes: [],
            intStatus: event.status,
            dttCreated_at: datetimeNow(),
            dttUpdated_at: null,
            strCreatedby: event.createdby,
            strUpdatedby: null
        }
    });
    newEvent.save().then((r) => {
    }).catch((err) => {
        console.log('Error while saving..!');
    });
    return true;
};

//UPDATE EVENT
exports.updateEvent = async function (event, lang) {
    try {
        var idObject = new mongoose.Types.ObjectId(event._id);
        var modifiedEvent = {
            strtitle: event.title,
            strtubTitle: event.subtitle,
            strdescription: event.description,
            strplace: event.place,
            strurlmap: event.urlmap,
            dbllatitude: event.latitude,
            dbllongitud: event.longitud,
            dttdatebegin: event.datebegin,
            dttdateend: event.dateend,
            intthementype: event.thementype,
            intstatus: event.status,
            dttupdated_at: datetimeNow(),
            strupdatedby: event.modifiedby
        };
        var myquery = { strid: id };
        var newvalues = {
            $set: {
                'strCode': event.code,
                [[lang] + '.strtitle']: modifiedEvent.strtitle,
                [[lang] + '.strsubTitle']: modifiedEvent.strsubTitle,
                [[lang] + '.strdescription']: modifiedEvent.strdescription,
                [[lang] + '.strplace']: modifiedEvent.strplace,
                [[lang] + '.strurlmap']: modifiedEvent.strurlmap,
                [[lang] + '.dbllatitude']: modifiedEvent.dbllatitude,
                [[lang] + '.dbllongitud']: modifiedEvent.dbllongitud,
                [[lang] + '.dttdatebegin']: modifiedEvent.dttdatebegin,
                [[lang] + '.dttdateend']: modifiedEvent.dttdateend,
                [[lang] + '.intthementype']: modifiedEvent.intthementype,
                [[lang] + '.intstatus']: modifiedEvent.intstatus,
                [[lang] + '.dttupdated_at']: modifiedEvent.dttupdated_at,
                [[lang] + '.strupdatedby']: modifiedEvent.strupdatedby
            }
        };
        Event.collection.updateOne(
            myquery,
            newvalues
        );
    } catch (e) {
        throw Error("Error Update Event");
    }
};

exports.remove = async function (id) {
    try {
        var event = await Event.findOne({ _id: id });
        if (event) {
            await Event.remove({ _id: id }).exec();
        }
    } catch (e) {
        throw Error("Error Ocurred while Deleting the Event" + e.message);
    }
};

//HALL
exports.gethall = async function (idevent, id, lang) {
    try {
        var r = "";
        var res = await Event.find({ strId: idevent }, { [lang + '.objHalls']: 1 }).lean();
        res[0][lang]['objHalls'].forEach((elem) => {
            if (elem.strId===id) {
                r= elem;
            }
        });
        return r;
    } catch (e) {
        throw Error("Error");
    }
};
exports.createHall = async function (id, lang, hall) {
    try {
        var newHall = {
            strId: hall.id,
            strTitle: hall.title,
            strName: hall.name,
            strLider: hall.lider,
            strColider: hall.colider,
            bitActive: hall.active,
            strCreatedby: hall.createdby,
            dttModifieddate: null,
            dttCreateddate: datetimeNow(),
            strUpdatedby: null,
            objThemes: []
        };
        await Event.collection.update({ strId: id }, { $addToSet: { [lang + '.objHalls']: newHall } });

    } catch (e) {
        throw Error("Error ocurred while Creating the Hall");
    }
};
exports.updateHall = async function (id, lang, idhall, newHall) {
    try {
        var OldHall = await Event.find({ strId: id }, { _id: 0, [lang + '.objHalls']: 1 }).lean();
        OldHall[0][lang]['objHalls'].forEach((elem) => {
            if (elem.strId === idhall) {
                elem.strTitle = newHall.title ? newHall.title : elem.strTitle;
                elem.strName = newHall.name ? newHall.name:elem.strName;
                elem.strLider = newHall.lider ? newHall.lider : elem.strLider;
                elem.strColider = newHall.colider ? newHall.colider : elem.strColider;
                elem.bitActive = newHall.active ? newHall.active : elem.bitActive;
                elem.dttModifieddate = datetimeNow();
                elem.strUpdatedby = newHall.updatedby ? newHall.updatedby : elem.strUpdatedby;
            }
        });
        var updatedHall = await Event.collection.update({ strId: id }, { $set: { [lang + '.objHalls']: OldHall[0][lang]['objHalls'] } });
        return updatedHall;
    } catch (e) {
        throw Error("Error ocurred while Updating the Hall");
    }
};
exports.deleteHall = async function (id, lang, idhall) {
    try {
        var deletedHall = await Event.update({ strId: id }, { $pull: { [lang + '.objHalls']: { strId: idhall } } });
        return deletedHall;
    } catch (e) {
        throw Error("Error Ocurred while Deleting the Hall of Event");
    }
};

//themes of hall
exports.getThemebyHall = async function (idevent,id,lang) {
    try {
        var r = "";
        var res = await Event.find({ strId: idevent }, { [lang + '.objHalls']: 1 }).lean();
        res[0][lang]['objHalls'].forEach((elem) => {
            if (elem.strId === id) {
                r = elem.objThemes;
            }
        });
        return r;
    } catch (e) {
        throw Error("Error");
    }
};
exports.createThemebyHall = async function (idevent, id, lang, theme) {
    try {
        var OldHall = await Event.find({ strId: idevent }, { _id: 0, [lang + '.objHalls']: 1 }).lean();
        //console.log(OldHall[0][lang]['objHalls'][0]['objThemes']);
        OldHall[0][lang]['objHalls'].forEach((elem) => {
            if (elem.strId === id) {
                var newTheme = {
                    strId:theme.id,
                    strTitle: theme.title,
                    dttDatebegin: theme.datebegin,
                    dttDateend: theme.dateend,
                    strColor: theme.color,
                    intThementype: theme.thementype,
                    bitActive: theme.active,
                    dttCreationdate: datetimeNow(),
                    strCreatedby: theme.createdby
                };
                //console.log(elem.objThemes);
                elem.objThemes.push(newTheme);
            }
        });
        
        var updatedHall = await Event.collection.update({ strId: idevent }, { $set: { [lang + '.objHalls']: OldHall[0][lang]['objHalls'] } });
        
        return updatedHall;
    } catch (e) {
        throw Error("Error ocurred while Updating the theme");
    }

};

//GALLERY
exports.getgallery = async function (idevent, id, lang) {
    try {
        var r = "";
        var res = await Event.find({ strId: idevent }, { [lang + '.objGalleries']: 1 }).lean();
        res[0][lang]['objGalleries'].forEach((elem) => {
            if (elem.strId === id) {
                r = elem;
            }
        });
        return r;
    } catch (e) {
        throw Error("Error");
    }
};
exports.createGallery = async function (id, lang, gallery) {
    try {
        var newGallery = {
            strId: gallery.id,
            strName:gallery.name,
            intType: gallery.type,
            objElements:[],
            bitActive: gallery.active,
            dttModifieddate: null,
            dttCreateddate: datetimeNow(),
            strCreatedby: gallery.createdby,
            strUpdatedby: null
        };
        await Event.collection.update({ strId: id }, { $addToSet: { [lang + '.objGalleries']: newGallery } });
    } catch (e) {
        throw Error("Error ocurred while Creating the Gallery");
    }
};
exports.updateGallery = async function (id, lang, idgallery, newGallery) {
    try {
        var OldGallery = await Event.find({ strId: id }, { _id: 0, [lang + '.objGalleries']: 1 }).lean();
        OldGallery[0][lang]['objGalleries'].forEach((elem) => {
            if (elem.strId === idgallery) {
                elem.strName = newGallery.name ? newGallery.name : elem.strName;            
                elem.intType = newGallery.type ? newGallery.type : elem.intType;
                elem.bitActive = newGallery.active ? newGallery.active : elem.bitActive;
                elem.dttModifieddate = datetimeNow();
                elem.strUpdatedby = newGallery.updatedby ? newGallery.updatedby : elem.strUpdatedby;
            }
            console.log(elem.bitActive);
        });
        var updatedGallery = await Event.collection.update({ strId: id }, { $set: { [lang + '.objGalleries']: OldGallery[0][lang]['objGalleries'] } });
        return updatedGallery;
    } catch (e) {
        throw Error("Error ocurred while Updating the Galleries");
    }
};
exports.deleteGallery = async function (id, lang, idgallery) {
    try {
        var deletedGallery = await Event.update({ strId: id }, { $pull: { [lang + '.objGalleries']: { strId: idgallery } } }, { multi: true });
        return deletedGallery;
    } catch (e) {
        throw Error("Error Ocurred while Deleting the Gallery of Event");
    }
};

//elements of Gallery
exports.getElementbyGallery = async function (idevent, id, lang) {
    try {
        var r = "";
        var res = await Event.find({ strId: idevent }, { [lang + '.objGalleries']: 1 }).lean();
        res[0][lang]['objGalleries'].forEach((elem) => {
            if (elem.strId === id) {
                r = elem.objElements;
            }
        });
        return r;
    } catch (e) {
        throw Error("Error");
    }
};
exports.createElementbyGallery = async function (idevent, id, lang, element) {
    try {
        var OldGallery = await Event.find({ strId: idevent }, { _id: 0, [lang + '.objGalleries']: 1 }).lean();
        OldGallery[0][lang]['objGalleries'].forEach((elem) => {
            if (elem.strId === id) {
                var newElemt = {
                    strId:element.id,
                    strUrl: element.url,
                    intPosition: element.position,
                    dttCreationdate: datetimeNow()
                };
                elem.objElements.push(newElemt);
            }
        });

        var updatedHall = await Event.collection.update({ strId: idevent }, { $set: { [lang + '.objGalleries']: OldGallery[0][lang]['objGalleries'] } });

        return updatedHall;
    } catch (e) {
        throw Error("Error ocurred while Creating the Element");
    }

};

//PLANES
exports.getplane = async function (idevent, id, lang) {
    try {
        var r = "";
        var res = await Event.find({ strId: idevent }, { [lang + '.objPlanes']: 1 }).lean();
        res[0][lang]['objPlanes'].forEach((elem) => {
            if (elem.strId === id) {
                r = elem;
            }
        });
        return r;
    } catch (e) {
        throw Error("Error");
    }
};
exports.createPlane = async function (id, lang, plane) {
    try {
        var newPlane = {
            strId: plane.id,
            strCompanyname: plane.company,
            bitActive: plane.active,
            intPosition:plane.position,
            intType:plane.type,
            dttCreateddate: datetimeNow(),
            dttModifieddate: null,
            strCreatedby: plane.createdby,
            strUpdatedby: null
        };
        await Event.collection.update({ strId: id }, { $addToSet: { [lang + '.objPlanes']: newPlane } });
    } catch (e) {
        throw Error("Error ocurred while Creating the Plane");
    }
};
exports.updatePlane = async function (id, lang, idplane, newPlane) {
    try {
        var OldPlane = await Event.find({ strId: id }, { _id: 0, [lang + '.objPlanes']: 1 }).lean();
        OldPlane[0][lang]['objPlanes'].forEach((elem) => {
            if (elem.strId === idplane) {
                elem.strCompanyname = newPlane.active ? newPlane : elem.strCompanyname;
                elem.bitActive = newPlane.active ? newPlane.active : elem.bitActive;
                elem.intPosition = newPlane.type ? newPlane.type : elem.intPosition;
                elem.intType = newPlane.type ? newPlane.type : elem.intType;
                elem.dttModifieddate = datetimeNow();
                elem.strUpdatedby = newPlane.updatedby ? newPlane.updatedby : elem.strUpdatedby;
            }
        });
        var updatedPlane = await Event.collection.update({ strId: id }, { $set: { [lang + '.objPlanes']: OldPlane[0][lang]['objPlanes'] } });
        return updatedPlane;
    } catch (e) {
        throw Error("Error ocurred while Updating the Plane");
    }
};
exports.deletePlane = async function (id, lang, idplane) {
    try {
        var deletedPlane = await Event.update({ strId: id }, { $pull: { [lang + '.objPlanes']: { strId: idplane } } }, { multi: true });
        return deletedPlane;
    } catch (e) {
        throw Error("Error Ocurred while Deleting the Plane of Event");
    }
};

//ANTO----------------------------/////////////////
function GetJSON(obj, lang) {
    var array = {};
    for (var key in obj) {
        if (obj.hasOwnProperty(key)) {
            var newKey = [lang] + '.' + key;
            Object.assign(array, { [newKey]: obj[key] });
        }
    }
    return array;
}
exports.getById = async function (id) {
    try {
        var event = await Event.findOne({ strid: id });
        return event;
    } catch (e) {
        throw Error(e.message + " service");
    }
};

////////////--------------------------------------------//////////


//Exhibitor
exports.getExhibitorsbyEvent = async function (idEvent, lang, type) {
    try {
        var arrayExhibitor = new Array();
        var event = await Event.findOne({ strid: idEvent }, { [lang + '.objHalls']: 1 }).lean();
        var obj = event[lang];
        var halls = obj.objHalls;
        if (halls.length > 0) {
            for (i = 0; i < halls.length; i++) {
                var themes = halls[i].objThemes;
                if (themes.length > 0) {
                    for (j = 0; j < themes.length; j++) {
                        var exhibitors = themes[j].objExhibitors;
                        if (exhibitors.length > 0) {
                            for (var k = 0; k < exhibitors.length; k++) {
                                arrayExhibitor.push(exhibitors[k]);
                            }
                        }
                    }
                }
            }
        }
        var newarray = _.uniq(arrayExhibitor);
        var exhibitorData = new Array();
        await Promise.all(newarray.map(async (element) => {
            var exhibitorBody = await ExibitorService.getExhibitor(element, lang);
            var typeExhibitor = exhibitorBody[0]['exhibitor'][0][lang].type;
            if (typeExhibitor === type) {
                exhibitorData.push(exhibitorBody[0]['exhibitor'][0]);
            }
        }));
        return exhibitorData;
    } catch (e) {
        throw Error(e.message + " And Error ocurred while obatain exhibitor");
    }
};
exports.addCustomerToEvent = async function (idEvent, customer, lang) {
    //console.log("idevent"+idEvent);
    console.log(idEvent + ' ' + lang);

    var response = '0';
    try {
        var paymentobject = "";
        paymentobject = createPaymentObject(customer);
        console.log(paymentobject);
        var fichnumber = null;
        try {
            fichnumber = await setInfoInExternalService(customer, paymentobject);
        } catch (e) {
            fichnumber = e.message;
        }

        customer.fichvnro = fichnumber;
        console.log('fichvnro: ' + customer.fichvnro);
        var createElement = await CustomerService.createInEvent(idEvent, customer);
        if (createElement) {
            if (customer.billingtmethod === 2 && customer.paymentdetails) {
                var result = await CulqiHelper.RegisterCharge(customer.paymentdetails);
                paymentobject['CulqiDetail'] = result;
                console.log(paymentobject);
                //.then(result => {
                //    //console.log(result);
                //    paymentobject['CulqiDetail'] = result;
                //    console.log(paymentobject);
                //});

            }
            var createdPayment = await PaymentService.create(paymentobject);
            console.log(createdPayment);
            if (createdPayment) {
                await sendMailPaymentToCustomer(customer, idEvent, lang, paymentobject['CulqiDetail']);
                response = '1';
            }
        }
        ////iimp

        await sendMailToCustomer(customer, idEvent, lang);

        return response;
    } catch (e) {
        response = '0';
    }
};
exports.getCustomersbyEvent = async function (idEvent) {
    try {
        var event = await Event.findOne({ strid: idEvent }, { objCustomers: 1 }).lean();
        return event.objCustomers;
    } catch (e) {
        throw Error(e.message + " And Error ocurred while obatin exhibitor");
    }
};


//Groups
exports.addGroup = async function (idEvent, group, lang) {
    try {
        var result = false;
        var groupData = await GroupService.create(idEvent, group, lang);
        if (groupData)
            result = true;
        return result;
    } catch (e) {
        console.log(e.message);
    }
};
exports.getGroupsbyEvent = async function (idEvent, type, lang) {
    try {
        var arrayGroups = new Array();
        var event = await Event.findOne({ strId: idEvent }, { objGroups: 1 }).lean();
        var groups = event.objGroups;
        if (groups.length > 0) {
            for (i = 0; i < groups.length; i++) {
                if (groups[i].intType === type) {
                    var sponsors = groups[i].objSponsors;
                    if (sponsors.length > 0) {
                        var groupData = {
                            id: groups[i].strId,
                            groupname: groups[i][lang].strGroupname,
                            color: groups[i].strColor,
                            position: groups[i].intPosition,
                            type: groups[i].intType,
                            active: groups[i].bitActive,
                            creationdate: groups[i].dttCreationdate,
                            modifieddate: groups[i].dttModifieddate,
                            createdby: groups[i].strcreatedby,
                            updatedby: groups[i].strUpdatedby,
                            Sponsors: []
                        };
                        var Sponsors = new Array();
                        for (k = 0; k < sponsors.length; k++) {
                            var sponsorData = await SponsorService.getSponsor(sponsors[k]);
                            Sponsors.push(sponsorData[0].sponsor[0]);
                        }
                        groupData.Sponsors = Sponsors;
                        arrayGroups.push(groupData);
                    }
                }
            }

        }

        return arrayGroups;
    } catch (e) {
        throw Error(e.message + " And Error ocurred while obatain exhibitor");
    }
};
exports.deleteGroup = async function (idEvent, id) {
    try {
        var result = false;
        var elementDeleted = await Event.update(
            { strId: idEvent },
            { $pull: { objGroups: { strId: id } } },
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
exports.updateGroup = async function (idEvent, lang, id, newGroup) {
    try {
        var dataevent = await Event.find({ strId: idEvent }, { 'objGroups': 1 }).lean();
        dataevent[0]['objGroups'].forEach((elem) => {
            if (elem.strId === id) {
                elem[lang].strColor = newGroup.color ? newGroup.color : elem[lang].strColor;
                elem[lang].intPosition = newGroup.position ? newGroup.position : elem[lang].inPosition;
                elem[lang].intType = newGroup.type ? newGroup.type : elem[lang].intType;
                elem[lang].strGroupname = newGroup.groupname ? newGroup.groupname : elem[lang].strGroupname;
                elem[lang].bitActive = newGroup.active ? newGroup.active:elem[lang].bitActive;
                elem[lang].dttModifieddate = datetimeNow(),
                elem[lang].strUpdatedby = newGroup.updatedby ? newGroup.updatedby:elem[lang].strUpdatedby;
            }
        });
        var updatedGroup = await Event.collection.update({ strId: idEvent }, { $set: { 'objGroups': dataevent[0]['objGroups'] } });
        return updatedGroup;
    } catch (e) {
        throw Error("Error ocurred while Updating the Group");
    }
};

//SponsorbyGroup ---revisar
exports.createSponsorbyGroup = async function (idEvent,id,lang,sponsor) {
    try {
        var Group = await Event.find({ strId: idEvent }, { _id: 0, 'objGroups': 1 }).lean();
        Group[0]['objGroups'].forEach((elem) => {
            if (elem.strId === id) {
                var newSponsor = {
                    strId: sponsor.id,
                    strUrl: sponsor.url,
                    intPosition: sponsor.position,
                    dttCreationdate: datetimeNow()
                };
                elem[lang].objSponsors.push(newSponsor);
            }
        });

        var updatedGroup = await Event.collection.update({ strId: idEvent }, { $set: { 'objGroups': Group[0]['objGroups'] } });

        return updatedGroup;
    } catch (e) {
        throw Error("Error ocurred while Creating the Sponsor");
    }
};

//Activities
exports.getActivitiesByEvent = async function (idEvent,lang,type) {
    try {
        var arrayActivities = new Array();
        arrayActivities = await ActivityService.getActivitiesbyEvent(idEvent, type, lang);
        return arrayActivities;
    } catch (e) {
        throw Error(e.message + " And Error ocurred while obtain Activities");
    }

};
exports.getActivityByIdandLang = async function (idEvent,lang,id) {
    try {
        var res = null;
        var dataevent = await Event.find({ strId: idEvent }, { 'objActivities': 1 }).lean();
        dataevent[0]['objActivities'].forEach((elem) => {
            if (elem.strId === id) {
                res = elem[lang];
            }
        });
        return res;
    } catch (e) {
        throw Error("Error ocurred while Reading the Activity");
    }
};
exports.createActivity = async function (id, lang, activity) {
    try {
        var newActivity = {
            strId: activity.id,
            [lang]: {
                strName: activity.name,
                strDescription: activity.description,
                strUrllogo: activity.urllogo,
                objGallery: [],
                intType: activity.type,
                objCustomers: [],
                dttDatebegin: activity.datebegin,
                dttDateend: activity.dateend,
                strUrlfile: activity.urlfile,
                bitActive: activity.active,
                dttCreateddate: datetimeNow(),
                dttModifieddate:null,
                strCreatedby: activity.createdby,
                strUpdatedby: null
            }
        };
        console.log(newActivity);
        var res = await Event.collection.update({ strId: id }, { $addToSet: { 'objActivities': newActivity } });
        console.log(res);
        return res;
    } catch (e) {
        throw Error("Error ocurred while Creating the Activity");
    }
};
exports.deleteActivity = async function (idEvent,id) {
    try {
        var result = false;
        var elementDeleted = await Event.update(
            {strId:idEvent},
            { $pull: { objActivities: { strId: id } } },
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
exports.updateActivity = async function (idEvent, lang, id, newActivity) {
    try {
        var dataevent = await Event.find({ strId: idEvent }, { 'objActivities': 1 }).lean();
        dataevent[0]['objActivities'].forEach((elem) => {
            if (elem.strId === id) {
                elem[lang].strName = newActivity.name ? newActivity.name : elem[lang].strName;
                elem[lang].strDescription = newActivity.description ? newActivity.description : elem[lang].strDescription;
                elem[lang].strUrllogo = newActivity.urllogo ? newActivity.urllogo : elem[lang].strUrllogo;
                elem[lang].strType = newActivity.type ? newActivity.type : elem[lang].strType;
                elem[lang].strLongitud = newActivity.longitud ? newActivity.longitud : elem[lang].strLongitud;
                elem[lang].strDatebegin = newActivity.datebegin ? newActivity.datebegin : elem[lang].strDatebegin;
                elem[lang].strDateend = newActivity.dateend ? newActivity.dateend : elem[lang].strDateend;
                elem[lang].strUrlfile = newActivity.urlfile ? newActivity.urlfile : elem[lang].strUrlfile;
                elem[lang].dttModifieddate = datetimeNow(),
                    elem[lang].strUpdatedby = newActivity.updatedby ? newActivity.updatedby : elem[lang].strUpdatedby;
            }
        });
        var updatedActivity = await Event.collection.update({ strId: idEvent }, { $set: { 'objActivities': dataevent[0]['objActivities'] } });
        return updatedActivity;
    } catch (e) {
        throw Error("Error ocurred while Updating the Activity");
    }
};

//addGallerytoActivity
exports.addGallerybyActivity = async function (idEvent, id, lang, gallery) {
    try {
        var Activity = await Event.find({ strId: idEvent }, { _id: 0, 'objActivities': 1 }).lean();
        Activity[0]['objActivities'].forEach((elem) => {
            if (elem.strId === id) {
                var newGallery = {
                    strId: gallery.id,
                    strUrl: gallery.url,
                    intPosition: gallery.position,
                    dttCreationdate: datetimeNow()
                };
                elem[lang].objGallery.push(newGallery);
            }
        });

        var updatedActivity = await Event.collection.update({ strId: idEvent }, { $set: { 'objActivities': Activity[0]['objActivities'] } });
        return updatedActivity;
    } catch (e) {
        throw Error("Error ocurred while Creating the Gallery");
    }
};

//Sessions
exports.getSessionsByEvent = async function (idEvent, lang) {
    try {
        var res = [];
        var dataevent = await Event.find({ strId: idEvent }, { 'objSessions': 1 }).lean();
        dataevent[0]['objSessions'].forEach((elem) => {
            res.push(elem[lang]);
        });
        return res;
    } catch (e) {
        throw Error(e.message + " And Error ocurred while obtain Sessions");
    }
};
exports.getSessionByIdandLang = async function (idEvent, lang, id) {
    try {
        var res = null;
        var dataevent = await Event.find({ strId: idEvent }, { 'objSessions': 1 }).lean();
        dataevent[0]['objSessions'].forEach((elem) => {
            if (elem.strId === id) {
                res=elem[lang];
            }
        });        
        return res;
    } catch (e) {
        throw Error("Error ocurred while Reading the Session");
    }
};
exports.createSession = async function (id, lang, session) {
    try {
        var newSession = {
            strId: session.id,
            [lang]: {
                strName: session.name,
                intPosition:session.position,
                strDetail:session.detail,
                bitActive: session.active,
                dttCreateddate: datetimeNow(),
                dttModifieddate:null,
                strCreatedby: session.createdby,
                strUpdatedby: null
            }
        };
        console.log(newSession);
        var res = await Event.collection.update({ strId: id }, { $addToSet: { 'objSessions': newSession } });
        console.log(res);
        return res;
    } catch (e) {
        throw Error("Error ocurred while Creating the Session");
    }
};
exports.deleteSession = async function (id, idEvent) {
    try {
        var result = false;
        var elementDeleted = await Event.update(
            { strId:idEvent},
            { $pull: { objSessions: { strId: id } } },
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
exports.updateSession = async function (idEvent, lang, id, newSession) {
    try {
        var dataevent = await Event.find({ strId: idEvent }, { 'objSessions': 1 }).lean();
        dataevent[0]['objSessions'].forEach((elem) => {
            if (elem.strId === id) {
                elem[lang].strName = newSession.name ? newSession.name : elem[lang].strName;
                elem[lang].intPosition = newSession.position ? newSession.position : elem[lang].intPosition;
                elem[lang].strDetail = newSession.detail ? newSession.detail : elem[lang].strDetail;
                elem[lang].bitActive = newSession.active ? newSession.active : elem[lang].bitActive;
                elem[lang].dttModifieddate = datetimeNow(),
                    elem[lang].strUpdatedby = newSession.updatedby ? newSession.updatedby : elem[lang].strUpdatedby;
            }
        });
        var updatedSession = await Event.collection.update({ strId: idEvent }, { $set: { 'objSessions': dataevent[0]['objSessions'] } });
        return updatedSession;
    } catch (e) {
        throw Error("Error ocurred while Updating the Session" + e.message);
    }
}

//StandPrices
exports.getStandspriceByEvent = async function (idEvent, lang) {
    try {
        var res = [];
        var dataevent = await Event.find({ strId: idEvent }, { 'objStandPrices': 1 }).lean();
        dataevent[0]['objStandPrices'].forEach((elem) => {
            res.push(elem[lang]);
        });
        return res;
    } catch (e) {
        throw Error(e.message + " And Error ocurred while obtain Stands price");
    }
};
exports.getStandByIdandLang = async function (idEvent, lang, id) {
    try {
        var res = null;
        var dataevent = await Event.find({ strId: idEvent }, { 'objStandPrices': 1 }).lean();
        dataevent[0]['objStandPrices'].forEach((elem) => {
            if (elem.strId === id) {
                res = elem[lang];
            }
        });
        return res;
    } catch (e) {
        throw Error("Error ocurred while Reading the Stand");
    }
};
exports.createStandprice = async function (id, lang, stand) {
    try {
        var newStandprice = {
            strId: stand.id,
            [lang]: {
                strName: stand.name,
                intPosition: stand.position,
                strColor: stand.color,
                strCoin1: stand.coin1,
                dblPrice1: stand.price1,
                strText1: stand.text1,
                dttDate1: stand.date1,
                strCoin2: stand.coin2,
                dblPrice2: stand.price2,
                strText2: stand.text2,
                dttDate2: stand.date2,
                bitActive: stand.active,
                dttCreateddate: datetimeNow(),
                dttModifieddate: null,
                strCreatedby: stand.createdby,
                strUpdatedby: null
            }
        };
        
        var res = await Event.collection.update({ strId: id }, { $addToSet: { 'objStandPrices': newStandprice } });
        console.log(res);
        return res;
    } catch (e) {
        throw Error("Error ocurred while Creating the StandPrice");
    }
};
exports.deleteStandprice = async function (id,idEvent) {
    try {        
        var result = false;
        var elementDeleted = await Event.update(
            { strId: idEvent },
            { $pull: { objStandPrices: { strId: id } } },
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
exports.updateStandprice = async function (idEvent, lang, id, newStand) {
    try {
        var dataevent = await Event.find({ strId: idEvent }, { 'objStandPrices': 1 }).lean();
        dataevent[0]['objStandPrices'].forEach((elem) => {
            if (elem.strId === id) {
                elem[lang].strName = newStand.name ? newStand.name : elem[lang].strName;
                elem[lang].intPosition = newStand.position ? newStand.position : elem[lang].intPosition;
                elem[lang].strColor = newStand.color ? newStand.color : elem[lang];
                elem[lang].strCoin1 = newStand.coin1 ? newStand.coin1 : elem[lang].strCoin1;
                elem[lang].dblPrice1 = newStand.price1 ? newStand.price1 : elem[lang].dblPrice1;
                elem[lang].strText1 = newStand.text1 ? newStand.text1 : elem[lang].strText1;
                elem[lang].dttDate1 = newStand.date1 ? newStand.date1 : elem[lang].dttDate1;
                elem[lang].strCoin2 = newStand.coin2 ? newStand.coin2 : elem[lang].strCoin2;
                elem[lang].dblPrice2 = newStand.price2 ? newStand.price2 : elem[lang].dblPrice2;
                elem[lang].strText2 = newStand.text2 ? newStand.text2 : elem[lang].strText2;
                elem[lang].dttDate2 = newStand.date2 ? newStand.date2 : elem[lang].dttDate2;
                elem[lang].bitActive = newStand.active ? newStand.active : elem[lang].bitActive;
                elem[lang].dttModifieddate = datetimeNow(),
                    elem[lang].strUpdatedby = newStand.updatedby ? newStand.updatedby : elem[lang].strUpdatedby;
            }
        });
        var updatedStandprice = await Event.collection.update({ strId: idEvent }, { $set: { 'objStandPrices': dataevent[0]['objStandPrices'] } });
        return updatedStandprice;
    } catch (e) {
        throw Error("Error ocurred while Updating the Session");
    }
};

//Notes
exports.getNotesByEvent = async function (idEvent, lang) {
    try {
        var res = [];
        var dataevent = await Event.find({ strId: idEvent }, { 'objNotes': 1 }).lean();
        dataevent[0]['objNotes'].forEach((elem) => {
                res.push(elem[lang]);            
        });
        return res;
    } catch (e) {
        throw Error(e.message + " And Error ocurred while obtain Notes");
    }
};
exports.getNoteByIdandLang = async function (idEvent, lang, id) {
    try {
        var res = null;
        var dataevent = await Event.find({ strId: idEvent }, { 'objNotes': 1 }).lean();
        dataevent[0]['objNotes'].forEach((elem) => {
            if (elem.strId === id) {
                res = elem[lang];
            }
        });
        return res;
    } catch (e) {
        throw Error("Error ocurred while Reading the Note");
    }
};
exports.createNote = async function (id, lang, note) {
    try {
        var newNote = {
            strId: note.id,
            [lang]: {
                strTitle: note.title,
                strName: note.name,
                strUrl: note.url,
                intPosition: note.position,
                bitActive: note.active,
                dttCreateddate: datetimeNow(),
                dttModifieddate: null,
                strCreatedby: note.createdby,
                strUpdatedby: null
            }
        };
        var res = await Event.collection.update({ strId: id }, { $addToSet: { 'objNotes': newNote } });
        return res;
    } catch (e) {
        throw Error("Error ocurred while Creating the Note");
    }
};
exports.deleteNote = async function (id, idEvent) {
    try {
        var result = false;
        var elementDeleted = await Event.update(
            { strId: idEvent },
            { $pull: { objNotes: { strId: id } } },
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
exports.updateNote = async function (idEvent, lang, id, newNote) {
    try {
        var dataevent = await Event.find({ strId: idEvent }, { 'objNotes': 1 }).lean();
        dataevent[0]['objNotes'].forEach((elem) => {
            if (elem.strId === id) {
                elem[lang].strTitle = newNote.title;
                elem[lang].strName = newNote.name;
                elem[lang].strUrl = newNote.url;
                elem[lang].intPosition = newNote.position;
                elem[lang].bitActive = newNote.active;
                elem[lang].dttModifieddate = datetimeNow(),
                elem[lang].strUpdatedby = newNote.updatedby;
            }
        });
        var updatedNote = await Event.collection.update({ strId: idEvent }, { $set: { 'objNotes': dataevent[0]['objNotes'] } });
        return updatedNote;
    } catch (e) {
        throw Error("Error ocurred while Updating the Note");
    }
};

//Banners
exports.getBannersByEvent = async function (idEvent) {
    try {
        var res = [];
        var dataevent = await Event.find({ strId: idEvent }, { 'objUrlBanners': 1 }).lean();
        dataevent[0]['objUrlBanners'].forEach((elem) => {
            res.push(elem);
        });
        return res;
    } catch (e) {
        throw Error(e.message + " And Error ocurred while obtain Banners");
    }
};
exports.getBannerByIdandLang = async function (idEvent,id) {
    try {
        var res = null;
        var dataevent = await Event.find({ strId: idEvent }, { 'objUrlBanners': 1 }).lean();
        dataevent[0]['objUrlBanners'].forEach((elem) => {
            if (elem.strId === id) {
                res = elem;
            }
        });
        return res;
    } catch (e) {
        throw Error("Error ocurred while Reading the Banner");
    }
};
exports.createBanner = async function (id, banner) {
    try {
        var newBanner = {
            strId: banner.id,
            strUrl: banner.url,
            intPosition: banner.position,
            bitActive: banner.active,
            dttCreateddate: datetimeNow(),
            dttModifieddate: null,
            strCreatedby: banner.createdby,
            strUpdatedby: null
        };        
        var res = await Event.collection.update({ strId: id }, { $addToSet: { 'objUrlBanners': newBanner } });
        return res;
    } catch (e) {
        throw Error("Error ocurred while Creating the Banner");
    }
};
exports.deleteBanner = async function (id, idEvent) {
    try {
        var result = false;
        var elementDeleted = await Event.update(
            { strId: idEvent },
            { $pull: { objUrlBanners: { strId: id } } },
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
exports.updateBanner = async function (idEvent, id, newBanner) {
    try {
        var dataevent = await Event.find({ strId: idEvent }, { 'objUrlBanners': 1 }).lean();
        dataevent[0]['objUrlBanners'].forEach((elem) => {
            if (elem.strId === id) {
                elem.strUrl = newBanner.url ? newBanner.url : elem.strUrl;
                elem.intPosition = newBanner.position ? newBanner.position : elem.intPosition;
                elem.bitActive = newBanner.active ? newBanner.active : elem.bitActive;
                elem.dttModifieddate = datetimeNow(),
                elem.strUpdatedby = newBanner.updatedby ? newBanner.updatedby : elem.strUpdatedby;
            }
        });
        var updatedBanner = await Event.collection.update({ strId: idEvent }, { $set: { 'objUrlBanners': dataevent[0]['objUrlBanners'] } });
        return updatedBanner;
    } catch (e) {
        throw Error("Error ocurred while Updating the Banner");
    }
};

//StandTypes
exports.getStandtypesByEvent = async function (idEvent,lang) {
    try {
        var res = [];
        var dataevent = await Event.find({ strId: idEvent }, { 'objStandTypes': 1 }).lean();
        dataevent[0]['objStandTypes'].forEach((elem) => {
            res.push(elem[lang]);
        });
        return res;
    } catch (e) {
        throw Error(e.message + " And Error ocurred while obtain Stand Types");
    }
};
exports.getStandtypeByIdandLang = async function (idEvent,lang, id) {
    try {
        var res = null;
        var dataevent = await Event.find({ strId: idEvent }, { 'objStandTypes': 1 }).lean();
        dataevent[0]['objStandTypes'].forEach((elem) => {
            if (elem.strId === id) {
                res = elem;
            }
        });
        return res;
    } catch (e) {
        throw Error("Error ocurred while Reading the Stand Type");
    }
};
exports.createStandtype = async function (id,lang, stand) {
    try {
        var newStand = {
            strId: stand.id,
            [lang]: {
                strColor: stand.color,
                strName: stand.name
            },
                intPosition: stand.position,
                bitActive: stand.active,
                dttCreateddate: datetimeNow(),
                dttModifieddate: null,
                strCreatedby: stand.createdby,
                strUpdatedby: null
            
        };
        console.log(newStand);
        var res = await Event.collection.update({ strId: id }, { $addToSet: { 'objStandTypes': newStand } });
        return res;
    } catch (e) {
        throw Error("Error ocurred while Creating the Stand Type");
    }
};
exports.deleteStandtype = async function (id, idEvent) {
    try {
        var result = false;
        var elementDeleted = await Event.update(
            { strId: idEvent },
            { $pull: { objStandTypes: { strId: id } } },
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
exports.updateStandtype = async function (idEvent,lang, id, newStand) {
    try {
        var dataevent = await Event.find({ strId: idEvent }, { 'objStandTypes': 1 }).lean();
        dataevent[0]['objStandTypes'].forEach((elem) => {
            if (elem.strId === id) {
                elem[lang].strColor = newStand.color ? newStand.color : elem[lang].strColor;
                elem[lang].strName = newStand.name ? newStand.name : elem[lang].strName;
                elem.intPosition = newStand.position ? newStand.position : elem.intPosition;
                elem.bitActive = newStand.active ? newStand.active : elem.bitActive;
                elem.dttModifieddate = datetimeNow(),
                elem.strUpdatedby = newStand.updatedby ? newStand.updatedby : elem.strUpdatedby;
            }
        });
        var updatedStand = await Event.collection.update({ strId: idEvent }, { $set: { 'objStandTypes': dataevent[0]['objStandTypes'] } });
        return updatedStand;
    } catch (e) {
        throw Error("Error ocurred while Updating the Stand");
    }
}; 





////////////////////////
exports.GetConceptbyEvent = async function (idEvent, lang) {
    try {
        //var arraycategory = new Array();
        var event = await Event.findOne({ strid: idEvent }, { objConcepts: 1 }).lean();
        var concepts = [];
        await Promise.all(event.objConcepts.map(async concept => {
            var objConcept = await ConceptService.getConcept(concept, lang);
            var categories = [];
            await Promise.all(objConcept[lang]['categories'].map(async category => {
                var c = await CategoryService.getCategory(category, lang);
                categories.push(c);
            }));
            objConcept[lang]['categories'] = categories;
            concepts.push(objConcept);
        }));
        event.objConcepts = concepts;
        return event;
    } catch (e) {
        throw Error(e.message + " And Error ocurred while obtain Concepts");
    }
};
exports.AddCustomersInActivity = async function (idEvent, idActivity, customer) {
    try {
        var result = '0';
        var updatedActivity = false;
        var paymentobject = createPaymentObject(customer);
        var tokennumber = await setInfoInExternalService(customer, paymentobject);
        customer.fichvnro = tokennumber;
        updatedActivity = await saveCustomerInActivity(idEvent, idActivity, customer);
        if (updatedActivity) {
            var createdPayment = await PaymentService.create(paymentobject);
            if (createdPayment)
                result = '1';

            await sendMailToCustomer(customer, idEvent);
        } else {
            result = '101';
            return result;
        }



    } catch (e) {
        console.log(e.message + " And Error ocurred while add customer");
    }
    return result;
};
function getBindingEventObject(event, lang) {
    var objEventData = event[lang];
    var newEvent = {
        id: event.strid,
        title: objEventData.strtitle,
        description: objEventData.strdescription,
        slogan: objEventData.strslogan,
        place: objEventData.strplace,
        latitude: objEventData.intlatitude,
        longitude: objEventData.intlongitude,
        datebegin: objEventData.dttdatebegin,
        dateend: objEventData.dttdateend,
        UrlBaners: objEventData.objUrlBaners,
        Halls: objEventData.objHalls,
        active: objEventData.bitactive,
        creationdate: objEventData.dttcreationdate,
        modifieddate: objEventData.dttmodifieddate,
        createdby: objEventData.strcreatedby,
        modifiedby: objEventData.strmodifiedby
    };
    return newEvent;
}
function createPaymentObject(customer) {
    var payment = {
        id: uuidv1(),
        idcustomer: customer.id,
        idcategory: customer.idcategory,
        PaymentDetail: {
            date: datetimeNow(),
            name: "Pay",
            namecontactperson: customer.billingcontactname,
            emailcontactperson: customer.billingcontactemail,
            phonecontactperson: customer.billingcontactnumber,
            typedocument: customer.billingdocumenttype,
            urldocument: customer.billingurldocument,
            documentnumber: customer.billingidentity,
            method: customer.billingtmethod,
            price: customer.totalprice,
            currency: customer.billingcurrency,
            district: customer.billingdistrict,
            active: 1,
            creationdate: datetimeNow(),
            modifieddate: null,
            createdby: customer.createdby,
            modifiedby: null
        },
        active: 1,
        creationdate: datetimeNow(),
        modifieddate: null,
        createdby: customer.createdby,
        modifiedby: null,
        fichvnro: null

    };
    return payment;
}
async function setInfoInExternalService(customer, paymentobject) {
    var result = "";
    var responseinsertiimp = await IIMPService.registercustomer(customer);
    if (responseinsertiimp.response.Code === '00') {
        paymentobject.fichvnro = responseinsertiimp.response.FichVNro;
        var responseval = await IIMPService.create(paymentobject);
        result = responseinsertiimp.response.FichVNro;
        console.log('FichVNro Service: ' + result);
    } else {
        result = responseinsertiimp.response.Message;
        console.log('Error message: ' + result);
    }
    return result;
}
async function saveCustomerInActivity(idEvent, idActivity, customer) {
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
    var isregister = false;
    var event = await Event.findOne({ strid: idEvent }).lean();
    var languages = await LanguageService.getAll();
    var activities = null;
    for (let el of languages[0].language) {
        lang = el[0].strname;
        activities = event[lang];
        break;
    }

    activities.objActivities.forEach((element) => {
        if (element.strid === idActivity) {
            element.objCustomers.forEach((el) => {
                if (el.stridentitynumber === newCustomer.stridentitynumber || el.strnumbercompany === newCustomer.numbercompany) {
                    isregister = true;
                }
            });
            if (!isregister) {
                element.objCustomers.push(newCustomer);
            }
        }
    });

    var lang = '';
    var updatedActivity = false;

    if (!isregister) {
        languages[0].language.forEach((element) => {
            lang = element[0].strname;
            updatedActivity = Event.collection.update({ strid: idEvent }, { $set: { [lang + '.objActivities']: activities.objActivities } });
        });
    }
    return updatedActivity;
}
async function getCategoriesFromId(idcategory, idEvent, lang) {


    var idobjConceptPay = "29af7fd9-58d1-4877-ae5d-ffc2127c3d9c";


    var result = null;
    var objCategories = await CategoryService.getCategoryByEvent(idcategory, lang, idobjConceptPay);


    if (objCategories !== null) {
        result = objCategories;
    } else {
        result = {
            name: "",
            duration: {
                dateto: "",
                mount: ""
            }
        };
    }
    return result;
}
exports.ValidatePartnerExternalService = async function (customer) {
    var result = {
        code: "0",
        message: "Error"
    };
    try {
        var responsevalidate = "";
        responsevalidate = await IIMPService.validatepartner(customer);
        if (responsevalidate.response.Code === "00") {
            result.message = responsevalidate.response.Message;
            result.code = "1";
        } else {
            result.message = responsevalidate.response.Message;
            result.code = responsevalidate.response.Code;
            return result;
        }
        return result;
    } catch (e) {
        return result;
    }
};
async function sendMailPaymentToCustomer(customer, idEvent, lang, payment) {

    var arrrecipients = new Array();
    var arrrecipientscc = new Array();
    arrrecipients.push(customer.email);
    arrrecipientscc.push(Constants.mailingRecipient.mail);

    if (customer.billingtmethod === 2 && customer.paymentdetails) {
        fs.readFile(path.resolve("EmailTemplates/confirmationPayment.html"), 'utf8', async function (err, data) {
            if (err) throw err;

            var fullname = customer.firstname + " " + customer.secondfirstname + " " + customer.lastname + " " + customer.secondlastname;
            var body = data;

            body = body.replace("@@NUMBER", payment.id);
            body = body.replace("@@DOCUMENT", customer.identitynumber);
            body = body.replace("@@NAME", fullname);
            body = body.replace("@@AMOUNT", (payment.amount / 100).toFixed(2));
            body = body.replace("@@DATE", datetimeNow());

            MailHelper.SendEmail(arrrecipients, arrrecipientscc, [], "Constancia de pago", body);
        });
    }

}
async function sendMailToCustomer(customer, idEvent, lang) {
    var arrrecipients = new Array();
    var arrrecipientscc = new Array();
    //arrrecipients.push("cristian.artigas@cmscloud.pe");
    // arrrecipientscc.push("acristianucla@cmscloud.pe");
    arrrecipients.push(customer.email);
    arrrecipientscc.push(Constants.mailingRecipient.mail);
    if (customer.billingtmethod !== 3) {
        fs.readFile(path.resolve("EmailTemplates/inscription.html"), 'utf8', async function (err, data) {
            if (err) throw err;
            var fullname = customer.firstname + " " + customer.secondfirstname + " " + customer.lastname + " " + customer.secondlastname;
            var body = data;
            body = body.replace("LAST_NAME_FIRST_NAME", fullname);
            body = body.replace("INDENTITY_NUMBER", customer.identitynumber);
            var nac = await MasterService.getNameNationalityByCode(customer.nacionality, customer.lang);
            body = body.replace("NACIONALITY", nac);
            body = body.replace("CELULAR", customer.celular);
            body = body.replace("CHARGE", customer.charge);
            body = body.replace("NAMECOMPANY", customer.namecompany);
            body = body.replace("NUMBERCOMPANY", customer.numbercompany);
            body = body.replace("ADDRESS", customer.address);
            body = body.replace("PHONE", customer.celular);
            body = body.replace("EMAIL", customer.email);
            body = body.replace("BILLINGNAME", customer.billingname);
            body = body.replace("BILLINGIDENTITY", customer.billingidentity);
            body = body.replace("BILLINGADDRESS", customer.billingaddress);
            body = body.replace("BILLINGCONTACTNAME", customer.billingcontactname);
            body = body.replace("BILLINGCONTACTNUMBER", customer.celular);
            body = body.replace(/BILLINGCURRENCY/g, customer.billingcurrency);
            var method = await MasterService.getMethodPaymentByCode(customer.billingtmethod, customer.lang);

            body = body.replace("BILLINGTMETHOD", method);
            body = body.replace("TOTALPRICE", customer.totalprice);
            var igvtotalprice = parseFloat(customer.totalprice) * Constants.globalvars.percentageIGV;

            body = body.replace("IGVTOTALPRICE", igvtotalprice);
            body = body.replace("SUMIGVTOTALPRICE", igvtotalprice + parseFloat(customer.totalprice));

            var billingname = await MasterService.getNameTaxDocument(customer.billingtype, customer.lang);

            body = body.replace("BILLINGTYPE", billingname);

            var objCategories = await getCategoriesFromId(customer.idcategory, idEvent, customer.lang);
            body = body.replace("NAMECATEGORY", objCategories.name);
            body = body.replace("MOUNTCATEGORY", objCategories.duration.mount);
            MailHelper.SendEmail(arrrecipients, arrrecipientscc, [], "Nuevo registro en el Evento proExplo", body);
        });
    }
    if (customer.billingtmethod === 3) {
        console.log("envioantes");
        fs.readFile(path.resolve("EmailTemplates/transfer.html"), 'utf8', function (err, data) {
            var body = data;

            MailHelper.SendEmail(arrrecipients, [], [], "Nuevo registro en el Evento proExplo", body);

        });
    }
}
exports.sendMailToAdmin = async function (contact) {
    var arrrecipients = new Array();
    var arrrecipientscc = new Array();
    //arrrecipients.push(Constants.mailingRecipient.mail);
    //console.log(Constants.mailingRecipient.mail);
    //arrrecipients.push("proexplo@iimp.org.pe");
    //arrrecipientscc.push("inscripciones@iimp.org.pe");
    arrrecipients.push(contact.email);
    var body = "El usuario " + contact.name + " " + contact.lastname + " con correo " + contact.email + " ha mandado el siguiente mensaje " + contact.message;
    MailHelper.SendEmail(arrrecipients, arrrecipientscc, [], "Contacto", body);
};
exports.sendMailToReserve = async function (stand) {
    var arrrecipients = new Array();
    var arrrecipientscc = new Array();
    //arrrecipients.push(Constants.mailingRecipient.mail);
    //arrrecipients.push("proexplo@iimp.org.pe");
    //console.log(Constants.mailingRecipient.mail);
    arrrecipients.push(stand.email);
    var body = "Razón social: " + stand.socialname + "<br /> " +
        "RUC: " + stand.ruc + "<br /> " +
        "rubro: " + stand.rubro + "<br /> " +
        "Página web: " + stand.webpage + "<br /> " +
        "Dirección: " + stand.address + "<br /> " +
        "Ciudad: " + stand.city + "<br /> " +
        "País: " + stand.country + "<br /> " +
        "Representante legal: " + stand.legal + "<br /> " +
        "Representante de exhibición: " + stand.exhibitor + "<br /> " +
        "Cargo: " + stand.charge + "<br /> " +
        "Teléfono/Fax: " + stand.phone + "<br /> " +
        "Anexo: " + stand.anexo + "<br /> " +
        "Correo electrónico: " + stand.email + "<br /> " +
        "Nombre para el fris del stand: " + stand.standname + "<br /> " +
        "Productos y servicios a exhibir: " + stand.detail + "<br /> " +
        "Cantidad de módulos solicitados: " + stand.number + "<br /> " +
        "Número de módulos solicitados (Plano): " + stand.numberplan + "<br /> "
        ;
    MailHelper.SendEmail(arrrecipients, arrrecipientscc, [], "Reserva de stand", body);
};
exports.ValidatePartnerExternalService = async function (customer) {
    var result = {
        code: "0",
        message: "Error"
    };
    try {
        var responsevalidate = "";
        if (customer.typevalidation === "0") {
            responsevalidate = await IIMPService.validatepartner(customer);
            console.log("0");
        } else if (customer.typevalidation === "1") {
            responsevalidate = await IIMPService.validatePartnerStudent(customer);
        }
        if (responsevalidate.response.Code === "00") {
            result.message = responsevalidate.response.Message;
            result.code = "1";
        } else {
            result.message = responsevalidate.response.Message;
            result.code = responsevalidate.response.Code;
            return result;
        }
        return result;
    } catch (e) {
        return result;
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
