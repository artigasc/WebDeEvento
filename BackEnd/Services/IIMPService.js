'use strict';
var rp = require('request-promise');

exports.create = async function (payment) {  
    var options = {
        method: 'POST',
        uri: 'http://secure2.iimp.org:8080/KBServicesAppJavaEnvironment/rest/RegistrarPago',
        body: {
            FichVNro: payment.fichvnro,
            FichVMetPag: payment.PaymentDetail.method,
            FichVEstPag: "P",//Estado de Pago
            FichVIdPag: '496565',//Id Pago
            FichVCMessPago: '00',//Codigo Return Pago
            FichVMessPag: "Pago realizado con Exito."
        },
        json: true,
        headers: {
            'content-type': 'application/json'
        }
    };
    try {
       result= rp.post(options)
           .then(r => {
               console.log(r);
               return r;
            }).catch(e => {
                console.log(e);
            });
    
    } catch (e) {
        return false;
    }
    return true;
};

exports.registercustomer = async function (customer) {
    var result = false;
    
   
    var options = {
        method: 'POST',
        uri: 'http://secure2.iimp.org:8080/KBServicesAppJavaEnvironment/rest/RegistrarFicha',
        body: {
            FichVTipEvCod: 1,
            FichVEvenCod: 11,
            FichVNombre: customer.firstname + " " + customer.secondfirstname,
            FichVApePat: customer.lastname,
            FichVApeMat: customer.secondlastname,
            FichVNacPer: customer.nacionality,
            FichVTipDoc: customer.identitynumbertype,
            FichVNumDoc: customer.identitynumber,
            FichVENombre: customer.namecompany,
            FichVCrg: customer.charge,
            FichVETipDoc: customer.numbertypecompany,
            FichVENumDoc: customer.numbercompany,
            FichVDir: customer.address,
            FichVPais: customer.country,
            FichVDpto: customer.department,
            FichVPrv: customer.province,
            FichVDst: customer.district,
            FichVTel: customer.celular,
            FichVEmail: customer.email,
            FichVCNombre: customer.firstname + " " + customer.secondfirstname,
            FichVCApellidos: customer.lastname + " " + customer.secondlastname,
            FichVCCelular: customer.celular,
            FichVCEmail: customer.email,
            FichVFNomRaz: customer.billingname,
            FichVFTipCli: customer.billingcustomertype,
            FichVFDocumC: customer.billingtype,
            FichVFTipDoc: customer.billingdocumenttype,
            FichVFNumDoc: customer.billingidentity,
            FichVFDir: customer.billingaddress,
            FichVFDst: customer.billingdistrict,
            FichVFPrv: customer.province,
            FichVFDpto: customer.department,
            FichVFPais: customer.country,
            FichVFNomCon: customer.billingcontactname,
            FichVFEmaCon: customer.billingcontactemail,
            FichVFTelCon: customer.billingcontactnumber,
            FichVTipCateg: '1',
            FichVCodCateg: '1',
            FichVMoneda: customer.billingcurrency,
            FichVImporte: customer.totalprice,
            FichVSocCod: customer.partnercode,
            FichVDias: 0,
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
        json: true,
        headers: {
            'content-type': 'application/json'
        }
    };
    console.log(options.body);
    try {
        result = await rp.post(options)
            .then(r => {
                //console.log(r);
                return r;
            }).catch(e => {
                //console.log(e);
            });    
    } catch (e) {
        result = json({ response: { Code: '999' } });
    }
   
    return result;
};

exports.validatepartner = async function (customer) {
    var result = false;
    var options = {
        method: 'POST',
        uri: 'http://secure2.iimp.org:8080/KBServicesAppJavaEnvironment/rest/ValidarSocio',
        body: {
            FichVTipEvCod: 1,
            FichVEvenCod: 11,
            FichVSocCod: "",
            FichVTipDoc: customer.identitynumbertype,
            FichVNumDoc: customer.identitynumber,
            FichVApePat: customer.lastname
        },
        json: true,
        headers: {
            'content-type': 'application/json'
        }
    };
    try {
        result = rp.post(options)
            .then(r => {
                console.log(r);
                return r;
            }).catch(e => {
                console.log(e);
            });
    } catch (e) {
      
        result = json({ response: { Code: '999' } });
    }   
   
    return result;
};

exports.validatePartnerStudent = async function (customer) {
    var result = false;
    var options = {
        method: 'POST',
        uri: 'https://secure2.iimp.org:8443/KBServicesAppJavaEnvironment/rest/ValidarSocioEstudiante',
        body: {
            FichVTipEvCod: 4,
            FichVEvenCod: 25,
            FichVSocCod: "",
            FichVTipDoc: customer.identitynumbertype,
            FichVNumDoc: customer.identitynumber,
            FichVApePat: customer.lastname
        },
        json: true,
        headers: {
            'content-type': 'application/json'
        }
    };
    try {
        result = rp.post(options)
            .then(r => {
                console.log(r);
                return r;
            }).catch(e => {
                console.log(e);
            });
    } catch (e) {

        result = json({ response: { Code: '999' } });
    }

    return result;
};