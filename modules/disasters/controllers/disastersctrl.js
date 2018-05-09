'use strict'

const
    path = require('path'),
    fs = require ('fs'),
    addDISAS = require('../models/disasterModel');

exports.addDisasters = (req, res, next) => {
    let ADDdisaster = new addDISAS(req.body);

    ADDdisaster.save((err, saveObj) => {
       if(err){
           res.json({obj: err, message:'Sorry Data is note saved'});
       } else {
           res.json({obj:saveObj, message:'Data saved'});
       }
    });
}