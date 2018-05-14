'use strict';
const
    path = require('path'),
    fs   = require('fs'),
    upload = require (path.resolve('./config/lib/multer/multer')),
    ADDcat = require('../models/categories');
   
   
    exports.addCategories =(req, res)=>{
            let obj=req.body;
            // obj.categories_img = upload (res, err, file); 

            if(obj.categories_name == "") {
                res.status(404).json({message:"!! Sorry Your Cartegories is Empty, Please Enter Your Categories"})
            } 
            else{
                ADDcat.findOne({categories_name:obj.categories_name},(error,result)=>{
                    
                    if(error){
        
                        res.json({message:"error"});
                    }
                    else{
                        if(result){
                        res.json({message:"This Categories all ready used !! So Please Diffrent categories Enter"});
                    }
                    else{
                        let Addcat=new ADDcat(obj);
                        Addcat.save().
                        then(saved=>res.status(200).json({message:"Your Categories has been successfully saved"}))
                        .catch(error=>res.status(404).json({message:"error while saving data"}))
                    }
                 }
                })
            }
    }

  