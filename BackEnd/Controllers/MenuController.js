var MenuService = require('../Services/MenuService');
const uuidv1 = require('uuid/v1');
_this = this;

exports.getAll = async function (req,res,next) {
    try {
        var lang = req.query.lang;
        var menu = await MenuService.getAll(lang);
        for (let el of menu) {
            el.Items =await MenuService.getSubmenu(el.Id,lang);
        }
        //console.log(menu.Items);
        return res.status(200).json({ status: 200, data: menu, message: "Succefully Menu Listed" });
    } catch (e) {
        return res.status(400).json({ status: 400, message: e.message });
    }
};


exports.getSubmenu = async function (req, res, next) {
    try {
        var id = req.params.id;
        var lang = req.query.lang;
        var submenu = await MenuService.getSubmenu(id,lang);
        return res.status(200).json({ status: 200, data: submenu, message: "Succefully Menu Listed" });
    } catch (e) {
        return res.status(400).json({ status: 400, message: e.message });
    }
};