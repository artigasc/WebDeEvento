var categoryService = require('../Services/CategoryService');
const uuidv1 = require('uuid/v1');
_this = this;


exports.getAll = async function (req, res, next) {
    try {
        var lang = req.query.lang;
        var category = await categoryService.getAll(lang);
        return res.status(200).json({ status: 200, data: category, message: "Succefully Category Listed" });
    } catch (e) {
        return res.status(400).json({ status: 400, message: e.message });
    }
};


 
exports.create = async function (req, res, next) {
    if (req.body.lang === undefined) {
        return res.status(400).json({ status: 400, data: null, message: "Language Not be Null" });
    }
    var category = {
        id: uuidv1(),
        name: req.body.name,
        mount: {
            dblsol: req.body.mount.sol,
            dbldollar: req.body.mount.dollar
        },
        createdby: req.body.createdby
    };

    try {
        var createdCategory = await categoryService.create(category, req.body.lang);
        return res.status(201).json({ status: 201, data: createdCategory, message: "Succesfully Created Category" });
    } catch (e) {
        return res.status(400).json({ status: 400, message: "Category creation was Unsuccesfull" });
    }
};

exports.deleteById = async function (req, res, next) {
    var id = req.params.id;
    try {
        var deleted = await categoryService.deleteById(id);
        return res.status(204).json({ status: 200, data: deleted, message: "Succesfully item Deleted" });
    } catch (e) {
        return res.status(400).json({ status: 400, data: false, message: e.message });
    }

};

exports.getCategory = async function (req, res, next) {
    if (req.params.id === undefined) {
        return res.status(400).json({ status: 400, data: null, message: "Id Not be Null" });
    }
    var id = req.params.id;
    var lang = req.query.lang;
    try {
        var result = await categoryService.getCategory(id,lang);
        return res.status(200).json({ status: 200, data: result, message: "Succesfully Category Listed" });
    } catch (e) {
        return res.status(400).json({ status: 400, message: e.message });
    }
};