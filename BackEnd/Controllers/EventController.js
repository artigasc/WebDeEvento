var EventService = require('../services/EventService');
var Constants = require('../app');
const uuidv1 = require('uuid/v1');
var _ = require('lodash');
_this = this;
//CRUD
exports.getEvent = async function (req, res, next) {
    try {
        if (req.params.id === undefined || req.query.lang === undefined) {
            return res.status(401).json({ status: 400, message: "IdEvent or Lang not be undefined " });
        }
        var id = req.query.id;

        var lang = req.query.lang;

        var event;
        if (id !== undefined) {
            event = await EventService.getEvent(id, lang);
        }
        return res.status(200).json({ status: 200, data: event, message: "Succefully Event Listed" });
    } catch (e) {
        return res.status(400).json({ status: 400, message: e.message });
    }
};
exports.getById = async function (req, res, next) {
    try {
        if (req.params.id === undefined || req.query.lang === undefined || req.query.platform === undefined) {
            return res.status(401).json({ status: 400, message: "Id or Lang or Platform not be undefined " });
        }
        var lang = req.query.lang;
        var idEvent = req.params.id;
        var platform = req.query.platform;

        var result;
        if (platform === '1') {
            result = await EventService.getByweb(idEvent);
        } else {
            result = await EventService.getEvent(idEvent, lang);
            console.log(result);
            //result = await EventService.getByphone(idEvent,lang);
        }

        return res.status(200).json({ status: 200, data: result, message: "Succesfully Event Recieved" });
    } catch (e) {
        return res.status(400).json({ status: 400, message: e.message });

    }
};
exports.create = async function (req, res, next) {
    if (req.query.lang === undefined) {
        return res.status(401).json({ status: 400, message: "Lang not be undefined " });
    }
    var guidId = uuidv1();

    var event = {
        id: guidId,
        eventcode: req.body.code,
        title: req.body.title,
        subtitle: req.body.subtitle,
        description: req.body.description,
        place: req.body.place,
        urlmap: req.body.urlmap,
        latitude: req.body.latitude,
        longitud: req.body.longitud,
        datebegin: req.body.datebegin,
        dateend: req.body.dateend,
        thementype: req.body.thementype,
        status: req.body.status,
        createdby: req.body.createdby,
        created_at: new Date()
    };
    try {
        var createdEvent = await EventService.create(event, req.query.lang);
        return res.status(201).json({ status: 200, data: createdEvent, message: "Succesfully Created Event: " + guidId });
    } catch (e) {

        return res.status(400).json({ status: 400, message: "Event Creation was Unsuccesfull " + e.message });
    }
};
exports.delete = async function (req, res, next) {
    try {
        var id = req.params.id;
        if (id !== undefined) {
            var deleted = await EventService.remove(id);
        }
        return res.status(200).json({ status: 200, message: "Succesfully Event Deleted" });
    } catch (e) {
        return res.status(400).json({ status: 400, message: e.message });
    }

};

//OBJHALL
exports.gethall = async function (req, res, next) {
    try {
        if (req.params.id === undefined || req.query.idhall === undefined || req.query.lang === undefined) {
            return res.status(401).json({ status: 400, message: "IdEvent or Id or Lang not be undefined " });
        }
        var idevent = req.params.id;
        var id = req.query.idhall;
        var lang = req.query.lang;
        var listed = await EventService.gethall(idevent,id,lang);
        return res.status(200).json({ status: 200, data: listed, message:"hall listed" });
    } catch (e) {
        console.log(e.message);
    }
};
exports.createHall = async function (req, res, next) {
    try {
        if (req.params.id === undefined || req.query.lang === undefined) {
            return res.status(401).json({ status: 400, message: "IdEvent or Lang not be undefined " });
        }
        var id = req.params.id;
        var lang = req.query.lang;
        var hall = {
            id: uuidv1(),
            title: req.body.title,
            name: req.body.name,
            lider: req.body.lider,
            colider: req.body.colider,
            active: req.body.active,
            createddate: new Date(),
            createdby: req.body.createdby
        };
        if (id !== undefined) {
            var createdHall = await EventService.createHall(id, lang, hall);
        }
        return res.status(200).json({ status: 200, data: createdHall, message: "Succesfully Created Hall of Event" });
    } catch (e) {
        return res.status(400).json({ status: 400, message: e.message });
    }
};
exports.updateHall = async function (req, res, next) {
    try {
        if (req.params.id === undefined || req.query.idhall === undefined || req.query.lang === undefined) {
            return res.status(401).json({ status: 400, message: "IdEvent or Id or Lang not be undefined " });
        }
        var id = req.params.id;
        var lang = req.query.lang;
        var idhall = req.query.idhall;
        var newHall = {
            title: req.body.title ? req.body.title : null,
            name: req.body.name ? req.body.name : null,
            lider: req.body.lider ? req.body.lider : null,
            colider: req.body.colider ? req.body.colider : null,
            active: req.body.active ? req.body.active : null,
            modifieddate: new Date(),
            modifiedby: req.body.modifiedby ? req.body.modifiedby : null
        };
        if (id !== undefined || idhall !== undefined) {
            var updatedHall = await EventService.updateHall(id, lang, idhall, newHall);
        }
        return res.status(200).json({ status: 200, data: updatedHall, message: "Succesfully Updated Hall of Event" });

    } catch (e) {
        return res.status(400).json({ status: 400, message: e.message });
    }
};
exports.deleteHall = async function (req, res, next) {
    try {
        if (req.params.id === undefined || req.query.idhall === undefined || req.query.lang === undefined) {
            return res.status(401).json({ status: 400, message: "IdEvent or Id or Lang not be undefined " });
        }
        var id = req.params.id;
        var lang = req.query.lang;
        var idhall = req.query.idhall;
        if (id !== undefined || idhall !== undefined) {
            var deleted = await EventService.deleteHall(id, lang, idhall);
        }
        return res.status(200).json({ status: 200, message: "Succesfully Hall Deleted" });
    } catch (e) {
        return res.status(400).json({ status: 400, message: e.message });
    }
};
//THEME OF THE HALL
exports.getThemebyHall = async function (req,res,next) {
    try {
        if (req.params.id === undefined || req.query.idhall === undefined || req.query.lang === undefined) {
            return res.status(401).json({ status: 400, message: "IdEvent or Id or Lang not be undefined " });
        }
        var idevent = req.params.id;
        var id = req.query.idhall;
        var lang = req.query.lang;
        var listed = await EventService.getThemebyHall(idevent, id, lang);
        return res.status(200).json({ status: 200, data: listed, message: "Theme listed" });
    } catch (e) {
        return res.status(400).json({ status: 400, message: e.message });
    }
};
exports.createThemebyHall = async function (req, res, next) {
    try {
        if (req.params.id === undefined || req.query.idhall === undefined || req.query.lang === undefined) {
            return res.status(401).json({ status: 400, message: "IdEvent or Id or Lang not be undefined " });
        }
        var idevent = req.params.id;
        var id = req.query.idhall;
        var lang = req.query.lang;
        var theme = {
            id: uuidv1(),
            title: req.body.title,
            datebegin: req.body.datebegin,
            dateend: req.body.dateend,
            color: req.body.color,
            thementype: req.body.thementype,
            active: req.body.active,
            creationdate: new Date(),
            createdby: req.body.createdby
        };
        var createdTheme = await EventService.createThemebyHall(idevent, id, lang, theme);
        return res.status(200).json({ status: 200, data: createdTheme, message: "Theme created" });
    } catch (e) {
        return res.status(400).json({ status: 400, message: e.message });
    }
};


//OBJGALLERY
exports.getgallery = async function (req, res, next) {
    try {
        if (req.params.id === undefined || req.query.idgallery === undefined || req.query.lang === undefined) {
            return res.status(401).json({ status: 400, message: "IdEvent or Id not be undefined " });
        }
        var idevent = req.params.id;
        var id = req.query.idgallery;
        var lang = req.query.lang;
        var listed = await EventService.getgallery(idevent, id, lang);
        return res.status(200).json({ status: 200, data: listed, message: "Gallery listed" });
    } catch (e) {
        console.log(e.message);
    }
};
exports.createGallery = async function (req, res, next) {
    try {
        if (req.params.id === undefined || req.query.lang === undefined) {
            return res.status(401).json({ status: 400, message: "IdEvent or Id not be undefined " });
        }
        var id = req.params.id;
        var lang = req.query.lang;
        var gallery = {
            id: uuidv1(),
            name: req.body.name,
            type: req.body.type,
            url:req.body.url,
            active: req.body.active,
            createddate: new Date(),
            createdby: req.body.createdby
        };
        if (id !== undefined) {
            var createdGallery = await EventService.createGallery(id, lang, gallery);
        }
        return res.status(200).json({ status: 200, data: createdGallery, message: "Succesfully Created Gallery of Event" });
    } catch (e) {
        return res.status(400).json({ status: 400, message: e.message });
    }
};
exports.updateGallery = async function (req, res, next) {
    try {
        if (req.params.id === undefined || req.query.idgallery === undefined || req.query.lang === undefined) {
            return res.status(401).json({ status: 400, message: "IdEvent or Id not be undefined " });
        }
        var id = req.params.id;
        var lang = req.query.lang;
        var idgallery = req.query.idgallery;
        var newGallery = {
            name:req.body.name?req.body.name:null,
            type: req.body.type ? req.body.type : null,
            active: req.body.active ? req.body.active : null,
            modifieddate: new Date(),
            updatedby: req.body.updatedby ? req.body.updatedby : null
        };
        if (id !== undefined || idgallery !== undefined) {
            var updatedGallery = await EventService.updateGallery(id, lang, idgallery, newGallery);
        }
        return res.status(200).json({ status: 200, data: updatedGallery, message: "Succesfully Updated Galleries of Event" });

    } catch (e) {
        return res.status(400).json({ status: 400, message: e.message });
    }
};
exports.deteleGallery = async function (req, res, next) {
    try {
        if (req.params.id === undefined || req.query.idgallery === undefined || req.query.lang === undefined) {
            return res.status(401).json({ status: 400, message: "IdEvent or Id not be undefined " });
        }
        var id = req.params.id;
        var lang = req.query.lang;
        var idgallery = req.query.idgallery;
        if (id !== undefined || idgallery !== undefined) {
            var deleted = await EventService.deleteGallery(id, lang, idgallery);
        }
        return res.status(200).json({ status: 200, message: "Succesfully Gallery Deleted" });
    } catch (e) {
        return res.status(400).json({ status: 400, message: e.message });
    }
};
//element of gallery
exports.getElementbyGallery = async function (req, res, next) {
    try {
        if (req.params.id === undefined || req.query.idgallery === undefined || req.query.lang === undefined) {
            return res.status(401).json({ status: 400, message: "IdEvent or Id or Lang not be undefined " });
        }
        var idevent = req.params.id;
        var id = req.query.idgallery;
        var lang = req.query.lang;
        var listed = await EventService.getElementbyGallery(idevent, id, lang);
        return res.status(200).json({ status: 200, data: listed, message: "Element listed" });
    } catch (e) {
        return res.status(400).json({ status: 400, message: e.message });
    }
};
exports.createElementbyGallery = async function (req,res,next) {
    try {
        if (req.params.id === undefined || req.query.idgallery === undefined || req.query.lang === undefined) {
            return res.status(401).json({ status: 400, message: "IdEvent or Id or Lang not be undefined " });
        }
        var idevent = req.params.id;
        var id = req.query.idgallery;
        var lang = req.query.lang;
        var element = {
            id: uuidv1(),
            url: req.body.url,
            position: req.body.position,
            creationdate: new Date()
        };
        var createdElement = await EventService.createElementbyGallery(idevent, id, lang, element);
        return res.status(200).json({ status: 200, data: createdElement, message: "Element created" });
    } catch (e) {
        return res.status(400).json({ status: 400, message: e.message });
    }
};

//OBJPLANES
exports.getplane = async function (req, res, next) {
    try {
        if (req.params.id === undefined || req.query.idplane === undefined || req.query.lang === undefined) {
            return res.status(401).json({ status: 400, message: "IdEvent or Id or Lang not be undefined " });
        }
        var idevent = req.params.id;
        var id = req.query.idplane;
        var lang = req.query.lang;
        var listed = await EventService.getplane(idevent, id, lang);
        return res.status(200).json({ status: 200, data: listed, message: "Plane listed" });
    } catch (e) {
        console.log(e.message);
    }
};
exports.createPlane = async function (req, res, next) {
    try {
        if (req.params.id === undefined || req.query.lang === undefined) {
            return res.status(401).json({ status: 400, message: "IdEvent or Lang not be undefined " });
        }
        var id = req.params.id;
        var lang = req.query.lang;
        var plane = {
            id: uuidv1(),
            company:req.body.company,
            active: req.body.active,
            type:req.body.type,
            position: req.body.position,
            createddate: new Date(),
            createdby: req.body.createdby 
        };
        if (id !== undefined) {
            var createdPlane = await EventService.createPlane(id, lang, plane);
        }
        return res.status(200).json({ status: 200, data: createdPlane, message: "Succesfully Created Plane of Event" });
    } catch (e) {
        return res.status(400).json({ status: 400, message: e.message });
    }
};
exports.updatePlane = async function (req, res, next) {
    try {
        if (req.params.id === undefined || req.query.idplane === undefined || req.query.lang === undefined) {
            return res.status(401).json({ status: 400, message: "IdEvent or Id not be undefined " });
        }
        var id = req.params.id;
        var lang = req.query.lang;
        var idplane = req.query.idplane;
        var newPlane = {
            company: req.body.company ? req.body.company : undefined,
            active: req.body.active ? req.body.active : undefined,
            position: req.body.position ? req.body.position : undefined,
            type: req.body.type ? req.body.type : undefined,
            modifieddate: new Date(),
            updatedby: req.body.updatedby ? req.body.updatedby : undefined
        };
        if (id !== undefined || idplane !== undefined) {
            var updatedPlane = await EventService.updatePlane(id, lang, idplane, newPlane);
        }
        return res.status(200).json({ status: 200, data: updatedPlane, message: "Succesfully Updated Plane of Event" });

    } catch (e) {
        return res.status(400).json({ status: 400, message: e.message });
    }
};
exports.detelePlane = async function (req, res, next) {
    try {
        if (req.params.id === undefined || req.query.idplane === undefined || req.query.lang === undefined) {
            return res.status(401).json({ status: 400, message: "IdEvent or Id or Lang not be undefined " });
        }
        var id = req.params.id;
        var lang = req.query.lang;
        var idplane = req.query.idplane;
        if (id !== undefined || idgallery !== undefined) {
            var deleted = await EventService.deletePlane(id, lang, idplane);
        }
        return res.status(200).json({ status: 200, message: "Succesfully Plane Deleted" });
    } catch (e) {
        return res.status(400).json({ status: 400, message: e.message });
    }
};


//ANTO - UPDATE
exports.updateEvent = async function (req, res, next) {
    try {
        var event = {
            _id: req.body._id,
            id: req.body.id,
            code: req.body.code,
            title: req.body.title,
            subtitle: req.body.subtitle,
            description: req.body.description,
            place: req.body.place,
            urlmap: req.body.urlmap,
            latitude: req.body.latitude,
            longitud: req.body.longitud,
            datebegin: req.body.datebegin,
            dateend: req.body.dateend,
            thementype: req.body.thementype,
            modifiedby: req.body.modifiedby
        };

        var lang = req.query.lang;
        var result = await EventService.getById(event.id);
        if (result._id === null || result._id === undefined) {
            return res.status(204).json({ status: 204, data: [], message: "No se pudo encontrar el evento" });
        }
        var updatedEvent = await EventService.updateEvent(event, lang);
        return res.status(200).json({ status: 200, data: updatedEvent, message: "Succesfully Updated Event" });
    } catch (e) {
        return res.status(400).json({ status: 400., message: "Controller " + e.message });
    }
};


//Exhibitor
exports.getExhibitorsbyEvent = async function (req, res, next) {
    try {
        if (req.params.id === undefined || req.query.lang === undefined) {
            return res.status(401).json({ status: 400, message: "Id or Lang not be undefined " });
        }
        var idEvent = req.params.id;
        var lang = req.query.lang;
        var type = req.query.type;
        var readExhibitor = await EventService.getExhibitorsbyEvent(idEvent, lang, type);
        return res.status(200).json({ status: 200, data: readExhibitor, message: "Succesfully Exhibitor Recieved" });
    } catch (e) {
        return res.status(400).json({ status: 400., message: "Controller " + e.message });
    }
};

//Customer
exports.getCustomerByEvent = async function (req, res, next) {

    try {
        var idEvent = req.params.id;
        if (idEvent === undefined) {
            return res.status(400).json({ status: 400, data: false, message: "Id not be Null " });
        }
        var createdSuscriber = await EventService.getCustomersbyEvent(idEvent);

        return res.status(201).json({ status: 201, data: createdSuscriber, message: "Successfully Listed Customers in Event" });
    } catch (e) {
        return res.status(400).json({ status: 400, data: false, message: "Suscriber Add was Unsuccessfull " + e.message });
    }
};

exports.addCustomerToEvent = async function (req, res, next) {
    var result = false;
    try {
        var idEvent = req.params.id;
        if (idEvent === undefined) {
            return res.status(400).json({ status: 400, data: '0', message: "Id not be Null " });
        }
        var messageValidating = validateFileds(req.body);

        if (messageValidating !== "") {
            return res.status(404).json({ status: 400, data: messageValidating, message: "Requiered Fields" });
        }

        console.log('Pass validation');

        var lang = req.body.lang;

        var customer = {
            id: uuidv1(),
            firstname: req.body.firstname,
            secondfirstname: req.body.secondfirstname,
            lastname: req.body.lastname,
            secondlastname: req.body.secondlastname,
            identitynumber: req.body.identitynumber,
            identitynumbertype: req.body.identitynumbertype,
            nacionality: req.body.nacionality,
            country: req.body.country,
            numbercompany: req.body.numbercompany,
            numbertypecompany: req.body.numbertypecompany,
            namecompany: req.body.namecompany,
            charge: req.body.charge,
            instructiongrade: req.body.instructiongrade,
            position: req.body.position,
            address: req.body.address,
            phone: req.body.phone,
            celular: req.body.celular,
            district: req.body.district,
            department: req.body.department,
            province: req.body.province,
            email: req.body.email,
            paymentdetails: req.body.paymentdetails,
            billingname: req.body.billingname,
            billingcustomertype: req.body.billingcustomertype,
            billingtype: req.body.billingtype,
            billingdocumenttype: req.body.billingdocumenttype,
            billingidentity: req.body.billingidentity,
            billingaddress: req.body.billingaddress,
            billingdistrict: req.body.billingdistrict,
            billingcontactname: req.body.billingcontactname,
            billingcontactemail: req.body.billingcontactemail,
            billingcontactnumber: req.body.billingcontactnumber,
            billingurldocument: req.body.billingurldocument,
            billingtmethod: req.body.billingtmethod,
            billingcurrency: req.body.billingcurrency,
            totalprice: req.body.totalprice,
            idconcept: req.body.idconcept,
            idcategory: req.body.idcategory,
            partnercode: req.body.partnercode,
            active: 1,
            creationdate: datetimeNow(),
            modifieddate: null,
            createdby: req.body.createdby,
            updatedby: null,
            fichvnro: null,
            lang: req.body.lang

        };
        var updatedElement = await EventService.addCustomerToEvent(idEvent, customer, lang);
        if (updatedElement === '1') {
            return res.status(201).json({ status: 201, data: "1", message: "Successfully Added Customer in Event" });
        }
        return res.status(400).json({ status: 400, data: updatedElement, message: "Error Added Customer in Event" });

    } catch (e) {

        return res.status(400).json({ status: 400, data: '0', message: e.message });

    }
};

//groups
exports.addGroup = async function (req, res, next) {
    try {

        if (req.params.id === undefined || req.query.lang === undefined) {
            return res.status(401).json({ status: 400, message: "Id or Lang not be undefined " });
        }
        var idEvent = req.params.id;
        var newGroup = {
            color: req.body.color,
            type: req.body.type,
            active: req.body.active,
            position: req.body.position,
            groupname: req.body.groupname,
            createdby: req.body.createdby
        };
        var groupsave = await EventService.addGroup(idEvent, newGroup, req.query.lang);
        if (groupsave) {
            return res.status(201).json({ status: 201, data: groupsave, message: "Successfully Added Group in Event" });
        }
    } catch (e) {
        return res.status(400).json({ status: 400, data: false, message: "Group Add was Unsuccessfull " + e.message });
    }
    return res.status(201).json({ status: 201, data: false, message: "Error Added Group in Event" });
};
exports.getGroupsbyEvent = async function (req, res, next) {
    try {
        if (req.params.id === undefined || req.query.lang === undefined) {
            return res.status(401).json({ status: 400, message: "Id or Lang not be undefined " });
        }
        var idEvent = req.params.id;
        var lang = req.query.lang;
        var type = req.query.type;  //--------necesario ?
        var readExhibitor = await EventService.getGroupsbyEvent(idEvent, type, lang);
        return res.status(200).json({ status: 200, data: readExhibitor, message: "Succesfully Groups Listed" });
    } catch (e) {
        return res.status(400).json({ status: 400., message: "Controller " + e.message });
    }
};
exports.deleteGroup = async function (req, res, next) {
    if (req.params.id === undefined || req.query.idgroup === undefined) {
        return res.status(401).json({ status: 400, message: "IdEvent or Id not be undefined " });
    }
    var idEvent = req.params.id;
    var id = req.query.idgroup;
    try {
        var deleted = await EventService.deleteGroup(idEvent, id);
        return res.status(204).json({ status: 200, data: deleted, message: "Succesfully item Deleted" });
    } catch (e) {
        return res.status(400).json({ status: 400, data: false, message: e.message });
    }
};
exports.updateGroup = async function (req, res, next) {
    try {
        if (req.params.id === undefined || req.query.lang === undefined || req.query.idgroup === undefined) {
            return res.status(401).json({ status: 400, message: "IdEvent or Lang or Id not be undefined " });
        }
        var idEvent = req.params.id;
        var lang = req.query.lang;
        var id = req.query.idgroup;
        var newGroup = {
            color: req.body.color ? req.body.color : undefined,
            position: req.body.position ? req.body.position : undefined,
            type: req.body.type ? req.body.type : undefined,
            groupname: req.body.groupname ? req.body.groupname : undefined,
            active: req.body.active ? req.body.active : undefined,
            modifieddate: new Date(),
            updatedby: req.body.updatedby ? req.body.updatedby : undefined
        };
            var updatedGroup = await EventService.updateGroup(idEvent, lang, id, newGroup);
     
        return res.status(200).json({ status: 200, data: updatedGroup, message: "Succesfully Updated Group of Event" });

    } catch (e) {
        return res.status(400).json({ status: 400, message: e.message });
    }
};


//Sponsor to Groups --revisar
exports.createSponsorbyGroup = async function (req,res,next) {
    try {
        if (req.params.id === undefined || req.query.idgroup === undefined || req.query.lang === undefined) {
            return res.status(401).json({ status: 400, message: "IdEvent or Id or Lang not be undefined " });
        }
        var idevent = req.params.id;
        var id = req.query.idgroup;
        var lang = req.query.lang;
        var sponsor = {
            id: uuidv1(),
            url: req.body.url,
            position: req.body.position,
            creationdate: new Date()
        };
        var createdElement = await EventService.createSponsorbyGroup(idevent, id, lang, sponsor);
        return res.status(200).json({ status: 200, data: createdElement, message: "Sponsor created" });
    } catch (e) {
        return res.status(400).json({ status: 400, message: e.message });
    }

};

//Activities
exports.getActivitiesByEvent = async function (req, res, next) {
    try {
        if (req.params.id === undefined || req.query.lang === undefined) {
            return res.status(401).json({ status: 400, message: "Id or Lang not be undefined " });
        }
        var idEvent = req.params.id;
        var lang = req.query.lang;
        var type = req.query.type;
        var readActivities = await EventService.getActivitiesByEvent(idEvent, type, lang);
        return res.status(200).json({ status: 200, data: readActivities, message: "Succesfully Activities Recieved" });
    } catch (e) {
        return res.status(400).json({ status: 400, message: "Controller " + e.message });
    }
};
exports.getActivityById = async function (req, res, next) {
    try {
        if (req.params.id === undefined || req.query.lang === undefined || req.query.idactivity === undefined) {
            return res.status(401).json({ status: 400, message: "IdEvent or Lang or Id not be undefined " });
        }
        var idEvent = req.params.id;
        var lang = req.query.lang;       
        var id = req.query.idactivity;
        var readActivity = await EventService.getActivityByIdandLang(idEvent, lang,id);
        return res.status(200).json({ status: 200, data: readActivity, message: "Succesfully Activity Recieved" });
    } catch (e) {
        return res.status(400).json({ status: 400, message: "Controller " + e.message });
    }
};
exports.createActivity = async function (req, res, next) {
    try {
        if (req.params.id === undefined || req.query.lang === undefined) {
            return res.status(401).json({ status: 400, message: "Id or Lang not be undefined " });
        }
        var id = req.params.id;
        var lang = req.query.lang;
        var activity = {
            id: uuidv1(),
            name: req.body.name,
            description: req.body.description,
            urllogo: req.body.urllogo,
            type: req.body.type,
            datebegin: req.body.datebegin,
            dateend: req.body.dateend,
            urlfile: req.body.urlfile,
            active: req.body.active,
            creationdate: new Date(),
            createdby: req.body.createdby
        };
        if (id !== undefined) {
            var createdActivity = await EventService.createActivity(id, lang, activity);
        }
        return res.status(200).json({ status: 200, data: createdActivity, message: "Succesfully Created Activity of Event" });
    } catch (e) {
        return res.status(400).json({ status: 400, message: e.message });
    }
};
exports.deleteActivity = async function (req, res, next) {
    if (req.params.id === undefined || req.query.idactivity === undefined) {
        return res.status(401).json({ status: 400, message: "IdEvent or Id not be undefined " });
    }
    var idEvent = req.params.id;
    var id = req.query.idactivity;
    try {
        var deleted = await EventService.deleteActivity(idEvent,id);
        return res.status(200).json({ status: 200, data: deleted, message: "Succesfully item Deleted" });
    } catch (e) {
        return res.status(400).json({ status: 400, data: false, message: e.message });
    }

};
exports.updateActivity = async function (req, res, next) {
    try {
        if (req.params.id === undefined || req.query.lang === undefined || req.query.idactivity === undefined) {
            return res.status(401).json({ status: 400, message: "IdEvent or Lang or Id not be undefined " });
        }
        var idEvent = req.params.id;
        var lang = req.query.lang;
        var id = req.query.idactivity;
        var newActivity = {
            name: req.body.name ? req.body.name : undefined,
            description: req.body.description ? req.body.description : undefined,
            urllogo: req.body.urllogo ? req.body.urllogo : undefined,
            type: req.body.type ? req.body.type : undefined,
            longitud: req.body.longitud ? req.body.longitud : undefined,
            datebegin: req.body.datebegin ? req.body.datebegin : undefined,
            dateend: req.body.dateend ? req.body.dateend : undefined,
            urlfile: req.body.urlfile ? req.body.urlfile : undefined,
            updateddate: new Date(),
            updatedby: req.body.updatedby ? req.body.updatedby : undefined
        };
        if (idEvent !== undefined || id !== undefined) {            
            var updatedActivity = await EventService.updateActivity(idEvent, lang, id, newActivity);
        }
        return res.status(200).json({ status: 200, data: updatedActivity, message: "Succesfully Updated Activity of Event" });

    } catch (e) {
        return res.status(400).json({ status: 400, message: e.message });
    }
};

//addGalleryByActivity
exports.addGallerybyActivity = async function (req, res, next) {
    try {
        if (req.params.id === undefined || req.query.idactivity === undefined || req.query.lang === undefined) {
            return res.status(401).json({ status: 400, message: "IdEvent or Id or Lang not be undefined " });
        }
        var idevent = req.params.id;
        var id = req.query.idactivity;
        var lang = req.query.lang;
        var gallery = {
            id: uuidv1(),
            url: req.body.url,
            position: req.body.position,
            creationdate: new Date()
        };
        var createdGallery = await EventService.addGallerybyActivity(idevent, id, lang, gallery);
        return res.status(200).json({ status: 200, data: createdGallery, message: "Gallery created" });
    } catch (e) {
        return res.status(400).json({ status: 400, message: e.message });
    }
};

//Sessions
exports.getSessionsByEvent = async function (req, res, next) {
    try {
        if (req.params.id === undefined || req.query.lang === undefined) {
            return res.status(401).json({ status: 400, message: "IdEvent or Lang not be undefined " });
        }
        var idEvent = req.params.id;
        var lang = req.query.lang;
        var readSessions = await EventService.getSessionsByEvent(idEvent, lang);
        return res.status(200).json({ status: 200, data: readSessions, message: "Succesfully Sessions Recieved" });
    } catch (e) {
        return res.status(400).json({ status: 400, message: "Controller " + e.message });
    }
};
exports.getSessionById = async function (req, res, next) {
    try {
        if (req.params.id === undefined || req.query.lang === undefined || req.query.idsession === undefined) {
            return res.status(401).json({ status: 400, message: "IdEvent or Lang or Id not be undefined " });
        }
        var idEvent = req.params.id;
        var lang = req.query.lang;
        var id = req.query.idsession;
        var readSession = await EventService.getSessionsByIdandLang(idEvent, lang, id);
        return res.status(200).json({ status: 200, data: readSession, message: "Succesfully Session Recieved" });
    } catch (e) {
        return res.status(400).json({ status: 400, message: "Controller " + e.message });
    }
};
exports.createSession = async function (req, res, next) {
    try {
        if (req.params.id === undefined || req.query.lang === undefined) {
            return res.status(401).json({ status: 400, message: "IdEvent or Lang not be undefined " });
        }
        var id = req.params.id;
        var lang = req.query.lang;
        var session = {
            id: uuidv1(),
            name: req.body.name,
            position: req.body.position,
            detail: req.body.detail,
            active: req.body.active,
            creationdate: new Date(),
            createdby: req.body.createdby
        };
        if (id !== undefined) {
            var createdSession = await EventService.createSession(id, lang, session);
        }
        return res.status(200).json({ status: 200, data: createdSession, message: "Succesfully Created Session of Event" });
    } catch (e) {
        return res.status(400).json({ status: 400, message: e.message });
    }
};
exports.deleteSession = async function (req, res, next) {
    if (req.params.id === undefined || req.query.idsession === undefined) {
        return res.status(401).json({ status: 400, message: "IdEvent or Id not be undefined " });
    }
    var idEvent = req.params.id;
    var id = req.query.idsession;
    try {
        var deleted = await EventService.deleteSession(id,idEvent);
        return res.status(200).json({ status: 200, data: deleted, message: "Succesfully item Deleted" });
    } catch (e) {
        return res.status(400).json({ status: 400, data: false, message: e.message });
    }

};
exports.updateSession = async function (req, res, next) {
    try {
        if (req.params.id === undefined || req.query.lang === undefined || req.query.idactivity === undefined) {
            return res.status(401).json({ status: 400, message: "IdEvent or Lang or Id not be undefined " });
        }
        var idEvent = req.params.id;
        var lang = req.query.lang;
        var id = req.query.idactivity;
        var newSession = {
            name: req.body.name ? req.body.name : undefined,
            position: req.body.position ? req.body.position : undefined,
            detail: req.body.detail ? req.body.detail : undefined,
            active: req.body.active ? req.body.active : undefined,
            updateddate: new Date(),
            updatedby: req.body.updatedby ? req.body.updatedby : undefined
        };
        if (idEvent !== undefined || id !== undefined) {
            var updatedSession = await EventService.updateSession(idEvent, lang, id, newSession);
        }
        return res.status(200).json({ status: 200, data: updatedSession, message: "Succesfully Updated Session of Event" });

    } catch (e) {
        return res.status(400).json({ status: 400, message: e.message });
    }
};

//StandPrices
exports.getStandspriceByEvent = async function (req, res, next) {
    try {
        if (req.params.id === undefined || req.query.lang === undefined) {
            return res.status(401).json({status:400,message:"IdEvent or Lang not be undefined"});
        }
        var idEvent = req.params.id;
        var lang = req.query.lang;
        var readStand = await EventService.getStandpriceByEvent(idEvent, lang);
        return res.status(200).json({ status: 200, data: readStand, message:"Succesfully Stands Price Recieved" });
    } catch (e) {
        return req.status(400).json({ status: 400, message: "Controller " + e.message });
    }
};
exports.getStandpriceById = async function (req, res, next) {
    try {
        if (req.params.id === undefined || req.query.lang === undefined || req.query.idstand === undefined) {
            return res.status(401).json({ status: 400, message: "IdEvent or Lang or Id not be undefined " });
        }
        var idEvent = req.params.id;
        var lang = req.query.lang;
        var id = req.query.idstand;
        var readStand = await EventService.getStandByIdandLang(idEvent, lang, id);
        return res.status(200).json({ status: 200, data: readStand, message: "Succesfully Stand Prices Recieved" });
    } catch (e) {
        return res.status(400).json({ status: 400, message: "Controller " + e.message });
    }
};
exports.createStandprice = async function (req,res,next) {
    try {
        if (req.params.id === undefined || req.query.lang === undefined) {
            return res.status(401).json({ status: 400, message: "IdEvent or Lang not be undefined " });
        }
        var id = req.params.id;
        var lang = req.query.lang;
        var stand = {
            id: uuidv1(),
            name: req.body.name,
            position: req.body.position,
            color: req.body.color,
            coin1: req.body.coin1,
            price1: req.body.price1,
            text1: req.body.text1,
            date1: req.body.date1,
            coin2: req.body.coin2,
            price2: req.body.price2,
            text2: req.body.text2,
            date2: req.body.date2,
            active: req.body.active,
            creationdate: new Date(),
            createdby: req.body.createdby
        };
        console.log(id);
        console.log(stand);
        if (id !== undefined) {
            var createdStand = await EventService.createStandprice(id, lang, stand);
        }
        return res.status(200).json({ status: 200, data: createdStand, message: "Succesfully Created Stand Price of Event" });
    } catch (e) {
        return res.status(400).json({ status: 400, message: e.message });
    }
};
exports.deleteStandprice = async function (req, res, next) {
    if (req.params.id === undefined || req.query.idstand === undefined) {
        return res.status(401).json({ status: 400, message: "IdEvent or Id not be undefined " });
    }
    var idEvent = req.params.id;
    var id = req.query.idstand;
    try {
        var deletedStand = await EventService.deleteStandprice(id, idEvent);
        return res.status(200).json({ status: 200, data: deletedStand, message: "Succesfully item Deleted" });
    } catch (e) {
        return res.status(400).json({ status: 400, data: false, message: e.message });
    }

};
exports.updateStandprice = async function (req, res, next) {
    try {
        if (req.params.id === undefined || req.query.lang === undefined || req.query.idstand === undefined) {
            return res.status(401).json({ status: 400, message: "IdEvent or Lang or Id not be undefined " });
        }
        var idEvent = req.params.id;
        var lang = req.query.lang;
        var id = req.query.idstand;
        var newStand = {
            name: req.body.name ? req.body.name : undefined,
            position: req.body.position ? req.body.position : undefined,
            color: req.body.color ? req.body.color : undefined,
            coin1: req.body.coin1 ? req.body.coin1 : undefined,
            price1: req.body.price1 ? req.body.price1 : undefined,
            text1: req.body.text1 ? req.body.text1 : undefined,
            date1: req.body.date1 ? req.body.date1 : undefined,
            coin2: req.body.coin2 ? req.body.coin2 : undefined,
            price2: req.body.price2 ? req.body.price2 : undefined,
            text2: req.body.text2 ? req.body.text2 : undefined,
            date2: req.body.date2 ? req.body.date2 : undefined,
            active: req.body.active ? req.body.active : undefined,
            updatedby: req.body.updatedby ? req.body.updatedby : undefined
        };
        if (idEvent !== undefined || id !== undefined) {
            var updatedStandprice = await EventService.updateStandprice(idEvent, lang, id, newStand);
        }
        return res.status(200).json({ status: 200, data: updatedStandprice, message: "Succesfully Updated StandPrice of Event" });

    } catch (e) {
        return res.status(400).json({ status: 400, message: e.message });
    }
};

//Notes
exports.getNotesByEvent = async function (req,res,next) {
    try {
        if (req.params.id === undefined || req.query.lang === undefined) {
            return res.status(401).json({ status: 400, message: "IdEvent or Lang not be undefined" });
        }
        var idEvent = req.params.id;
        var lang = req.query.lang;
        var readNote = await EventService.getNotesByEvent(idEvent, lang);
        return res.status(200).json({ status: 200, data: readNote, message: "Succesfully Notes Recieved" });
    } catch (e) {
        return res.status(400).json({ status: 400, message: "Controller " + e.message });
    }
};
exports.getNoteById = async function (req, res, next) {
    try {
        if (req.params.id === undefined || req.query.lang === undefined || req.query.idnote === undefined) {
            return res.status(401).json({ status: 400, message: "IdEvent or Lang or Id not be undefined " });
        }
        var idEvent = req.params.id;
        var lang = req.query.lang;
        var id = req.query.idnote;
        var readNote = await EventService.getNoteByIdandLang(idEvent, lang, id);
        return res.status(200).json({ status: 200, data: readNote, message: "Succesfully Note Recieved" });
    } catch (e) {
        return res.status(400).json({ status: 400, message: "Controller " + e.message });
    }
};
exports.createNote = async function (req, res, next) {
    try {
        if (req.params.id === undefined || req.query.lang === undefined) {
            return res.status(401).json({ status: 400, message: "Id or Lang not be undefined " });
        }
        var id = req.params.id;
        var lang = req.query.lang;
        var note = {
            id: uuidv1(),
            title:req.body.title,
            name: req.body.name,
            url:req.body.url,
            position: req.body.position,
            active: req.body.active,
            creationdate: new Date(),
            createdby: req.body.createdby
        };
        if (id !== undefined) {
            var createdNote = await EventService.createNote(id, lang, note);
        }
        return res.status(200).json({ status: 200, data: createdNote, message: "Succesfully Created Note of Event" });
    } catch (e) {
        return res.status(400).json({ status: 400, message: e.message });
    }
};
exports.deleteNote = async function (req, res, next) {
    if (req.params.id === undefined || req.query.idnote === undefined) {
        return res.status(401).json({ status: 400, message: "IdEvent or Id not be undefined " });
    }
    var idEvent = req.params.id;
    var id = req.query.idnote;
    try {
        var deletedNote = await EventService.deleteNote(id, idEvent);
        return res.status(200).json({ status: 200, data: deletedNote, message: "Succesfully item Deleted" });
    } catch (e) {
        return res.status(400).json({ status: 400, data: false, message: e.message });
    }

};
exports.updateNote = async function (req, res, next) {
    try {
        if (req.params.id === undefined || req.query.lang === undefined || req.query.idnote === undefined) {
            return res.status(401).json({ status: 400, message: "IdEvent or Lang or Id not be undefined " });
        }
        var idEvent = req.params.id;
        var lang = req.query.lang;
        var id = req.query.idnote;
        var newNote = {
            title: req.body.title ? req.body.title : undefined,
            name: req.body.name ? req.body.name : undefined,
            url: req.body.url ? req.body.url : undefined,
            position: req.body.position ? req.body.position : undefined,
            active: req.body.active ? req.body.active : undefined,
            updatedby: req.body.updatedby ? req.body.updatedby : undefined
        };
        if (idEvent !== undefined || id !== undefined) {
            var updatedNote = await EventService.updateNote(idEvent, lang, id, newNote);
        }
        return res.status(200).json({ status: 200, data: updatedNote, message: "Succesfully Updated Note of Event" });

    } catch (e) {
        return res.status(400).json({ status: 400, message: e.message });
    }
};

//Banners
exports.getBannersByEvent = async function (req, res, next) {
    try {
        if (req.params.id === undefined) {
            return res.status(401).json({ status: 400, message: "Id not be undefined" });
        }
        var idEvent = req.params.id;
        var readBanner = await EventService.getBannersByEvent(idEvent);
        return res.status(200).json({ status: 200, data: readBanner, message: "Succesfully Banners Recieved" });
    } catch (e) {
        return res.status(400).json({ status: 400, message: "Controller " + e.message });
    }
};
exports.getBannerById = async function (req, res, next) {
    try {
        if (req.params.id === undefined || req.query.idbanner === undefined) {
            return res.status(401).json({ status: 400, message: "IdEvent or Id not be undefined " });
        }
        var idEvent = req.params.id;
        var id = req.query.idbanner;
        var readBanner = await EventService.getBannerByIdandLang(idEvent, id);
        return res.status(200).json({ status: 200, data: readBanner, message: "Succesfully Banner Recieved" });
    } catch (e) {
        return res.status(400).json({ status: 400, message: "Controller " + e.message });
    }
};
exports.createBanner = async function (req, res, next) {
    try {
        if (req.params.id === undefined) {
            return res.status(401).json({ status: 400, message: "IdEvent not be undefined " });
        }
        var id = req.params.id;
        var banner = {
            id: uuidv1(),
            url: req.body.url,
            position:req.body.position,
            active: req.body.active,
            creationdate: new Date(),
            createdby: req.body.createdby
        };
        if (id !== undefined) {
            var createdBanner = await EventService.createBanner(id,banner);
        }
        return res.status(200).json({ status: 200, data: createdBanner, message: "Succesfully Created Banner of Event" });
    } catch (e) {
        return res.status(400).json({ status: 400, message: e.message });
    }
};
exports.deleteBanner = async function (req, res, next) {
    if (req.params.id === undefined || req.query.idbanner === undefined) {
        return res.status(401).json({ status: 400, message: "IdEvent or Id not be undefined " });
    }
    var idEvent = req.params.id;
    var id = req.query.idbanner;
    try {
        var deletedBanner = await EventService.deleteBanner(id, idEvent);
        return res.status(200).json({ status: 200, data: deletedBanner, message: "Succesfully item Deleted" });
    } catch (e) {
        return res.status(400).json({ status: 400, data: false, message: e.message });
    }

};
exports.updateBanner = async function (req, res, next) {
    try {
        if (req.params.id === undefined || req.query.idbanner === undefined) {
            return res.status(401).json({ status: 400, message: "IdEvent or Id not be undefined " });
        }
        var idEvent = req.params.id;
        var id = req.query.idbanner;
        var newBanner = {
            url: req.body.url ? req.body.url : undefined,
            position: req.body.position ? req.body.position : undefined,
            active: req.body.active ? req.body.active : undefined,
            updatedby: req.body.updatedby ? req.body.updatedby : undefined
        };
        if (idEvent !== undefined || id !== undefined) {
            var updatedNote = await EventService.updateBanner(idEvent, id, newBanner);
        }
        return res.status(200).json({ status: 200, data: updatedNote, message: "Succesfully Updated Banner of Event" });

    } catch (e) {
        return res.status(400).json({ status: 400, message: e.message });
    }
};



//StandTypes
exports.getStandtypesByEvent = async function (req, res, next) {
    try {
        if (req.params.id === undefined || req.query.lang === undefined) {
            return res.status(401).json({ status: 400, message: "Id or Lang not be undefined" });
        }
        var idEvent = req.params.id;
        var lang = req.query.lang;
        var readStands = await EventService.getStandtypesByEvent(idEvent,lang);
        return res.status(200).json({ status: 200, data: readStands, message: "Succesfully Stands Type Recieved" });
    } catch (e) {
        return res.status(400).json({ status: 400, message: "Controller " + e.message });
    }
};
exports.getStandtypeById = async function (req, res, next) {
    try {
        if (req.params.id === undefined || req.query.lang === undefined || req.query.idstand === undefined) {
            return res.status(401).json({ status: 400, message: "Id or Lang not be undefined " });
        }
        var idEvent = req.params.id;
        var lang = req.query.lang;
        var id = req.query.idstand;
        var readStand = await EventService.getStandtypeByIdandLang(idEvent,lang, id);
        return res.status(200).json({ status: 200, data: readStand, message: "Succesfully Stand Recieved" });
    } catch (e) {
        return res.status(400).json({ status: 400, message: "Controller " + e.message });
    }
};
exports.createStandtype = async function (req, res, next) {
    try {
        if (req.params.id === undefined || req.query.lang === undefined) {
            return res.status(401).json({ status: 400, message: "IdEvent or Lang not be undefined " });
        }
        var id = req.params.id;
        var lang = req.query.lang;
        var standtype = {
            id: uuidv1(),
            color: req.body.color,
            name: req.body.name,
            position: req.body.position,
            active: req.body.active,
            creationdate: new Date(),
            createdby: req.body.createdby
        };
        if (id !== undefined) {
            var createdStand = await EventService.createStandtype(id, lang, standtype);
        }
        return res.status(200).json({ status: 200, data: createdStand, message: "Succesfully Created Stand Type of Event" });
    } catch (e) {
        return res.status(400).json({ status: 400, message: e.message });
    }
};
exports.deleteStandtype = async function (req, res, next) {
    if (req.params.id === undefined || req.query.idstand === undefined) {
        return res.status(401).json({ status: 400, message: "IdEvent or Id not be undefined " });
    }
    var idEvent = req.params.id;
    var id = req.query.idstand;
    try {
        var deletedStand = await EventService.deleteStandtype(id, idEvent);
        return res.status(200).json({ status: 200, data: deletedStand, message: "Succesfully item Deleted" });
    } catch (e) {
        return res.status(400).json({ status: 400, data: false, message: e.message });
    }

};
exports.updateStandtype = async function (req, res, next) {
    try {
        if (req.params.id === undefined || req.query.lang === undefined || req.query.idstand === undefined) {
            return res.status(401).json({ status: 400, message: "IdEvent or Id not be undefined " });
        }
        var idEvent = req.params.id;
        var id = req.query.idstand;
        var lang = req.query.lang;
        var newStandtype = {
            color: req.body.color ? req.body.color : undefined,
            name: req.body.name ? req.body.name : undefined,
            position: req.body.position ? req.body.position : undefined,
            active: req.body.active ? req.body.active : undefined,
            updatedby: req.body.updatedby ? req.body.updatedby : undefined
        };
        if (idEvent !== undefined || id !== undefined) {
            var updatedNote = await EventService.updateStandtype(idEvent, lang, id, newStandtype);
        }
        return res.status(200).json({ status: 200, data: updatedNote, message: "Succesfully Updated Stand Type of Event" });

    } catch (e) {
        return res.status(400).json({ status: 400, message: e.message });
    }
};




//Concept of Event
exports.GetConceptbyEvent = async function (req, res, next) {
    try {
        if (req.params.id === undefined || req.query.lang === undefined) {
            return res.status(401).json({ status: 400, message: "Id or lang not be undefined" });
        }
        var idEvent = req.params.id;
        var lang = req.query.lang;
        var ReadConcept = await EventService.GetConceptbyEvent(idEvent, lang);
        return res.status(200).json({ status: 200, data: ReadConcept, message: "Succesfully Concept Recieved" });
    } catch (e) {
        return res.status(400).json({ status: 400, message: "Controller " + e.message });
    }
};
exports.AddCustomersInActivity = async function (req, res, next) {
    var result = false;
    try {
        var idEvent = req.params.id;
        var idActivity = req.body.idActivity;
        if (idEvent === undefined || idActivity === undefined) {
            return res.status(400).json({ status: 400, data: false, message: "Event, Language or Activity not be Null " });
        }

        var customer = {
            id: uuidv1(),
            firstname: req.body.firstname,
            secondfirstname: req.body.secondfirstname,
            lastname: req.body.lastname,
            secondlastname: req.body.secondlastname,
            identitynumber: req.body.identitynumber,
            identitynumbertype: req.body.identitynumbertype,
            nacionality: req.body.nacionality,
            country: req.body.country,
            department: req.body.department,
            province: req.body.province,
            numbercompany: req.body.numbercompany,
            numbertypecompany: req.body.numbertypecompany,
            namecompany: req.body.namecompany,
            charge: req.body.charge,
            instructiongrade: req.body.instructiongrade,
            position: req.body.position,
            address: req.body.address,
            phone: req.body.phone,
            celular: req.body.celular,
            district: req.body.district,
            type: req.body.type,
            email: req.body.email,
            billingname: req.body.billingname,
            billingcustomertype: req.body.billingcustomertype,
            billingtype: req.body.billingtype,
            billingdocumenttype: req.body.billingdocumenttype,
            billingidentity: req.body.billingidentity,
            billingaddress: req.body.billingaddress,
            billingdistrict: req.body.billingdistrict,
            billingcontactname: req.body.billingcontactname,
            billingcontactemail: req.body.billingcontactemail,
            billingcontactnumber: req.body.billingcontactnumber,
            billingurldocument: req.body.billingurldocument,
            billingtmethod: req.body.billingtmethod,
            billingcurrency: req.body.billingcurrency,
            totalprice: req.body.totalprice,
            idcategory: req.body.idcategory,
            partnercode: req.body.partnercode,
            active: 1,
            creationdate: datetimeNow(),
            modifieddate: null,
            createdby: req.body.createdby,
            updatedby: null,
            fichvnro: null,
            lang: req.body.lang
        };
        var updatedElement = await EventService.AddCustomersInActivity(idEvent, idActivity, customer);

        if (updatedElement === '1') {
            result = true;
            return res.status(201).json({ status: 201, data: updatedElement, message: "Successfully Added Customer in Activity" });
        } else if (updatedElement === '101') {
            return res.status(202).json({ status: 202, data: updatedElement, message: "Customer Exist in Activity. Not be Register" });
        }
        return res.status(400).json({ status: 400, data: updatedElement, message: "Error ocurred while add customer to event " });
    } catch (e) {
        return res.status(400).json({ status: 400, data: '0', message: "Error ocurred while add customer to event " });
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
exports.validatePartner = async function (req, res, next) {
    try {
        var lastname = req.body.lastname;
        var identitynumber = req.body.identitynumber;
        if (lastname === undefined || identitynumber === undefined) {
            return res.status(400).json({ status: 400, data: '0', message: "Identity Number or LastName not be Null " });
        }
        var customer = {
            firstname: req.body.firstname,
            secondfirstname: req.body.secondfirstname,
            lastname: req.body.lastname,
            secondlastname: req.body.secondlastname,
            identitynumber: req.body.identitynumber,
            identitynumbertype: req.body.identitynumbertype,
            typevalidation: req.body.typevalidation
        };
        var resultElement = await EventService.ValidatePartnerExternalService(customer);
        return res.status(201).json({ status: 201, data: resultElement.code, message: resultElement.message });
    } catch (e) {
        return res.status(400).json({ status: 400, data: resultElement.code, message: resultElement.message });
    }
};
exports.ContactUS = async function (req, res, next) {
    try {
        var result = EventService.sendMailToAdmin(req.body);

        return res.status(201).json({ status: 201, data: "true", message: "Successfully Email" });

    } catch (e) {

        return res.status(400).json({ status: 400, data: "false", message: "Successfully Email" });

    }

};
exports.standReserve = async function (req, res, next) {
    try {
        var result = EventService.sendMailToReserve(req.body);
        return res.status(201).json({ status: 201, data: "true", message: "Successfully Email" });
    } catch (e) {
        return res.status(400).json({ status: 400, data: "false", message: "Successfully Email" });
    }
};
function validateFileds(customer) {
    var result = "";

    for (member in customer) {
        if (customer[member] === null || customer[member] === "" || customer[member] === undefined) {
            result += "Required Filed: " + Constants.jsonCustomer[member] + "|";
        }
    }
    return result;
}