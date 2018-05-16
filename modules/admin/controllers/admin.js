'use strict';

const
    path = require ('path'),
    fs = require ('fs'),
    async = require ('async'),
    _ = require ('lodash'),
    md5 = require ('md5'),
    helperLib = require(path.resolve('./config/lib/helper_lib')),
    admin = require('../models/admin');




/*exports.adminLogin =((req, res, next) =>{
   // console.log('himanshu admin lofgin') ;
    let conditions = {'email': req.body.email},
        requiredParams = ['email', 'password'],
        resObj = {} ,
        fields = {_v: 0, created_at: 0 , updated_at: 0} ;
        admin.find({username:  req.body.username})
            .exec()
            .then(username => {
                if(username.length <1 ){
                    return res.status(401).json({
                        message:'Opps!! some think Wrng'
                    });
                }
            })



});*/

exports.adminLogin = (req, res) => {

    let conditions = {'email': req.body.email },
        requiredParams = ['email', 'password'],
        resObj      = {},
        fields = {__v: 0, created_at: 0, updated_at: 0, };

    let Common = new helperLib.common.common();

    //@ check if required properties are missing
    let validator = Common.validateArgument(req.body, requiredParams);

    if (validator.length>0) {
        resObj = Common.generateResponses(400, 'failed', `${validator.join(', ')} ${helperLib.messages.absent}`);
        return res.status(resObj.statusCode).json(resObj);
    }

    admin.findOne(conditions, fields, (err, user) => {

        let Crypt       = new helperLib.crypt.crypt();

        //@ compare password with hash
        let isValid     = Crypt.compareHash(req.body.password, user ? user.password : '');

        if (user && isValid) {

            //@ delete password from user object for security
            user.password = undefined;

            let Jwt = new helperLib.jwt(user);
            let buf = new Buffer.from(JSON.stringify(user));

            resObj = Common.generateResponses(200, 'success', helperLib.messages.loggedInSuccess, null, user);

            //@ sign token with user data
            resObj.auth = Jwt.sign(buf);

        } else if (err) {

            resObj = Common.generateResponses(500, 'failed', helperLib.messages.unableTologin, err);

        } else {

            //@ incorrect login credentials
            resObj = Common.generateResponses(400, 'failed', helperLib.messages.incorrectLoginDetail);

        }

        res.status(resObj.statusCode).json(resObj);
    });

}


exports.adminRegistere = ((req, res, next) => {
        let AdminReg = new admin(req.body);
        // console.log(AdminReg)

  /*  AdminReg.save()
        .then(saved=>res.json({message:"data"}))
        .catch(err=>res.json({message:"error",err:err.message}));*/
        AdminReg.save((err, saved)=> {
            let resObj = {};
            let Common = new helperLib.common.common();
            // console.log(Common)

            if(err){
                let message = err.code == '11000' ?
                    `${req.body.email} ${helperLib.message.alreadyTaken}`: 'Registration failed';
                resObj = Common.generateResponses
                (400, 'failed', message,err.message ,null);
            } else {
                saved.password = undefined;
                resObj = Common.generateResponses(200,'success',helperLib.message.accoundCreated, null, saved);
            }
            res.status(resObj.statusCode).json(resObj);
        })
});

exports.forgetpassword = ((req, res, next) => {
    let forget = new admin(req.body);
     console.log(forget);
    forget.findOne({email:req.body.email}),(error, result) => {
        if(error){
            res.status(404).json({err,message:'Sorry'});
        }else {
            if(result){
                console.log(result);
            }

        }
        }
    
});
