var Event = require('../Models/EventModel');
var Hub = require('../Models/HubModel');
var mongoose = require('mongoose');

_this = this;

exports.add = async function (item, lang) {
    var id = item.eventId;
    var newObject = {
        _id: new mongoose.Types.ObjectId(),
        strId: item.id,
        strURL: item.url,
        intposition: item.position,
        bitactive:item.status,
        dttupdateddate: null,
        dttcreateddate: datetimeNow(),
        strcreatedby: item.createdby,
        strupdatedby: null
    };
    var myquery = { strid: id };
    var newvalues = {
        $addToSet: {
            [[lang] + '.objUrlBanners']: newObject
        }
    };
    await Event.collection.update(myQuery,newValues);
};

function callback() {
    console.log('callback');
}
exports.edit = async function (id, lang, idbanner, newBaner) {
    try {
        var OldBanner = await Event.find({ strid: id }, { _id: 0, [lang + '.objUrlBaners']: 1 }).lean();
        OldBanner[0][lang]['objUrlBaners'].forEach((elem) => {
            if (elem.strid === idbanner) {
                elem.strurl = newBaner.url;
                elem.intposition = newBaner.position;
                elem.bitactive = newBaner.active;
                elem.dttmodifieddate = datetimeNow();
                elem.strmodifiedby = newBaner.modifiedby;
            }
            //console.log(OldBanner[0][lang]['objUrlBaners']);
        });
        var updatedBanner = await Event.collection.update({ strid: id }, { $set: { [lang + '.objUrlBaners']: OldBanner[0][lang]['objUrlBaners'] } });
        return updatedBanner;
    } catch (e) {
        throw Error("Error ocurred while Updating the Banners");
    }
};

exports.deleteBanner = async function (id, lang, idbanner) {
    try {
        var deletedBanner = await Event.update({ strid: id }, { $pull: { [lang + '.objUrlBaners']: { strid: idbanner } } });
        return deletedBanner;
    } catch (e) {
        throw Error("Error Ocurred while Deleting the Banner of Event");
    }
};
