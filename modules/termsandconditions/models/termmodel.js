'use strict ' ;

const
    path = require ('path'),
    mongoose = require('mongoose'),
    Schema = mongoose.Schema ;

let termAnd = Schema ({
    termandcondition:{
        type : String,
        trim : true
    }
},{timestamp:{
    createdAt:'created_at',
        updatedAt:'updated_at'
    }});


module.exports = mongoose.model('termandcondition',termAnd);
