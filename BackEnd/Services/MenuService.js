var hub = require('../Models/HubModel');

exports.getAll = async function (lang) {
    try {
        var menuBody = new Array();
        var menu = await hub.find({}, { _id: 0, menu: 1 }).lean();
        var master = menu[0]['menu'];
        for (let el of master) {
            if (el.strParentId === "" && el.bitActive !== 0) {
                var body = {
                    Id: el.strId,
                    Name: el[lang].strName,
                    Position: el.intPosition,
                    Checked: el.bitChecked,
                    Url: el.strUrl,
                    UrlMobile: el.strUrlMobile,
                    Items: [],                    
                    Active: el.bitActive,
                    Creationdate: el.dttCreationdate,
                    Modifieddate: el.dttModifieddate,
                    Createdby: el.strCreatedby,
                    Modifiedby: el.strModifiedby
                };
                menuBody.push(body);
            }
        }
        return menuBody;
    } catch (e) {
        throw Error(e.message + " service");
    }
};

exports.getSubmenu = async function (id,lang) {
    try {
        var submenuBody = new Array();
        var menu = await hub.find({}, { _id: 0, menu: 1 }).lean();
        var master = menu[0]['menu'];
        for (let el of master) { 
            if (el.strParentId === id && el.bitActive!==0) {
                var body = {
                    Id: el.strId,
                    ParentId: el.strParentId,
                    Position: el.intPosition,
                    Checked: el.bitChecked,
                    Url: el.strUrl,
                    UrlMobile: el.strUrlMobile,
                    Items: [],
                    Name: el[lang].strName,
                    Active: el.bitActive,
                    Creationdate: el.dttCreationdate,
                    Modifieddate: el.dttModifieddate,
                    Createdby: el.strCreatedby,
                    Modifiedby: el.strModifiedby
                };
                submenuBody.push(body);
            }
        }
        return submenuBody;
    } catch (e) {
        throw Error(e.message + " service");
    }
};