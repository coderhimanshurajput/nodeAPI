'use strict';

const nodemailer         =require('nodemailer'),
    path               =require('path'),
    config             =require(path.resolve(`./config/env/${process.env.NODE_ENV}`));


exports.Nmailer=(sendmail, message,otp)=>{

    var transporter = nodemailer.createTransport({
        service: 'gmail',
        auth: {
            user: 'himanshurajput56@gmail.com',
            pass:  'RAMji@8798'
        }
    });

    var mailOptions = {
        from: 'himanshurajput56@gmail.com',
        to: 'himanshurajput56@gmail.com',
        subject: message,
        text: "otp is "+ otp
    };

    transporter.sendMail(mailOptions, function(error, info){
        if (error) {
            console.log(error);
        } else {
            console.log('Email sent: ' + info.response);
        }
    });
}