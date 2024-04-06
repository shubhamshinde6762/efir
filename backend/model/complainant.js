const mongoose = require("mongoose");
const Accuse = require("./Accused");
const Witness = require("./Witness");

const complainantInfo = mongoose.Schema({
  VictimIds: {
    type: [String],
    required: true,
  },

  AccusedIds: {
    type: [String],
    ref: Accuse,
  },

  WitnessIds: {
    type: [String],
    ref: Witness,
  },

  IncidentDetail: {
    type: {
      TimeDateofIncident: {
        type: Date,
        required: true,

        validate: function (input) {
          return (
            typeof new Date(input) === "date" && new Date(input) <= new Date()
          );
        },
        message: (input) => `${input} must be valid date of incident`,
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
    required: true,
  },

  NearByPoliceStation: {
    //pass
  },

  Evidence: {
    type: Mixed,
  },
  //add editied
  LastEdited: {
    type: Date,
    default: Date.now,
    //add validation
  },
  //can edit only in 24 hrs
});

module.exports = mongoose.model("Complainant", complainantInfo);
