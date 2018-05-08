'use strict';
const
    path = require('path'),
    fs   = require('fs'),
    ADDcat = require('../models/categories');
    // ADDcat = require(path.resolve('./models/categories'));


exports.addCategories =(req, res)=>{
    // console.log('himanshu addCategories');
let addCAT = new ADDcat(req.body);
console.log(addCAT);

addCAT.save((err,saveObj)=>{

    if(err){
        res.json({obj: err , message:'Data Is not Saved'});
    }else {
        res.json({obj:saveObj, message: 'Data is saved '});
    }
})
}