'use strict';
var debug = require('debug');
var express = require('express');
var path = require('path');
var favicon = require('serve-favicon');
var logger = require('morgan');
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');
var cors = require('cors');
var app = express();

//var routes = require('./Routes/Route');
var userRoute = require('./Routes/UsersRoute');
var exhibitorRoute = require('./Routes/ExhibitorRoute');
var paymentRoute = require('./Routes/PaymentRoute');
var conceptRoute = require('./Routes/ConceptRoute');
var categoryRoute = require('./Routes/CategoryRoute');
var sponsorRoute = require('./Routes/SponsorRoute');
var eventRoute = require('./Routes/EventRoute');
var languageRoute = require('./Routes/LanguageRoute');
var customerRoute = require('./Routes/CustomerRoute');
var fileRoute = require('./Routes/Files');
var countryRoute = require('./Routes/CountryRoute');
var formRoute = require('./Routes/FormRoute');
var menuRoute = require('./Routes/MenuRoute');
var masterRoute = require('./Routes/MasterRoute');
var incomingRoute = require('./Routes/IncomingRoute');
//ANTO
var bannerRoute = require('./Routes/BannerRoute');
var contentRoute = require('./Routes/ContentRoute');

var mongoose = require('mongoose');
mongoose.Promise = require('bluebird');
//var dev_db_url = 'mongodb://127.0.0.1:27017/hubdb';
//var mongoDB = process.env.MONGODB_URI || dev_db_url;
//mongoose.connect(mongoDB);
//mongoose.Promise = global.Promise;
//var db = mongoose.connection;
//db.on('error', console.error.bind(console, 'MongoDB connection error:'));

//tenan cms
//mongoose.connect('mongodb://hubevent.documents.azure.com:10255/hubdb?ssl=true', {
//    auth: {
//        user: 'hubevent',
//        password: 'jGsTDuIe125u8bHh3RMkewBywJoImdldXYShD0c7L4d8v7RKHBoishZwIuA3xlrhRX6aOOnBG3j31wsDjmEwYQ=='
//    }
//}).then(() => console.log('connection successful'))
//    .catch((err) => console.error(err));
//tenan iimp
mongoose.connect('mongodb://eventhub.documents.azure.com:10255/hubdb?ssl=true', {
    auth: {
        user: 'eventhub',
        password: '78pcqKHq4x8O9DGbnDjNwSZCyFdHzEkpWIc219BzmiF4uMgHi5kMR8rgTP0OY1wFhlFR1tHU9xXJPgq4jvJbQg=='
    }
}).then(() => console.log('connection successful'))
    .catch((err) => console.error(err));

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('EmailTemplates', path.join(__dirname, 'EmailTemplates'));
app.set('view engine', 'pug');

// uncomment after placing your favicon in /public
//app.use(favicon(__dirname + '/public/favicon.ico'));
app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

app.use(cors());

//app.use('/', routes);
app.use('/api/user', userRoute);
app.use('/api/exhibitor', exhibitorRoute);
app.use('/api/payment', paymentRoute);
app.use('/api/category', categoryRoute);
app.use('/api/concept', conceptRoute);
app.use('/api/sponsor', sponsorRoute);
app.use('/api/event', eventRoute);
app.use('/api/language', languageRoute);
app.use('/api/customer', customerRoute);
app.use('/api/file', fileRoute);
app.use('/api/country', countryRoute);
app.use('/api/form', formRoute);
app.use('/api/menu', menuRoute);
app.use('/api/master', masterRoute);
app.use('/api/incoming',incomingRoute);
//ANTO
app.use('/api/banner', bannerRoute);
app.use('/api/content', contentRoute);


//app.use('/api', api);

// catch 404 and forward to error handler
app.use(function (req, res, next) {
    var err = new Error('Not Found');
    err.status = 404;
    next(err);
});

// error handlers

// development error handler
// will print stacktrace
if (app.get('env') === 'development') {
    app.use(function (err, req, res, next) {
        res.status(err.status || 500);
        res.render('error', {
            message: err.message,
            error: err
        });
    });
}

// production error handler
// no stacktraces leaked to user
app.use(function (err, req, res, next) {
    res.status(err.status || 500);
    res.render('error', {
        message: err.message,
        error: {}
    });
});

app.set('port', process.env.PORT || 3000);

var server = app.listen(app.get('port'), function () {
    debug('Express server listening on port ' + server.address().port);
});



//Mailing Variables

//Mail Service ej: Outlook,Outlook365,Gmail
exports.mailingServiceType = 'Gmail';
exports.mailingSender = {
    //user: 'colaborador@cmscloud.pe',
    user: 'inscripciones@iimp.org.pe',
    //pass: 'Cms@Cloud2016'
    pass: 'IIMP2018@insc'
};

exports.CulqiKey = 'sk_test_K6F73R19WUVVMJoJ';

exports.CreditCardModel = {
    card_number: 'Numero de Tarjeta',
    cvv: 'Codigo de Seguridad',
    expiration_month: 'Mes de Vencimiento',
    expiration_year: 'Año de Vencimiento',
    email:'Email'
};

exports.mailingRecipient = {
    mail: 'inscripciones@iimp.org.pe'
};

exports.globalvars = {
    percentageIGV: 0.18
};

exports.jsonCustomer = {
    firstname: "Primer Nombre",
    secondfirstname: "Segundo Nombre",
    lastname: "Primer Apellido",
    secondlastname: "Segundo Apellido",
    identitynumber: "Número de Documento",
    identitynumbertype: "Tipo de Documento",
    nacionality: "Nacionalidad",
    country: "País",
    numbercompany: "Número de Documento Empresa",
    numbertypecompany: "Tipo de Documento Empresa",
    namecompany: "Empresa",
    charge: "Cargo",
    instructiongrade: "Grado de Instrucción",
    position: "Posición",
    address: "Dirección",
    phone: "Teléfono",
    celular: "Célular",
    district: "Distrito",
    department: "Departamento",
    province: "Province",
    email: "Email",
    billingname: "Razón Social Facturación",
    billingcustomertype: "Tipo de Cliente",
    billingtype: "Tipo de Documento Factua/Boleta",
    billingdocumenttype: "Tipo de Documento Pago",
    billingidentity: "Número de Documento Pago",
    billingaddress: "Dirección Pago",
    billingdistrict: "Distrito Pago",
    billingcontactname: "Nombre del Contacto",
    billingcontactemail: "Email Contacto",
    billingcontactnumber: "Teléfono Contacto",
    billingurldocument: "Adjunto de Documento Pago",
    billingtmethod: "Método de Pago",
    billingcurrency: "Moneda de Pago",
    totalprice: "Monto a Pagar",
    idcategory: "Categoría",
    partnercode: "Código de Socio"
};

exports.DateDiff = {

    inDays: function (d1, d2) {
        var t2 = d2.getTime();
        var t1 = d1.getTime();

        return parseInt((t2 - t1) / (24 * 3600 * 1000));
    },

    inWeeks: function (d1, d2) {
        var t2 = d2.getTime();
        var t1 = d1.getTime();

        return parseInt((t2 - t1) / (24 * 3600 * 1000 * 7));
    },

    inMonths: function (d1, d2) {
        var d1Y = d1.getFullYear();
        var d2Y = d2.getFullYear();
        var d1M = d1.getMonth();
        var d2M = d2.getMonth();        
        return (d2M + 12 * d2Y) - (d1M + 12 * d1Y);
    },

    inYears: function (d1, d2) {
        return d2.getFullYear() - d1.getFullYear();
    }
};




