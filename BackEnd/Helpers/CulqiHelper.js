'use strict';
var request = require('request');
var rp = require('request-promise');
var constants = require('../app');

exports.RegisterCharge = async function (token) {
    //return new Promise(async (resolve, reject) => {
    var result = null;
    console.log('Register charge culqi');
    var options = {
        uri: 'https://api.culqi.com/v2/charges',
        method: 'POST',
        headers: {
            'content-type': 'application/json'
        },
        auth: {
            'bearer': constants.CulqiKey
        },
        json: true,
        body: token
    };

    try {
        var result = await rp.post(options);
        // .then(r => {
        //     console.log(r);
        //     return r;
        // }).catch(e => {
        //     console.log(e);
        // });

    } catch (e) {
        console.log('error culqi');
        return result;
    }
    console.log('Finish register charge culqi');
    return result;

};