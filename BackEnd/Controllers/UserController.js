var userService = require('../Services/UserService');
const uuidv1 = require('uuid/v1');
_this = this;

exports.getAll = async function (req, res, next) {
    try {
        var user = await userService.getAll();
        return res.status(200).json({ status: 200, data: user, message: "Succefully Sponsor Listed" });
    } catch (e) {
        return res.status(400).json({ status: 400, message: e.message });
    }
};


exports.create = async  (req, res, next) => {
    if (req.body.lang === undefined) {
        return res.status(400).json({ status: 400, message: "Language not be null" });
    }
    var user = {
        id: uuidv1(),
        identitynumber: req.body.identitynumber,
        identitynumbertype: req.body.identitynumbertype,
        name: req.body.name,
        pictureurl: req.body.pictureurl,
        lastname: req.body.lastname,
        username: req.body.username,
        password: req.body.password,
        phone: req.body.phone,
        celular: req.body.celular,
        charge: req.body.charge,
        email: req.body.email,
        creationdate: datetimeNow(),
        createdby: req.body.createdby
    };

    try {
        var createdMenu = await userService.create(user, req.body.lang);
        return res.status(201).json({ status: 201, data: createdMenu, message: "Succesfully Created User" });
    } catch (e) {

        return res.status(400).json({ status: 400, message: "User Creation was Unsuccesfull" });
    }
};

exports.deleteById = async function (req, res, next) {
    if (req.params.id === undefined) {
        return res.status(400).json({ status: 400, data: null, message: "Id Not be Null" });
    }
    var id = req.params.id;
    try {
        var deleted = await userService.deleteById(id);
        console.log(deleted);
        return res.status(204).json({ status: 200, data: deleted, message: "Succesfully User Deleted" });
    } catch (e) {
        return res.status(400).json({ status: 400, data: false, message: e.message });
    }

};

exports.getUser = async function (req, res, next) {
    if (req.params.id === undefined || req.query.lang === undefined) {
        return res.status(400).json({ status: 400, data: null, message: "Id or Language Not be Null" });
    }
    var id = req.params.id;
    var lang = req.query.lang;
    try {
        var result = await userService.getUser(id,lang);
        return res.status(200).json({ status: 200, data: result, message: "Succesfully User Listed" });
    } catch (e) {
        return res.status(400).json({ status: 400, message: e.message });
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