var BannerService = require('../services/BannerService');
const uuidv1 = require('uuid/v1');

_this = this;

exports.add = async function (req, res, next) {
    var guidId = uuidv1();
    //console.log(guidId);
    var object = {
        id: guidId,
        eventId: req.body.eventId,
        url: req.body.url,
        position: req.body.position,
        status: req.body.active,
        createddate: new Date(),
        createdby: req.body.createdby
    };
    try {
        var createdEvent = await BannerService.add(object, req.body.lang);
        return res.status(201).json({ status: 201, data: createdEvent, message: "Succesfully Created Event: " + guidId });
    } catch (e) {
        return res.status(400).json({ status: 400, message: "Event Creation was Unsuccesfull " + e.message });
    }
};

exports.edit = async function (req, res, next) {
    try {
        var id = req.params.id;
        var lang = req.body.lang;
        var idbanner = req.body.idbanner;
        var newBaner = {
            url: req.body.url ? req.body.url : null,
            position: req.body.position ? req.body.position : null,
            active: req.body.active ? req.body.active : null,
            modifieddate: new Date(),
            modifiedby: req.body.modifiedby ? req.body.modifiedby : null
        };
        if (id !== undefined || idgallery !== undefined) {
            var updatedGallery = await BannerService.edit(id, lang, idbanner, newBaner);
        }
        return res.status(200).json({ status: 200, data: updatedGallery, message: "Succesfully Updated Banners of Event" });

    } catch (e) {
        return res.status(400).json({ status: 400, message: e.message });
    }
};

exports.deleteById = async function (req, res, next) {
    try {
        var id = req.params.id;
        var lang = req.body.lang;
        var idbanner = req.body.idbanner;
        if (id !== undefined || idgallery !== undefined) {
            var deleted = await BannerService.deleteBanner(id, lang, idbanner);
        }
        return res.status(200).json({ status: 200, message: "Succesfully Banner Deleted" });
    } catch (e) {
        return res.status(400).json({ status: 400, message: e.message });
    }
};

