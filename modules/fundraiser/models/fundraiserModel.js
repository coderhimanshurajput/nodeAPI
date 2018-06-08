'use strict' ;

const
    path = require ('path'),
    mongoose = require('mongoose'),
    Schema = mongoose.Schema;

let fundraisers = new Schema ({
    fundraiser_name:{
        type: String,
        require: true,
        trim: true

    },
    short_description : {
        type: String,
        require: true,
        trim:  true
    },
    goal_amount : {
        type : Number,
        trim : true
    },
    start_date : {
        type: Date,
        trim: true
    },
    end_date: {
        type: Date,
        trim: true
    },
    fundraiser_description:{
        type: String,
        trim: true
    },
    country:{
        type: String,
        trim: true
    },
    state:{
        type: String,
        trim: true
    },
    city:{
        type: String,
        trim: true
    },
    zip:{
        type: String,
        trim: true
    },
    address:{
        type: String,
        trim: true
    },
    cover_image:{
        type: String,
        trim: true
    },
    photo_1:{
        type: String,
        trim: true
    },
    photo_2:{
        type: String,
        trim: true
    },
    photo_3:{
        type: String,
        trim: true
    },
    photo_4:{
        type: String,
        trim: true
    },
    document_1:{
        type: String,
        trim: true
    },
    document_2:{
        type: String,
        trim: true
    },
    document_3:{
        type : String,
        trim: true
    },
    status:{
        type:Boolean,
        trim:true,
        default: true
    }

},{
    timestamps:{
        createdAt: 'created_at',
        updatedAt: 'updated_at'
}});

module.exports = mongoose.model ('fundraiser',fundraisers);

