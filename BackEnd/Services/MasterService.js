var hub = require('../Models/HubModel');
var LanguageService = require('../Services/LanguageService');

exports.getByLang = async function (lang, name) {
    var result = null;
    try {
        var master = null;
        if (name === "country" || name === "district") {
            master = await hub.findOne({}, { [name]: 1 }).lean();
            result = getElementsBinding(master[name]);
        } else {
            master = await hub.findOne({}, { ['master.' + lang + '.' + name]: 1 }).lean();
            master = master.master[lang][name];
            result = getElementsBinding(master);
        }
    } catch (e) {
        throw Error(e.message + " service2");
    }
    return result;
};

exports.getNameNationalityByCode = async function (code, lang) {
    var result = "";
    try {

        //var languages = await LanguageService.getAll();
        //var lang = "";
        //for (let el of languages) {
        //    lang = el[0].strname;
        //    break;
        //}

        master = await hub.findOne({}, { ['master.' + lang + '.objCompetitorNationality']: 1 }).lean();
        master = master.master[lang].objCompetitorNationality;
        for (let el of master) {
            if (el.strCode === code) {
                return el.strName;
            }
        }

    } catch (e) {
        console.log(e.message + " service1" + lang);
    }
    return result;
};


function getElementsBinding(master) {
    var arrcountry = new Array();
    if (master.length > 0) {
        for (let el of master) {
            var countryData = {
                code: el.strCode,
                name: el.strName
            };
            arrcountry.push(countryData);
        }
        master = arrcountry;
    }
    return arrcountry;
}

exports.getNameTaxDocument = async function (code, lang) {
    var result = "";
    try {
        //var languages = await LanguageService.getAll();
        //var lang = "";
        //for (let el of languages) {
        //    lang = el[0].strname;
        //    break;
        //}
        master = await hub.findOne({}, { ['master.' + lang + '.objTaxDocument']: 1 }).lean();
        master = master.master[lang].objTaxDocument;
        for (let el of master) {
            if (el.strCode === code) {
                return el.strName;
            }
        }
    } catch (e) {
        console.log(e.message + " service3");
    }
    return result;
};

exports.getMethodPaymentByCode = async function (code, lang) {
    var res = "";
    try {
        //var languages = await LanguageService.getAll();
        //var lang = "";
        //for (let el of languages) {
        //    lang = el[0].strname;
        //    break;
        //}
        master = await hub.findOne({}, { ['master.' + lang + '.objPaymentMethod']: 1 }).lean();
        master = master.master[lang].objPaymentMethod;
        for (let el of master) {
            if (el.strCode === code) {
                return el.strName;
            }
        }

    } catch (e) {
        console.log(e.message + " service4");
    }
    return res;
};

exports.getTypeCustomerByCode = async function (code, lang) {
    var res = "";
    try {
        //var languages = await LanguageService.getAll();
        //var lang = "";
        //for (let el of languages) {
        //    lang = el[0].strname;
        //    break;
        //}
        master = await hub.findOne({}, { ['master.' + lang + '.objTypeCustomerBilling']: 1 }).lean();
        master = master.master[lang].objTypeCustomerBilling;
        for (let el of master) {
            if (el.strCode === code) {
                return el.strName;
            }
        }

    } catch (e) {
        console.log(e.message + " service5");
    }
    return res;
};

exports.getTypeDocumentByCode = async function (code, lang) {
    var res = "";
    try {
        //var languages = await LanguageService.getAll();
        //var lang = "";
        //for (let el of languages) {
        //    lang = el[0].strname;
        //    break;
        //}
        master = await hub.findOne({}, { ['master.' + lang + '.objTypeDocument']: 1 }).lean();
        master = master.master[lang].objTypeDocument;
        for (let el of master) {
            if (el.strCode === code) {
                var a = {
                    name: el.strName,
                    selected: el.bitSelected
                };
                return el.strName;
            }
        }

    } catch (e) {
        console.log(e.message + " service5");
    }
    return res;
};

exports.getAll = async function (lang) {
    var res = "";
    try {
        master = await hub.findOne({}, { ['master.' + lang + '.objTypeDocument']: 1 }).lean();
        master = master.master[lang].objTypeDocument;
    } catch (e) {
        console.log(e.message + " service5");
    }
    return master;

};

