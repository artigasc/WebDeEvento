var config = require('../Models/ConfigModel');
var _ = require('lodash');

exports.getAll = async function () {
    try {
        var country = await config.find({}, { _id: 0, country: 1 }).lean();


        return country[0]['country'];
    } catch (e) {
        throw Error(e.message + " service");
    }
};


exports.getDistrictsByProvince = async function (id, idDepartament, idProvince) {
    try { 
        var district = await config.aggregate([{
            $project: {
                "district": {
                    "$map": {
                        "input": {
                            $filter: {
                                input: "$district",
                                as: "item",
                                cond: { $eq: ["$$item.strCodecountry", id] }
                            }
                        },
                        "as": "item",
                        "in": {
                            "Codecountry": "$$item.strCodecountry",
                            "Codedepartament": "$$item.strCodedepartament",
                            "Codeprovince": "$$item.strCodeprovince",                            
                            "strCode": "$$item.strCode",
                            "strName": "$$item.strName"
                        }
                    }
                }
            }
        }]);
        var districts = district[0]['district'];
        var provincesByDepartment = _.filter(districts, (item) => { return item['Codedepartament'] === idDepartament; });
        var districtsByProvince = _.filter(provincesByDepartment, (item) => { return item['Codeprovince'] === idProvince; });
        var sortedDistricts = _.sortBy(districtsByProvince, 'strName');
        return sortedDistricts;
    } catch (e) {
        throw Error(e.message + " service");
    }
};

exports.getProvincesByDepartament = async function (id, idDepartament) {
    try {
        var province = await config.aggregate([{
            $project: {
                "province": {
                    "$map": {
                        "input": {
                            $filter: {
                                input: "$province",
                                as: "item",
                                cond: { $eq: ["$$item.strCodecountry", id] }
                            }
                        },
                        "as": "item",
                        "in": {
                            "Codecountry": "$$item.strCodecountry",
                            "Codedepartament": "$$item.strCodedepartament",
                            "strCode": "$$item.strCode",
                            "strName": "$$item.strName"
                        }
                    }
                }
            }


        }]);
        var provinces = province[0]['province'];
        var provincesByDepartment = _.filter(provinces, (item) => { return item['Codedepartament'] === idDepartament;});



        var sortedProvinces = _.sortBy(provincesByDepartment, 'strName');
        return sortedProvinces;
    } catch (e) {
        throw Error(e.message + " service");
    }
};

///
exports.getDepartamentsByCountry = async function (id) {
    try {
        var departament = await config.aggregate([{
            $project: {
                "departament": {
                    "$map": {
                        "input": {
                            $filter: {
                                input: "$departament",
                                as: "item",
                                cond: { $eq: ["$$item.strCodecountry", id] }
                            }
                        },
                        "as": "item",
                        "in": {
                            "Codecountry": "$$item.strCodecountry",                          
                            "strCode": "$$item.strCode",
                            "strName": "$$item.strName"
                        }
                    }
                }
            }
        }]);
        var sortedDepartaments = _.sortBy(departament[0]['departament'], 'strName');
        return sortedDepartaments;
    } catch (e) {
        throw Error(e.message + " service");
    }
};