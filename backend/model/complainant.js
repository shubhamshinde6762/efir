const mongoose = require("mongoose");
const user = require("./user");

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

  complaintStatus: {
    type: {
      date: {
        type: Date,
      },

      user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Users",
      },

      uniqueUserId: {
        type: "String",
        // default: "12345",
      },

      status: {
        type: String,
        default: "Pending",
      },

      remark: {
        type: String,
      },
    },

    default: {
      // uniqueUserId: "12345",
      status: "Pending",
    },
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

  Summary: {
    type: String,
  },

  Categories: {
    type: [String],
  },
});

module.exports = mongoose.model("complaint", complainantInfo);
