var event = require('../Models/EventModel');
var mongoose = require('mongoose');

_this = this;

exports.getActivitiesbyEvent = async function (idEvent, type, lang) {
    try {
        var arrayActivities = new Array();
        var dataevent = await event.findOne({ strId: idEvent }, { 'objActivities': 1 }).lean();
        var obj = dataevent['objActivities'];
        var activities = obj[0][lang];
        //console.log(obj[0]);

        //arreglar condicion  ----->
        if (activities.length > 0) {
            for (i = 0; i < activities.length; i++) {
                if (activities[i].inttype === type) {
                    console.log(activities[i]);
                    arrayActivities.push(getBindingActivityObject(activities[i]));
                }
            }
        } 
        return arrayActivities;
    } catch (e) {
        throw Error(e.message + " And Error ocurred while obtain Activities");
    }

};


function getBindingActivityObject(activity) {
    var newActivity = {
        id: activity.strid,
        name: activity.strname,
        description: activity.strdescription,
        place: activity.strplace,
        urllogo: activity.strurllogo,
        Gallery: activity.objgallery,
        type: activity.inttype,
        urlfile: activity.strurlfile,
        datebegin: activity.dttdatebegin,
        dateend: activity.dttdateend,
        active: activity.bitactive,
        creationdate: activity.dttcreationdate,
        modifieddate: activity.dttmodifieddate,
        createdby: activity.strcreatedby,
        modifiedby: activity.strmodifiedby
    };
    return newActivity;
}