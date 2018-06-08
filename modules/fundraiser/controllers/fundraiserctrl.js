'use strict';

const
    path = require('path'),
    fs =  require ('fs'),
    multer = require ('multer'),
    _=require('lodash'),
    AddFund = require ('../models/fundraiserModel');

   /* set storage file */
let storage =  multer.diskStorage({
    destination:'./uploads',
    filename: (req, file, cb)=> {
        cb(null, file.fieldname+'-'+Date.now() + path.extname(file.originalname));
    }
});

 /* upload file */
    let upload = multer({
        storage:storage,
        limits: {fileSize:1000000},
        fileFilter:(req, file, cb) => {
            checkFileType(file, cb);
        }
    }).single('myImage');

   /* check file system */
function checkFileType (file,cb) {
     let fileType = /jpeg|jpg|png|gif|pdf/;
     let extname = fileType.test(path.extname(file.originalname).toLowerCase());

     /*check images */
    let mimetype = fileType.test(file.mimetype);
    if(mimetype && extname){
    return cb(null, true);
    } else {
       cb('Error: Image only');
    }
}
   /*=================================== method created ================================== */

exports.addFundraisers =  (req, res, next) =>{
    let data = req.body;
    let ADDFUND = new AddFund (req.body);
    if(_.isEmpty(data)){
        res.status(400).json({success:false,message:'Sorry Filed Is Empty'})
    }else if(data.fundraiser_name== null || data.short_description == null || data.goal_amount== null) {
        res.status(400).json({success:false, message:'Sorry Fundraiser Is empty!! please Enter your Fundraiser Name'})
    }
    else {
       ADDFUND.save((error,result)=>{
           if(error){
               res.status(400).json({success: false, error})
           }else{
               res.status(200).json({success:true,Message:'Data Saved'})
           }
       })
    }
}

/*==========Get Fundraiser On the table==========*/

exports.GetFundraisers = ((req, res) => {
    AddFund.find({},{fundraiser_name:1,goal_amount:1,start_date:1,end_date:1,country:1,state:1,city:1,status:1,short_description:1,fundraiser_description:1},(error,result)=>{
        if(error){
            res.status(400).json({error})
        } else {
            if(result){
                res.status(200).json({result})
            }else {
                res.status(200).json({message: 'Data Get Success'})
            }
        }
    })
})

        /*===== Get status change on click event  method=====*/

exports.Chng_Status = ('_id',(req,res,next)=> {
    AddFund.findOneUpdate({_id:req.body._id},{status: false},{new: true},(error, result)=>{
        if(error){
            res.status(400).json({error})
        }else {
            if(result){
                res.status(200).json({result});
            }else {
                res.status(200).json({message:"Data used"});
            }

        }
    })
});

/* Fundraiser Update method  */
exports.Update_Fundraiser = ((req, res)=>{
    let obj=req.body;
    AddFund.findOneAndUpdate(
        {
            _id:obj.id
        },{
            fundraiser_name:obj.fundraiser_name,
            short_description:obj.short_description,
            goal_amount:obj.goal_amount,
            start_date:obj.start_date,
            end_date:obj.end_date},{
            new:true
        },(result, error)=>{
            if(res){
                res.json({success:true, message:"data aa gya", data:result})

            }else{
                if(error){
                    res.json({success: false, error})
                }
                else{
                    res.json({error});
                }
            }
        })
});

/* delete Fundraiser with id */

exports.Delete_Fundraiser = ((req, res)=>{
   let obj = req.body ;
   AddFund.deleteOne({_id:obj.id},(error,result)=>{
       if(error){
           res.status(500).json({success:false,message:'Sorry!!! internal Error Please try again',error})
       } else {
           if(!result){
               res.status(400).json({success:false,message:'Sorry result is not Found',result})
           }else {
               res.status(200).json({success:true,message:'Data is delete',data:result})
           }

       }
   })
});


/* Fine One data  */
exports.Find_fundraiser = ((req,res) =>{
   let obj = req.body;
   console.log(obj);
   AddFund.findOne({_id:obj.id},{
       short_description:1,
       start_date:1,
       end_date:1,
       goal_amount:1,
       fundraiser_description:1
   },(error,result)=>{
       if(error){
           res.status(500).json({success:false,message:'Sorry!! internal server error', error});
       }else {
           if(!result){
               res.status(400).json({success:false,message:'!!!Sorry!!!! Result not found',result});
           }else {
               res.status(200).json({success:true, message:'Data is find one', result})
           }
       }
   })
});