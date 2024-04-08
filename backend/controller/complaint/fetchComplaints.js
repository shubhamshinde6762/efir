const User = require("../../model/user");
const Complaint = require("../../model/complainant");
const mongoose = require("mongoose");

exports.fetchComplaint = async (req, res) => {
  try {
    const firId = req.param.firId;

    if (firId) {
      const fir = await Complaint.findOne({ firId }).populate({
        path: "VictimIds AccusedIds WitnessIds filedBy",
      });

      if (!fir) {
        return res.status(404).json({ message: "FIR not found" });
      }

      return res.status(200).json({ fir: [fir] });
    }

    const userId = req.body.userId;

    if (!userId) {
      return res.status(400).json({ message: "userId is required" });
    }

    const userReq = await User.findById(userId).populate({
      path: "filedComplaints",
      populate: {
        path: "VictimIds AccusedIds WitnessIds filedBy",
      },
    }); 

    if (!userReq) {
      return res.status(404).json({ message: "User not found" });
    }

    return res.status(200).json({ fir: userReq.filedComplaints });
  } catch (err) {
    console.error("Error fetching complaint:", err);
    return res.status(500).json({ message: "Internal server error" });
  }
};

exports.fetchComplaintSuper = async (req, res) => {
  try {
    console.log(123);
    const page = parseInt(req.query.page) || 1;
    const limit = parseInt(req.query.limit) || 10;
    const skip = (page - 1) * limit;

    const filter = {};

    const userId = req.params.userId;

    if (!userId) {
      return res.status(401).json({
        message: "Unauthorized",
      });
    }

    const currentUser = await User.findById(userId);
    // if (!currentUser || currentUser.role != "super") {
    //   return res.status(401).json({
    //     message: "Unauthorized",
    //   });
    // }

    if (req.query.fromDateIncident && req.query.toDateIncident) {
      filter["IncidentDetail.TimeDateofIncident"] = {
        $gte: new Date(req.query.fromDateIncident),
        $lte: new Date(req.query.toDateIncident),
      };
    }

    if (req.query.fromDateLastEdited && req.query.toDateLastEdited) {
      filter["LastEdited"] = {
        $gte: new Date(req.query.fromDateLastEdited),
        $lte: new Date(req.query.toDateLastEdited) || new Date.now(),
      };
    }

    if (req.query.district) {
      filter["IncidentDetail.District"] = req.query.district;
    }

    // console.log(req.query.subDistrict);

    if (req.query.subDistrict) {
      filter["IncidentDetail.SubDistrict"] = req.query.subDistrict;
    }

    if (req.query.aadhar) {
      filter["$or"] = [
        { "VictimIds.aadhar": req.query.aadhar },
        { "AccusedIds.aadhar": req.query.aadhar },
        { "WitnessIds.aadhar": req.query.aadhar },
      ];
    }

    console.log(filter);

    const complaints = await Complaint.find(filter)
      .skip(skip)
      .limit(limit)
      .populate("VictimIds AccusedIds WitnessIds filedBy")
      .sort({ LastEdited: -1 });

    const totalComplaints = await Complaint.countDocuments(filter);

    res.status(200).json({
      complaints,
      currentPage: page,
      totalPages: Math.ceil(totalComplaints / limit),
    });
  } catch (err) {
    console.error("Error fetching complaint:", err);
    return res.status(500).json({ message: "Internal server error" });
  }
};
