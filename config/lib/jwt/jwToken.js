'use strict'

var jwt = require('jsonwebtoken');


exports.run=(req, key, callback)=>{

    let token=req.headers.authorization.replace('Bearer ',"");
    jwt.verify(token, key, function (err, decodedToken) {

        callback(decodedToken);
    })
}