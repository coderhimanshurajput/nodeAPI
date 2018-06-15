'use strict'

const
    path = require('path'),
    fs = require ('fs'),
    addDISAS = require('../models/disasterModel');


/* ======================= ---- Add Disasters method ---- ================================*/

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

/* ======================= ---- Get  Disasters method ---- ================================*/

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


/* ======================= ---- Full Details Disasters method ---- ==========================*/
   exports.findDisasters = ((req, res)=>{
       let obj = req.body;
       addDISAS.findOne({_id:obj.id},{
           disaster_name:1,
           short_description:1,
           disaster_description:1,
           country:1,
           state:1,
           city:1,
           zip:1,
           cover_image:1
       },(error,result)=> {
          if(error){
              res.status(500).json({success:false, message:'Internal server error', error})
          } else {
              if(!result){
                  res.status(400).json({success: false, message:'Sorry Result Not Found'})
              }else {
                  res.status(200).json({success: true,message:' Find Details ', result})
              }
          }
       });
   })

/* ======================= ---- Update Disasters method ---- ===============================*/

exports.updateDisasters = ((req, res)=>{
    let obj = req.body;
    addDISAS.findOneAndUpdate({id:obj._id},{
        disaster_name:obj.disaster_name,
        short_description:obj.short_description,
        disaster_description:obj.disaster_description,
        country:obj.country,
        state:obj.state,
        city:obj.city,
        zip:obj.zip,
        cover_image:obj.cover_image

    },(error,result)=>{
        if(error){
            res.status(500).json({success:false, error, message:'Internal Server Error'})
        }else {
            if(!result){
                res.status(400).json({success: false, error,message:'Result not Found'})
            }else {
                res.status(200).json({success: true, message:'result is found', result})
            }
        }
    })
})

/* ======================= ---- Delete Disasters method ---- ===============================*/
exports.DeleteDisaster = ((req, res) =>{
    let obj = req.body;
    addDISAS.deleteOne({_id:obj.id},(error, result)=>{
        if(error){
            res.status(500).json({success:false,message:'Internal Server Error', error})
        }else{
            if(!result){
                res.status(400).json({success:false, message:' Result Not Found', result})
            }else {
                res.status(200).json({success: true, message:'Delete your data ', result})
            }
        }
    })
})

/* ======================= ---- UpdateStatus true or false method ---- =======================*/