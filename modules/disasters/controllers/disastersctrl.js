'use strict'

const
    path = require('path'),
    fs = require ('fs'),
    addDISAS = require('../models/disasterModel');

exports.addDisasters = (req, res) => {
    let data = req.body;

    if(data.disaster_name== ""){
        console.log(data.disaster_name);
        res.status(400).json({message:'Sorry '})
    } else {
        let DATA = new addDISAS(data);
        DATA.save((err, saveObj) => {
            if(err){
                res.json({ success:false ,obj: err, message:'Sorry Data is note saved'});
            } else {
                res.json({success:true, obj:saveObj, message:'Data saved'});
            }
        });

    }
}

exports.getDisasters = ((req,res) => {
    addDISAS.find({},{disaster_name:1,status:1,country:1,state:1,createdAt:1},(error,result)=>{
        if(error){
            res.status(400).json({error});
        }else {
            if(result){
                res.status(200).json({result})
            }else {
                res.status(200).json({Message:'Data Get'})
            }
        }
    });

})