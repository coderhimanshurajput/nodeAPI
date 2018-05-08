'use strict'


const
    path = require('path'),
    mongoose = require('mongoose'),
    Schema = mongoose.Schema,
    helperLib = require(path.resolve('./config/lib/helper_lib'));

let validateEmail = (email) => {
    let re = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;
    return re.test(email)
};

let toLower = (v) => {
    return v.toLowerCase();
}


let users = new Schema ({
    first_name:{
        type:String,
        trim:true
    },
    last_name:{
        type:String,
        trim:true
    },

    email:{
      type: String,
        unique:true,
        set:toLower,
        trim:true,
        validate: [validateEmail, 'Please fill a valid email address'],
        require: [true , 'Email Is Require']
    },
    reg_type:{
        type:String,
        default:'mobile_app',
        trim: true
    },
    mobile:{
        type:Number,
        trim:true
    },
    donation:{
        type:Number,
        trim: true
    },
    verified:{
        type: Boolean,
        default:false,
        trim:true
    },
    password:{
        type: String,
        trim: [true , 'password is required']
    }
},{timestamps:{
    createdAt:'createdAt' ,
        updatedAt: 'updatedAt'
    }});

users.pre('save', function(next){

    let Crypt = new helperLib.crypt.crypt();


    //@capital first letter of firstname and last name
    if (this.first_name) this.first_name = this.first_name.charAt(0).toUpperCase()+this.first_name.slice(1)

    if (this.last_name) this.last_name = this.last_name.charAt(0).toUpperCase()+this.last_name.slice(1)

    //@hash password using MD5
    this.password = Crypt.hash(this.password);

    next();


});

users.virtual('full_name').get(()=> {
    return `${this.first_name} ${this.last_name}`
});

module.exports = mongoose.model('user',users)