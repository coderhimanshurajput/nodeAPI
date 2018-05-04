'use strict';

const
    path = require ('path'),
    fs = require ('fs'),
    async = require ('async'),
    _ = require ('lodash'),
    helperLib = require(path.resolve('./config/lib/helper_lib')),
    admin = require('../models/admin');




exports.adminLogin =((req, res, next) =>{
   // console.log('himanshu admin lofgin') ;



});


exports.adminRegistere = ((req, res, next) => {
        let AdminReg = new admin(req.body);
        console.log(AdminReg)

    AdminReg.save()
        .then(saved=>res.json({message:"data"}))
        .catch(err=>res.json({message:"error",err:err.message}));
       /* AdminReg.save((err, saved)=> {
            let resObj = {};
            let Common = new helperLib.common.common();
            console.log(Common)

            if(err){
                let message = err.code == '11000' ?
                    `${req.body.email} ${helperLib.message.alreadyTaken}`: 'Registration failed';
                resObj = Common.generateResponses
                (400, 'failed', message,err.code == '11000'? null:err);
            } else {
                saved.password = undefined;
                resObj = Common.generateResponses(200,'success',helperLib.message.accountCreated,null,saved);
            }
            res.status(resObj.statusCode).json(resObj);
        })*/
});