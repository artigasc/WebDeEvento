var nodemailer = require('nodemailer');
var constants = require('../app');
module.exports.SendEmail = (recipients, copyTo, files, subject, body) => {
    try {
        var emailTransporter = nodemailer.createTransport({
            service: constants.mailingServiceType,
            auth: constants.mailingSender,
            tls: {
                rejectUnauthorized: false
            }
        });
        var ccArray = copyTo.length > 0 ? ccArray : [];


            var mailOptions = {
                from: constants.mailingSender.user,
                to: recipients,
                cc: ccArray,
                subject: subject,
                html: body,
                attachments: files
        };
        
        emailTransporter.sendMail(mailOptions, (error, info) => {
            if (error) {
                console.log(error);
                return;
            }
        });
    } catch (e) {
        console.log("error " + e.message);
    }
};