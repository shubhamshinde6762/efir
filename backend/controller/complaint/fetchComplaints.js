const User = require("../../model/user");
const Complaint = require("../../model/complainant");
const mongoose = require("mongoose");

exports.fetchComplaint = async (req, res) => {
  try {
    const firId = req.param.firId;

    if (firId) {
      const fir = await Complaint.findOne({ firId }).populate(
        "VictimIds AccusedIds WitnessIds filedBy"
      );

      if (!fir) {
        return res.status(404).json({ message: "FIR not found" });
      }

      return res.status(200).json({ fir: [fir] });
    }

    const userId = req.body.userId;

    if (!userId) {
      return res.status(400).json({ message: "userId is required" });
    }

    const userReq = await User.findById(userId)
      .populate("filedComplaints")
      .populate(" VictimIds AccusedIds WitnessIds filedBy");

    if (!userReq) {
      return res.status(404).json({ message: "User not found" });
    }

    return res.status(200).json({ fir: userReq.filedComplaints });
  } catch (err) {
    console.error("Error fetching complaint:", err);
    return res.status(500).json({ message: "Internal server error" });
  }
};
