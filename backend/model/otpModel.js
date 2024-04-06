const mongoose = require("mongoose");


const otpModel = new mongoose.Schema({
    OTP:{
        type:String,
        required:true
    },

    socketId:{
        type:String, 
        required:true
    },

    email:{
        type:String,
        required:true
    }
})

module.exports = mongoose.model("otpModel", otpModel);