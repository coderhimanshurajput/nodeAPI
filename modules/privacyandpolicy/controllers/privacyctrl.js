'use strict';

const
    path = require ('path'),
    Privacy = require('../models/privacymodel');

exports.privacyandpolicy = (req, res) => {
    let policy = new Privacy (req.body);

    policy.save((err, saveObj) => {
        if(err) {
            res.json({ obj: err , message:'data is not saved'});
        }else {
            res.json({obj:saveObj, message:'data is saved '});
        }
    })

}