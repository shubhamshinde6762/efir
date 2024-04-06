const mongoose = require("mongoose");


const TownTree = new mongoose.Schema({
    TownTree : {
        type : "Mixed"
    }
})

module.exports = mongoose.model("TownTree", TownTree);