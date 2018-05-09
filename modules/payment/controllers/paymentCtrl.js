'use strict';

const
    path = require ('path'),
    PAYMENT = require('../models/paymentModel');

exports.Payment = ((req, res, next)=> {
    console.log('himanshu jjjjj')
   let Pay = new PAYMENT (req.body);
console.log(Pay);

   Pay.save((err, saveObj) => {
       if(err){
           res.json({obj:err , message:' data not saved'})
       } else {
           res.json({obj:saveObj, message : 'data saved'})
       }

   })


});
