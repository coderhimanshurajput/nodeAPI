'use strict'

const
    path =  require('path'),
    async = require('async'),
    _ =     require('lodash'),
    users = require('../models/user') ,
    helperLib = require(path.resolve('./config/lib/helper_lib'));


// user Register method

exports.userRegistere = ((req, res, next) => {

    let obj=req.body;
    let usersReg = new users(req.body);

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

});

        // User Login method
exports.userLogin = ((req, res, next) => {
   let userLOGIN = ({$or:[{'email':req.body.email},{'mobile':req.body.mobile}]}),
       requiredParams = ['email','password'],
       resObj = {},
       fields = {__v: 0, created_at: 0, updated_at: 0};

   /* include Common(class) file */
   let Common = new helperLib.common.common();

      /* create login valid or not */
   let Login_validation  = Common.validateArgument(req.body,requiredParams);

   /* condition check n if or not */
   if(Login_validation.length>0){
       resObj = Common.generateResponses(400,'failed',`${Login_validation.join(',')}
       ${helperLib.message.absent}`);
       return res.status(resObj.statusCode).json(resObj);
   }
      /* user find */
    users.findOne(conditions, fields, (err, users) => {
        /* used for Password Crypto */
       let Crypt = new helperLib.crypt.crypt();
       let isValid = Crypt.compareHash(req.body.password, users ? users.password:'');

       /*condition check user login is valid or not */
       if(users && isValid){
            users.password = undefined;
            let Jwt = new helperLib.jwt();
            let buf = new  Buffer.from(JSON.stringify(user));

            resObj = Common.generateResponses(200,'success',helperLib.message.loggedInSuccess, null,user)
          /* Sign token with user data*/
           resObj.auth = Jwt.sign(buf);
       }else if (err) {
           resObj = Common.generateResponses(500,'Failed',helperLib.message.unableTologin, err);
       }else {
           resObj = Common.generateResponses(400, 'Failed', helperLib.message.incorrectLoginDetail);
       }
       res.status(resObj.statusCode).json(resObj);
    });


});

exports.getusers = ((req, res)=> {
        users.find({},{first_name:1,last_name:1,email:1,reg_type:1,mobile:1,verified:1},(error,result)=>{
            if(error){
                res.json({error});
            }
            else{
                if(result){
                    res.json({result});

                }
                else{
                    res.json({message:"Success"});
                }
            }
        })
});

exports.DeleteUser = ((req, res) => {


    users.update({_id:req.body.id},{
        $set:{
            trash:true
        }
    },(error, result)=>{


        if(error){
            res.json({success:false, message:error});
        }
        else{
            if(result){
                res.json({success:true, message:"user successfully deleted"})
            }
            else{
                res.json({success:false, message:"some error occurred"});
            }
        }
    })

})

exports.UserDetails = ((req, res, next) =>{
    users.findOne({_id:req.body.id},
        {
            foreign_key:1,
            first_name:1,
            last_name:1,
            email:1,
            mobile:1,
            createdAt:1,
            reg_type:1,
            amount:1,
            country:1,
            city:1,
            state:1,
            verified:1

        },(error,result)=>{
        if(error){
            res.status(400).json({success:false,error})
        }else {
            if(result){
                res.status(200).json({success:true,result})
            }else {
                res.status(200).json({success:true, message:'Get data',result});
            }
        }
    })
})