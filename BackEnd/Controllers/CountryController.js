var CountryService = require('../Services/CountryService');
_this = this;

exports.getAll = async function (req,res,next) {
    try {
        var country = await CountryService.getAll();
        return res.status(200).json({ status: 200, data: country, message: "Succefully Country Listed" });
    } catch (e) {
        return res.status(400).json({ status: 400, message: e.message });
    }
};

exports.getDepartament = async function (req, res, next) {
    try {
        id = req.query.idcountry;
        if (id !== undefined) {
            var departament = await CountryService.getDepartamentsByCountry(id);
            return res.status(200).json({ status: 200, data: departament, message: "Succefully Departament Listed" });
        }
    } catch (e) {
        return res.status(400).json({ status: 400, message: e.message });
    }
};

exports.getProvince = async function (req, res, next) {
    try {
        id = req.query.idcountry;
        idDepartament = req.query.iddepartment;
        if (id !== undefined) {
            var province = await CountryService.getProvincesByDepartament(id, idDepartament);

            return res.status(200).json({ status: 200, data: province, message: "Succefully Province Listed" });
        }
    } catch (e) {
        return res.status(400).json({ status: 400, message: e.message });
    }
};

exports.getDistricts = async function (req, res, next) {
    try {
        id = req.query.idcountry;
        idDepartament = req.query.iddepartment;
        idProvince = req.query.idprovince;
        if (id !== undefined) {
            var district = await CountryService.getDistrictsByProvince(id,idDepartament,idProvince);
            return res.status(200).json({ status: 200, data: district, message: "Succefully District Listed" });
        }
    } catch (e) {
        return res.status(400).json({ status: 400, message: e.message });
    }
};