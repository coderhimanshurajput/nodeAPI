'use strict';

const
    path = require ('path'),
    mongoose = require('mongoose'),
    Schema = mongoose.Schema ;

let privacy = new Schema({
    privacyandpolicy:{
        type: String,

        trim: true
    }
}, {timestamp:{
    createdAt: 'created_at',
        updatedAt: 'updated_at'
    }});

module.exports = mongoose.model('privacyandpolicy', privacy);


