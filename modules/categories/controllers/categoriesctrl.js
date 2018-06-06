'use strict';
const
    path = require('path'),
    fs   = require('fs'),
    multer = require ('multer'),
    ADDcat = require('../models/categories');

/*======================================================================================================*/
       /* File Upload with multer  */

    const storage = multer.diskStorage({
        destination : function (req, file,cb) {
            cb(null,'./uploads');
        },filename: function (req, file, cb) {
            cb(null, new Date().toISOString() + file.originalname);
        }
    });

    const fileFilter = (req, file, cb) => {
        if(file.mimetype === 'image/jpeg'|| file.mimetype === 'image/png'){
            cb(null, true)
        } else {
            cb(null, false);
        }
    };

    const upload = multer({
        storage:storage,
        limits:{fileSize:1024 * 1024 * 5},
        fileFilter: fileFilter
    });

/*=======================================================================================================================*/
    /* Add categories method create */

    exports.addCategories =((req, res)=>{
            let obj=req.body;
            // obj.categories_img = upload (res, err, file);
         // obj.categories_img = req.file ;


            if(obj.categories_name == "") {
                res.status(404).json({success:false,message:"!! Sorry Your Cartegories is Empty, Please Enter Your Categories"})
            } 
            else{
                ADDcat.findOne({categories_name:obj.categories_name},(error,result)=>{
                    
                    if(error){
        
                        res.json({success:false, message:"error"});
                    }
                    else{
                        if(result){
                        res.json({success:false, message:"This Categories all ready used !! So Please Diffrent categories Enter"});
                    }
                    else{
                        let Addcat=new ADDcat(obj);
                        Addcat.save().
                        then(saved=>res.status(200).json({success:true, message:"Your Categories has been successfully saved"}))
                        .catch(error=>res.status(404).json({success:false, message:"error while saving data"}))
                    }
                 }
                })
            }
    })

          /* ====== get category method create  ====== */

  exports.getCategory = ((req, res) => {
      ADDcat.find({},{categories_name:1,categories_img:1,categories_description:1,categories_status:1 },(error,result) => {
          if(error){
              res.status(402).json({error})
          }else {
              if(result){
                  res.status(200).json({result})
              }else {
                  res.status(200).json({message:'Success'});
              }
          }
      })
  })


exports.updateStatus = ((req,res) => {
    ADDcat.findOneAndUpdate({},)
})