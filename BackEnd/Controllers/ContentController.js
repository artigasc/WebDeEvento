var service = require('../services/ContentService');
const uuidv1 = require('uuid/v1');

_this = this;


exports.get = async function (req, res, next) {
    var id = req.query.id;
    var lang = req.query.lang;
    var viewName = req.query.viewName;
    var platform = req.query.platform;

    if (id === undefined) {
        return res.status(400).json({ status: 400, data: null, message: "Id Not be Null" });
    }
    try {
        var result = await service.get(id, lang, viewName, platform);
        return res.status(200).json({ status: 200, data: result, message: "Succesfully Customer Listed" });
    } catch (e) {
        return res.status(400).json({ status: 400, message: e.message });
    }
};