'use strict';

const
    path = require('path'),
    fs =  require ('fs'),
    AddFund = require ('../models/fundraiserModel');

exports.addFundraisers =  (req, res, next) =>{
    let ADDFUND = new AddFund (req.body);

    ADDFUND.save ((err, saveObj) => {
       if(err){
           res.json({obj:err , message : 'Data is not saved'})
       } else  {
           res.json({obj: saveObj, message : 'Data is saved'})
       }
    });

}