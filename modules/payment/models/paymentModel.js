'use strict';

const
 
    path  = require ('path'),
    // crypto = require ('crypto'),
    mongoose = require ('mongoose'),
    Schema  = mongoose.Schema;



     let Payment = new Schema ({
    ngo_name:{
        type: String,
        default:'NGO Help',
        trim: true
    },
    categories_name:{
        type:String,
        trim : true
    },
    Oder_Id:{
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

// Payment.pre('save', (next)=> {

//    function  randomValueHex (len)
//     {
//         return crypto.randomBytes(Math.ceil(len/2)).toString('hex').slice(0,len);
//     }
//     let value = randomValueHex(16);
//     console.log(value)
//     this.Txn_Id = value.this.Txn_Id;
//     next();
// })
