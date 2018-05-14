'use strict';

const
    path = require('path'),
    fs =  require ('fs'),
    multer = require ('multer'),
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
    let ADDFUND = new AddFund (req.body);


    ADDFUND.save ((err, saveObj) => {
       if(req.body.fundraiser_name ==''){
           res.json({message:'sorry filed is not ok'});
       }
        else if(err){
           res.json({obj:err , message : 'Data is not saved'})
       } else if(upload ,(req, res, (err)=>{
           if(err){
               res.json({message: err})
           }else if(req.file == undefined){
               res.json({obj:err,message:'Sorry File Note selected'})
           }else {
               res.json({obj: saveObj, message : 'Data is saved'})
           }
       }));
    });

}

/*exports.addFundraisers = (req, res, next)=>{
    (upload.any(),(req, res,next)=>{
        console.log(req.files);
        res.send(req.files);
    })
}*/

 /*===========================================================================================*/

