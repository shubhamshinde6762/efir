const mongoose = require("mongoose");

const complainantInfo = mongoose.Schema({
  VictimIds: {
    type: [mongoose.Schema.Types.ObjectId],
    required: true,
    ref: "person",
  },

  firId: {
    type: Number,
    required: true,
  },

  AccusedIds: {
    type: [mongoose.Schema.Types.ObjectId],
    ref: "person",
  },

  WitnessIds: {
    type: [mongoose.Schema.Types.ObjectId],
    ref: "person",
  },

  filedBy: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "users",
  },

  IncidentDetail: {
    type: {
      TimeDateofIncident: {
        type: Date,
      },

      LandMark: {
        type: String,
      },

      District: {
        type: String,
      },

      SubDistrict: {
        type: String,
      },
    },
  },

  Evidence: {
    type: [String],
  },
  LastEdited: {
    type: Date,
    default: Date.now,
  },
});

module.exports = mongoose.model("Complainant", complainantInfo);
