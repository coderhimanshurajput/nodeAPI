'use strict';

const
    path  = require ('path'),
    mongoose = require ('mongoose'),
    Schema  = mongoose.Schema;

let Payment = new Schema ({
    ngo_name:{
        type: String,
        default:'NGO Help',
        trim: true
    },
    Txn_Id:{
        type: String,
        trim: true,
    },
    amount:{
        type: Number,
        trim : true,
        require: true
    },
    status:{
        type:Boolean,
        default:false,
        trim: true
    }

},{ timestamps:{
        createdAt :'created_at',
        updatedAt : 'updated_at'
    }});

module.exports = mongoose.model('payment',Payment)