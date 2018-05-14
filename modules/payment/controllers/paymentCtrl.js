'use strict';

const
    path = require ('path'),
    crypto = require ('crypto'),
    
    TAXID = require(path.resolve('./config/lib/const/constV')),
    PAYMENT = require('../models/paymentModel');

exports.Payment = ((req, res, next)=> {
    let obj=req.body;
    
    // obj.Txn_Id=Math.floor(100000+Math.random()*9999999);
    
    //   crypto randamnumber function  
    function  randomValueHex (len)
    {
        return crypto.randomBytes(Math.ceil(len/2)).toString('hex').slice(0,len);
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
