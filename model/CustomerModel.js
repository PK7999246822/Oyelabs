const mongoose = require('mongoose');

const CustomerSchema = new mongoose.Schema({
   
    name:{
        type: String,
        required: "name is required",
        trim: true
    },
    phone:{
        type:Number,
        required: "phone is required",
        unique:true,
        
    },
    email:{
        type: String,
        required: "email is required",
        unique: true,
        
    },
    password: {
        type: String,
        required: "password is required",
        
    },

    subject:{
        type:[String]
    }

},{ timestamps: true })

module.exports = mongoose.model('Customer', CustomerSchema)