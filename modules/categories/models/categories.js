'use strict';

const
    path = require ('path'),
    mongoose = require ('mongoose'),
    Schema = mongoose.Schema,
    helperLib = path.resolve('./config/lib/helper_lib');


let categories = new Schema ({
   categories_name:{
       type: String,
       trim : true
   },
    categories_img:{
       type: String,
        trim: true
    },
    categories_description:{
       type:String,
        trim: true
    }
},{timestamps:{
    createdAt:'created_at',
        updatedAt:'updated_at'
    }});

module.exports = mongoose.model('categorie',categories)
