const mongoose = require("mongoose");

const schema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },

  uniqueUserId: {
    type: "String",
    default: "12345",
  }, 

  mobile: {
    type: String,
    required: true,
  },

  email: {
    type: String,
    required: true,
  },

  password: {
    type: String,
    required: true,
  },

  token: {
    type: String,
  },

  filedComplaints: {
    type: [mongoose.Schema.Types.ObjectId],
    ref: "complaint",
  },
});

module.exports = mongoose.model("Users", schema);
