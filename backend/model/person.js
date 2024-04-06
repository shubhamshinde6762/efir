const mongoose = require("mongoose")

const PersonSchema = mongoose.Schema({
    Name:{
        type:String,
        required:true
    },

    Age:{
        type:Number,
    },

    Address:{
        type:String,
    },

    Occupation:{
        type:Mixed,
    },

    ContactDetails:{
        type:Number,
    },

    Adhaar:{
        type:Number,
    }
})

module.exports = mongoose.model("Person",PersonSchema)