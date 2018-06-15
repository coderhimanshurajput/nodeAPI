'use strict';

// import {JWT_KEY} from "../../../config/env/development";

const
    path = require ('path'),
    fs = require ('fs'),
    // ran = require ('random-number'),
    // async = require ('async'),
    // _ = require ('lodash'),
    md5 = require ('md5'),
    helperLib = require(path.resolve('./config/lib/helper_lib')),
    jwt = require('../../../config/lib/jwt/jwToken'),
    JWT=require("jsonwebtoken"),
    ENV = require(path.resolve(`./config/env/${process.env.NODE_ENV}`)),
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

/*exports.adminLogin = (req, res) => {

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

}*/


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

    let randam= ran.generator({min: 1000, max: 5000 , integer: true});


     let otp = randam();

     let us=otp
    admin.findOneAndUpdate({

        email:req.body.email


    },{
        $set:{
            otp:us
        }
    },{new:true},(err,result)=>{

        if(err){
            res.json({message:err});
        }
        else{
            if(result){
                res.json(result);
            }
            else{
                res.json(err);
            }
        }
    })
});


exports.ADMINlogin=((req,res) => {
    let obj=req.body;

    if({email:obj.email} == null ){
        res.status(400).json({success:false, message:'Sorry please enter your email and password'})
    }else {
        admin.findOne({email:obj.email},(error, user)=>{

            if(error){
                res.json({error})
            }
            else{
                if(user){
                    // console.log("email thik hai");
                    let Crypt = new helperLib.crypt.crypt();
                    let password = Crypt.hash(obj.password);
                    console.log(password);
                    if(user.password===password){

                        user={

                            email:user.email,
                            first_name:user.first_name,
                            last_name:user.last_name,
                            _id:user._id
                        }

                        let supersecret="jksdhfkshdfkjshdfkjhsdjkfhsjkdfhsjkdfhjksdahfkjshd";
                        let Token=JWT.sign(user,supersecret,{expiresIn:"1h"})

                        user.token=Token;
                        res.json({success:true, message:"you have been successfully logged in ", user:user})
                    }
                    else{
                        res.json({success:false, message:"check password"})
                    }

                }
                else{
                    res.json({success:false, message:"error occurred while login"});
                }
            }
        })

    }



});
