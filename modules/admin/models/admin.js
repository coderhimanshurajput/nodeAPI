'use strict';

const
    path = require ('path'),
    mongoose = require ('mongoose'),
    helperLib = require(path.resolve('./config/lib/helper_lib')),
    Schema = mongoose.Schema;

let validateEmail = (email) => {
    let re = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;
    return re.test(email)
};

let toLower = (v) => {
    return v.toLowerCase();
}

let admin = new Schema ({
    first_name:{
        type: String,
        trim: true
    },
    last_name:{
        type: String,
        trim: true
    },
    user_name:{
        type: String,
        trim: true
    },
    number:{
      type: String,
      trim : true
    },
    email:{
        type: String,
        unique: true,
        set: toLower,
        trim: true,
        validate: [validateEmail,'Please Enter your Valide Email'],
        require : [true , 'email is require']
    },
    password:{
        type: String,
        require: [true, 'Password is require']
    },
    otp:String

},
    {
        timestamps:{
            createdAt: 'created_at',
            updatedAt: 'updated_at',
    }});

/* Mongoose pre hook middleware*/
admin.pre('save', function(next){

    let Crypt = new helperLib.crypt.crypt();


    //@capital first letter of firstname and last name
    if (this.first_name) this.first_name = this.first_name.charAt(0).toUpperCase()+this.first_name.slice(1)

    if (this.last_name) this.last_name = this.last_name.charAt(0).toUpperCase()+this.last_name.slice(1)

    //@hash password using MD5
    this.password = Crypt.hash(this.password);

    next();


});

 /*@ get full name used */
admin.virtual('fullname').get(()=>{
    return `${this.first_name} ${this.last_name}`
})
module.exports = mongoose.model('admin',admin);

