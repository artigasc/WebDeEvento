'use strict';
var express = require('express');
var path = require('path');
var request = require('request');
var rp = require('request-promise');
var emailer = require('../Helpers/mailingHelper');
var fs = require('fs');
var router = express.Router();

/* GET users listing. */

router.get('/', function (req, res) {
    //var obj = {
    //    source_id: "tkn_test_gZJ3M73XHv3Fg0By",
    //    card_number: "4111111111111111",
    //    cvv: "123",
    //    expiration_month: "09",
    //    expiration_year: "2020",
    //    email: "luis.castillo@cmscloud.pe",
    //    name: "Mifkxn",
    //    amount: parseInt("50000"),
    //    currency_code: "USD"
   
    //};

    //culqi.RegisterCharge(obj);


}); 

router.get('/location', function (req, res) {
    res.sendFile(path.resolve('views/Map.html'));
});

router.get('/RegisterFile', function (req, res) {


    var options = {
        method: 'POST',
        uri: 'http://secure2.iimp.org:8080/KBServicesAppJavaEnvironment/rest/RegistrarFicha',
        body: {
        FichVNombre:'Participante',
        FichVApePat: 'De',
        FichVApeMat: 'Prueba',
        FichVTipDoc: '1',
        FichVNumDoc: '12345678',
        FichVPais:75 ,
        FichVDpto:15 ,
        FichVPrv: 1,
        FichVDst: 13,
        FichVETipDoc:'6',
        FichVENumDoc:'123456789098',
        FichVENombre: 'Ninguna',
        FichVCrg: 'Ninguno',
        FichVDir: 'Calle Falsa 1234',
        FichVTel: '9876454398',
        FichVEmail: 'participantefalse@noexiste.com',
        FichVTipEvCod: 1,
        FichVEvenCod  : 11,
        FichVNacPer: 'P',
            FichVCNombre: 'Participante',
        FichVCApellidos: 'De Prueba',
            FichVCCelular: '9876454398',
            FichVCEmail: 'participantefalse@noexiste.com',
        FichVFNomRaz: 'PEPITA SAC',
        FichVFTipCli: 'P',
        FichVFDocumC: '03',
        FichVFTipDoc: '1',
        FichVFNumDoc: '123456765232467',
        FichVFDir: 'CALLE LAS BEGONIAS N 415',
        FichVFDst: 13,
        FichVFPrv: 1,
        FichVFDpto: 15,
        FichVFPais: 75,
            FichVFNomCon: 'JHONNY ADVINCULA',
            FichVFEmaCon: 'jmango@prueba.com',
            FichVFTelCon: '980354124',
        FichVTipCateg: '1',
        FichVCodCateg: '3',
            FichVMoneda: 'S/.',
        FichVImporte: 666.66,
            FichVSocCod: '77777',
        FichVDias: 2,
        FichVFLunes: '',
        FichVFMartes: '',
        FichVFMiercoles: '',
        FichVFJueves: '',
        FichVFViernes: '',
        FichVFSabado: '',
        FichVFDomingo: '',
        FichVCampoD03: 0,
        FichVCampoD02: 0,
        FichVCampoD01: 0,
        FichVCampoN07: 0,
        FichVCampoN06: 0,
        FichVCampoN05: 0,
        FichVCampoN04: 0,
        FichVCampoN03: 0,
        FichVCampoN02: 0,
        FichVCampoN01: 0,
        FichVCampoS07: '',
        FichVCampoS06: '',
        FichVCampoS05: '',
        FichVCampoS04: '',
        FichVCampoS03: '',
        FichVCampoS02: '',
        FichVCampoS01: ''

        },
        json:true,
        headers: {
            'content-type': 'application/json'
        }
    };


    rp.post(options)
        .then(r => {
            console.log(r);
        }).catch(e => {
            console.log(e);
        });
    

        var files = [{
            path: 'http://localhost:1337/api/file/location'
            },
            {
                path:'http://insurancemarket.ng/images/detailed/3/26e178f.png'
            },
            {
                path:path.resolve('views/sampletext.txt')
            },
            {
                path:'https://www.antennahouse.com/XSLsample/pdf/sample-link_1.pdf'
            }];
                
     emailer.SendEmail('luis.castillo@cmscloud.pe',[],files, 'Test', '<h1>Te Subscribiste al evento principal de proEXPLO 2019</h1>');







});

module.exports = router;
