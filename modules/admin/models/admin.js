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
    }
},
    {
        timestamp:{
            createdAt: 'created_at',
            updatedAt: 'updated_at',
    }});

/* Mongoose pre hook middleware*/
admin.pre('save', (next)=> {
    let Crypt = new helperLib.crypt.crypt();
    if(this.first_name) this.first_name =  this.first_name.charAt(0).toUpperCase()+
        this.first_name.slice(1)
    if(this.last_name) this.last_name = this.last_name.charAt(0).toUpperCase()+
        this.last_name.slice(1)

    /*password use md5 */
    this.password = Crypt.hash(this.password);
   next();
});

 /*@ get full name used */
admin.virtual('fullname').get(()=>{
    return `${this.first_name} ${this.last_name}`
})
module.exports = mongoose.model('admin',admin);

