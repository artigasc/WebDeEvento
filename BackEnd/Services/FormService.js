var hub = require('../Models/HubModel');
var MasterService = require('../Services/MasterService');
exports.getAll = async function () {
    try {
        var forms = await hub.find({}, { _id: 0, forms: 1 });
        return forms[0]['forms'];
    } catch (e) {
        throw Error(e.message + " service");
    }
};
exports.getById = async function (id, lang) {
    var forms = null;
    try {
        var formslang = "";
        formslang = "$$item." + lang;
        forms = await hub.aggregate([
            {
                $project: {
                    "forms": {
                        "$map": {
                            "input": {
                                $filter: {
                                    input: "$forms",
                                    as: "item",
                                    cond: { $eq: ["$$item.strId", id] }
                                }
                            },
                            "as": "item",
                            "in": {
                                "id": "$$item.strId",
                                 "title": "$$item." + lang + "." + "strTitle",
                                 "sections": "$$item." + lang + "." + "sections"
                            }
                        }
                    }
                }
            }
        ]);
        var newSections = new Array();
   
        if (forms.length > 0) {
            if (forms[0]["forms"] !== undefined) {
                
                var sectionslist = forms[0]["forms"][0].sections; 
               
                for (let el of sectionslist) {
                    var newSection = {
                        code: el.strCode,
                        subtitle: el.strSubTitle,
                        text: el.strText,
                        url: el.strUrl,
                        position: el.intPosition,
                        fields: new Array()
                    };
                   
                    var filedsList = el.fields;
                    var newFields = new Array();
                    if (filedsList.length > 0) {
                        for (let el of filedsList) {
                            var newField = {
                                position: el.intPosition,
                                control: el.strControl,
                                name: el.strName,
                                id: el.strId
                            };
                            if (el.hasOwnProperty('itemsSource')) {
                                var nameSource = el.itemsSource;
                                var newItemSource =await MasterService.getByLang(lang, nameSource);
                                newField['itemsSource'] = newItemSource;
                            }
                            newFields.push(newField);
                        }
                    }
                    newSection.fields = newFields;
                    newSections.push(newSection);
                }
            
                forms = forms[0]["forms"][0];
                
                forms.sections = newSections;
            }
        }
        

    } catch (e) {
        throw Error(e.message + " service");
    }
    return forms;
};

exports.getBy = async function (id, lang) {
    var forms = null;
    try {
        forms = await hub.aggregate([
            {
                $project: {
                    "forms": {
                        "$map": {
                            "input": {
                                $filter: {
                                    input: "$forms",
                                    as: "item",
                                    cond: { $eq: ["$$item.strId", id] }
                                }
                            },
                            "as": "item",
                            "in": {
                                "id": "$$item.strId",
                                "title": "$$item." + lang + "." + "strTitle",
                                "sections": "$$item." + lang + "." + "sections"
                            }
                        }
                    }
                }
            }
        ]);
       var newSections = new Array();

        if (forms.length > 0) {
            if (forms[0]["forms"] !== undefined) {

                var sectionslist = forms[0]["forms"][0];
                //console.log(sectionslist);


        //        for (let el of sectionslist) {
        //            var newSection = {
        //                code: el.strCode,
        //                subtitle: el.strSubTitle,
        //                text: el.strText,
        //                url: el.strUrl,
        //                position: el.intPosition,
        //                fields: new Array()
        //            };

        //            var filedsList = el.fields;
        //            var newFields = new Array();
        //            if (filedsList.length > 0) {
        //                for (let el of filedsList) {
        //                    var newField = {
        //                        position: el.intPosition,
        //                        control: el.strControl,
        //                        name: el.strName,
        //                        id: el.strId
        //                    };
        //                    if (el.hasOwnProperty('itemsSource')) {
        //                        var nameSource = el.itemsSource;
        //                        var newItemSource = await MasterService.getByLang(lang, nameSource);
        //                        newField['itemsSource'] = newItemSource;
        //                    }
        //                    newFields.push(newField);
        //                }
        //            }
        //            newSection.fields = newFields;
        //            newSections.push(newSection);
        //        }

        //        forms = forms[0]["forms"][0];

        //        forms.sections = newSections;
           }
        }


    } catch (e) {
        throw Error(e.message + " service");
    }
    return forms;
};