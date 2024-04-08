const mongoose = require("mongoose");

const complainantInfo = mongoose.Schema({
  VictimIds: {
    type: [mongoose.Schema.Types.ObjectId],
    ref: "Person",
  },

  firId: {
    type: Number,
    required: true,
  },

  AccusedIds: {
    type: [mongoose.Schema.Types.ObjectId],
    ref: "Person",
  },

  WitnessIds: {
    type: [mongoose.Schema.Types.ObjectId],
    ref: "Person",
  },

  filedBy: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Users",
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

      IncidentDescription: {
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

module.exports = mongoose.model("complaint", complainantInfo);
