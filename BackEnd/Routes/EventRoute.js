'use strict';
var express = require('express');
var router = express.Router();
var EventController = require('../Controllers/EventController');

//Event
router.get('/', EventController.getEvent);
router.get('/:id', EventController.getById);
router.post('/', EventController.create);
router.delete('/:id', EventController.delete);
router.put('/', EventController.updateEvent);

///////
router.get('/hall/:id', EventController.gethall);
router.post('/hall/:id', EventController.createHall);
router.put('/hall/:id', EventController.updateHall);
router.delete('/hall/:id', EventController.deleteHall);

router.get('/themeofhall/:id', EventController.getThemebyHall);
router.post('/themeofhall/:id', EventController.createThemebyHall);

router.get('/gallery/:id', EventController.getgallery);
router.post('/gallery/:id', EventController.createGallery);
router.put('/gallery/:id', EventController.updateGallery);
router.delete('/gallery/:id', EventController.deteleGallery);

router.get('/elementofgallery/:id', EventController.getElementbyGallery);
router.post('/elementofgallery/:id', EventController.createElementbyGallery);

router.get('/planes/:id', EventController.getplane);
router.post('/planes/:id', EventController.createPlane);
router.put('/planes/:id', EventController.updatePlane);
router.delete('/planes/:id', EventController.detelePlane);

/////////////////

router.get('/getExhibitorsbyEventId/:id', EventController.getExhibitorsbyEvent);
router.post('/addcustomer/:id', EventController.addCustomerToEvent);
router.get('/getcustomerbyevent/:id', EventController.getCustomerByEvent);
router.post('/validatecustomer', EventController.validatePartner);

//group
router.post('/addgroup/:id', EventController.addGroup); 
router.get('/getgroups/:id', EventController.getGroupsbyEvent);
router.delete('/group/:id', EventController.deleteGroup);
router.put('/group/:id', EventController.updateGroup);
//sponsorbgroup
router.post('/addsponsorbygroup/:id', EventController.createSponsorbyGroup); 


//concept of event
router.get('/getconcepts/:id', EventController.GetConceptbyEvent);

//activities
router.get('/activity/:id', EventController.getActivitiesByEvent);
router.get('/activityById/:id', EventController.getActivityById);
router.post('/activity/:id', EventController.createActivity);
router.delete('/activity/:id', EventController.deleteActivity);
router.put('/activity/:id', EventController.updateActivity);

//addGallerytoActivity
router.post('/addGallerybyActivity/:id', EventController.addGallerybyActivity);


//sessions
router.get('/session/:id', EventController.getSessionsByEvent);
router.get('/sessionById/:id', EventController.getSessionById);
router.post('/session/:id', EventController.createSession);
router.delete('/session/:id', EventController.deleteSession);
router.put('/session/:id', EventController.updateSession);

//standsprice
router.get('/standprice/:id', EventController.getStandspriceByEvent);
router.get('/standpriceById/:id', EventController.getStandpriceById);
router.post('/standprice/:id', EventController.createStandprice);
router.delete('/standprice/:id', EventController.deleteStandprice);
router.put('/standprice/:id', EventController.updateStandprice);

//notes
router.get('/note/:id', EventController.getNotesByEvent);
router.get('/noteById/:id', EventController.getNoteById);
router.post('/note/:id', EventController.createNote);
router.delete('/note/:id', EventController.deleteNote);
router.put('/note/:id', EventController.updateNote);

//banners
router.get('/banner/:id', EventController.getBannersByEvent);
router.get('/bannerById/:id', EventController.getBannerById);
router.post('/banner/:id', EventController.createBanner);
router.delete('/banner/:id', EventController.deleteBanner);
router.put('/banner/:id', EventController.updateBanner);


//standtypes
router.get('/standtype/:id', EventController.getStandtypesByEvent);
router.get('/standtypeById/:id', EventController.getStandtypeById);
router.post('/standtype/:id', EventController.createStandtype);
router.delete('/standtype/:id', EventController.deleteStandtype);
router.put('/standtype/:id', EventController.updateStandtype);


//
router.post('/addcustomertoactivity/:id', EventController.AddCustomersInActivity);


//emails
router.post('/contactus/', EventController.ContactUS);
router.post('/standReserve/', EventController.standReserve);

module.exports = router;

