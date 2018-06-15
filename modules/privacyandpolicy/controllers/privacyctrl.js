'use strict';

const
    path = require ('path'),
    Privacy = require('../models/privacymodel');

exports.privacyandpolicy = (req, res) => {
    let obj = req.body;
    let policy = new Privacy (req.body);
     if(obj.privacyandpolicy == ""){
         console.log(obj);
         res.status(400).json({success:false,message:'Sorry filed is empty'})
     }else {
    policy.save((err, saveObj) => {
        if(err) {
            res.json({ obj: err , message:'data is not saved'});
        }else {
            res.json({obj:saveObj, message:'data is saved '});
            // res.render('index',{msg:'sorry'});
        }
    })

}};

exports.PrivacyUpdate = ((req, res) =>{
   let obj = req.body;
   Privacy.findOneUpdate({id:obj._id},{privacyandpolicy:1},(error,result)=>{
       if(error){
           res.status(500).json({error,message:'Internal Serve Error '})
       } else {
           if(!result){
               res.status(400).json({result,message:'result Not Found '})
           }else {
               res.status(200).json({result, message:'Data is updated'})
           }
       }
   })
});