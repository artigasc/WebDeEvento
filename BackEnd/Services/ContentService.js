var mongoose = require('mongoose');
var event = require('../Models/EventModel');
var hub = require('../Models/HubModel');
var rp = require('request-promise');
var CategoryService = require('../Services/CategoryService');
const { forEach } = require('p-iteration');
_this = this;
exports.get = async function (strId, lang, viewName, platform) {
    try {
        var result = await event.findOne({ strid: strId }, { _id: 0, strid: 1, objViews: 1 }).lean();
        var master = result['objViews'][platform];
        var viewBody = {};
        await forEach(master, async (e) => {
            if (e.strNameView === viewName) {
                await forEach(e.ObjParameters, async (p) => {
                    var nameObject = null;
                    nameObject = p.strObjName;
                    if (p.strObjName === '') {
                        nameObject = p.strCollection;
                    }
                    //if (p.strObjName === '' && p.strObjOrigin === '') {
                    if (p.strObjOrigin === '') {
                        console.log("/////////1/////////");
                        viewBody[nameObject] = await getObjMain(strId, p.strObjName, p.strCollection, p.strFields, lang);
                        //console.log(viewBody[nameObject]);
                    } else {
                        console.log("/////////2/////////");
                        var name = nameObject.split('.')[1];
                        name = name.substring(3, name.lenght);
                        viewBody[name] = await getObj(strId, p.strObjName, p.strCollection, p.strObjOrigin, p.strFields, lang);
                        //console.log(viewBody[name]);
                    }
                });

            }
        });

        console.log('FINISH');
        return viewBody;
    } catch (e) {
        throw Error("Error Occured while Selecting the item " + e.message);
    }
};

var content = 'content';

async function getObjMain(strId, objName, objCollection, fields, lang) {
    var db = null;
    if (objCollection === 'HUB') {
        db = hub;
    } else if (objCollection === 'EVENT') {
        db = event;
    }
    try {
        //console.log('Init Get Object');
        var result = null;
        result = await db.findOne({ strid: strId }, { _id: 0, strid: 1, [lang]: 1 }).lean();
        var json = {};
        await forEach(fields, (i) => {
            var item = i;
            var value = i.substring(3, i.lenght);
            if (objName === '') {
                json[value] = result[lang][item];
            } else {
                json[value] = result[lang][objName][item];
            }

        });
        return json;
    } catch (e) {
        throw Error(e.message + " service");
    }
}

var resultDynamic = null;

async function getObj(strId, objName, objCollection, strOrigin, fields, lang) {
    var db = null;
    if (objCollection === 'HUB') {
        db = hub;
    } else if (objCollection === 'EVENT') {
        db = event;
    }
    var response = await event.find({ strid: strId }, { _id: 0, [objName]: 1 }).lean();

    var name = objName.split('.')[1];
    var items = response[0][content][name];

    var result = [];
    await forEach(items, async (e) => {
        var response = await db.aggregate([{
            $project: {
                [strOrigin]: {
                    $filter: {
                        input: "$" + [strOrigin],
                        as: "item",
                        cond: {
                            $eq: ["$$item.strid", e.id]
                        }
                    }
                }
            }
        }]);
        result.push(response[0][strOrigin][0]);
        console.log(result);
    });

    resultDynamic = result;
    
    
    if (strOrigin === 'concept') {
        console.log("//////////////////////////");
        await forEach(result[0][lang]['objcategory'],async (xy) => {
            var cat = await CategoryService.getCategory(xy.strid, lang);
            if (xy.strid === cat.id) {
                xy['strnamecategory'] =cat.name;
                xy['bitisassociated'] = cat.isassociated;
                xy['bitfileattachment'] = cat.fileattachment;
            }
        });
        console.log("//////////////////////////");
        return result[0][lang]['objcategory'];
    }

    var json = null;
    if (result.length > 1) {
        json = [];
        await forEach(result, async (element) => {
            var obj = {};
            await forEach(fields, (i) => {
                console.log("Array");
                var picked = items.find(function (objElement) {
                    if (element.strid === objElement.id) {
                        if (objElement.hasOwnProperty(i)) {
                            var item = i;
                            var value = i.substring(3, i.lenght);
                            obj[value] = objElement[item];
                            return true;
                        }
                    }
                    return false;
                });

                if (!picked) {
                    var item = i;
                    var value = i.substring(3, i.lenght);
                    if (element.hasOwnProperty(i)) {
                        obj[value] = element[item];
                    } else {
                        obj[value] = element[lang][item];
                    }
                }

            });
            json.push(obj);
        });
    } else {
        json = {};
        await forEach(fields, (i) => {
            console.log("Object");
            var item = i;
            var value = i.substring(3, i.lenght);
            if (result[0].hasOwnProperty(i)) {
                json[value] = result[0][item];
            } else {
                json[value] = result[0][lang][item];
            }
        });
    }
    return json;
}

var jsonArray = [];
async function ReturnData(fields) {
    await forEach(Object.keys(resultDynamic), async key => {
        var objType = key.substring(0, 3);
        if (objType === 'obj') {
            var objName = key;
            await forEach(resultDynamic[key], async (e) => {
                var json = forKeys(fields, Object.keys(e), objName);



                //console.log(json);
                //await forEach(Object.keys(resultDynamic[key]), (h) => {
                //    var objType = h.substring(0, 3);
                //    if (objType === 'obj') {
                //        var objName = key;
                //        console.log(objName);
                //    }
                //});


                //jsonArray.push(json);
            });
        }

    });

}

async function forKeys(fields, keys, objName) {
    //console.log(objName);
    //console.log(resultDynamic[objName][0]['strnamecategory']);
    var json = {};
    await forEach(fields, async (f) => {
        await forEach(keys, (k) => {
            if (f === k) {
                var item = k;
                var value = k.substring(k, k.lenght);
                json[value] = resultDynamic[objName][0][item];
            }
        });
    });
    //console.log('JSON');
    //console.log(json);
    return json;
}

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


async function getObjArray(objName, objCollection, strOrigin, fields, lang) {

}

function getJSONFieldsAggregate(fields) {
    var json = {};
    //console.log('Building JSON Fields');
    fields.forEach((i) => {
        var item = i;
        var value = i.substring(3, i.lenght);
        json[value] = "$$item." + item;
    });
    console.log(json);
}

//function getJSONFields(result, fields, lang) {
//    var json = {};
//    fields.forEach((i) => {
//        var item = i;
//        var value = i.substring(3, i.lenght);
//        json[value] = result[lang][item];
//    });
//    console.log(json);
//}

//function getJSONFields(result, fields) {
//    var json = {};
//    fields.forEach((i) => {
//        var item = i;
//        var value = i.substring(3, i.lenght);
//        json[value] = result[item];
//    });
//    console.log(json);
//}
