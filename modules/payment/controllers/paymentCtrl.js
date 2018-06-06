'use strict';

const
    path = require ('path'),
    crypto = require ('crypto'),
    biguint = require('biguint-format'),
    PAYMENT = require('../models/paymentModel');

exports.Payment = ((req, res, next)=> {
     let obj=req.body;

    /*function random (qty) {
        return crypto.randomBytes(qty);
    }
    console.log(biguint.format(random(8), 'hex', { prefix: '0x' }));*/


    /* ====================================================================================== */

    /*       crypto randam number function*/

    function  randomValueHex (len)
    {
        var code;
        return code="CUM01"+ crypto.randomBytes(Math.ceil(len/2)).toString('hex').slice(0,len);
        // console.log(code);
    }
    obj.Oder_Id = randomValueHex(16);
      
    
    let Pay = new PAYMENT (obj);

    Pay.save((err, saveObj) => {
       if(err){
           res.json({obj:err , message:' data not saved'})
       } else {
           res.json({obj:saveObj, message : 'data saved'})
       }

   })


});
