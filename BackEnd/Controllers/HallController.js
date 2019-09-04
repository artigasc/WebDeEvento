var hallService = require('../Services/HallService');
_this = this;

exports.getAll = async function (req, res, next) {
    try {
        var hall = await hallService.getAll();
        return res.status(200).json({ status: 200, data: hall, message: "Succefully Hall Listed" });
    } catch (e) {
        return res.status(400).json({ status: 400, message: e.message });
    }
};
exports.getHall = async function (req, res, next) {
    if (req.params.id === undefined) {
        return res.status(400).json({ status: 400, data: null, message: "Id Not be Null" });
    }
    var id = req.params.id;
    var lang = req.query.lang;
    try {
        var result = await hallService.getHall(id, lang);
        return res.status(200).json({ status: 200, data: result, message: "Succesfully Hall Listed" });
    } catch (e) {
        return res.status(400).json({ status: 400, message: e.message });
    }
};
exports.create = async function (req, res, next) {
    try {
        var id = req.body.id;
        if (id !== undefined) {            
            var language = req.body.lang;
            var hall = {
                id: id,
                title: req.body.title,
                name: req.body.name,
                lider: req.body.lider,
                responsible: req.body.responsible,
                active: req.body.active,
                createdby: req.body.createdby
            };
            var createdHall = await hallService.create(hall, language);
        }
        return res.status(201).json({ status: 201, data: createdHall, message: "Succesfully Created Hall " });
    } catch (e) {
        return res.status(400).json({ status: 400, data: false, message: "Hall Creation was Unsuccesfull " + e.message });
    }
};
exports.deleteById = async function (req, res, next) {
    var id = req.params.id;
    try {
        if (id !== undefined) {
            var deleted = await hallService.remove(id);
        }
        return res.status(200).json({ status: 200, message: "Succesfully Hall Deleted" });
    } catch (e) {
        return res.status(400).json({ status: 400, message: e.message });
    }
};
