'use strict'

const
    path =  require('path'),
    async = require('async'),
    _ =     require('lodash'),
    users = require('../models/user') ,
    helperLib = require(path.resolve('./config/lib/helper_lib'));



exports.userRegistere = ((req, res, next) => {
    let usersReg = new users(req.body);

    console.log(usersReg);

    usersReg.save((err,saved)=> {
        let resObj = {};
        let Common = new  helperLib.common.common();
        if(err){
            let message = err.code == '11000' ?
                `${req.body.email} ${helperLib.message.alreadyTaken}`:'Registration failed';
            resObj = Common.generateResponses(400,'failed',message,err.message,null);
        } else {
            saved.password = undefined ;
            resObj = Common.generateResponses(200,'success',helperLib.message.accoundCreated , null , saved);
        }
        res.status(resObj.statusCode).json(resObj);
    })

})