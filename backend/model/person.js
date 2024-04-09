const mongoose = require("mongoose");

const PersonSchema = mongoose.Schema({
  name: {
    type: String,
    required: true,
  },

  age: {
    type: Number,
  },

  address: {
    type: String,
  },

  occupation: {
    type: String,
  },

  contact: {
    type: Number,
  },

  aadhar: {
    type: String,
  },
});

module.exports = mongoose.model("Person", PersonSchema);
