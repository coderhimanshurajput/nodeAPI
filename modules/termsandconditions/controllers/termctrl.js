'use strict' ;

const
    path = require ('path'),
    term = require ('../models/termmodel');

exports.TermAndCondition = (req, res) => {

    let Termand = new term (req.body);

    Termand.save ((err, saveObj)=>{
        if (err){
            res.json({obj: err , message: 'Data Not Saved'})
        } else {
            res.json({obj:saveObj , message:'Data Is saved'});
        }
    })
}