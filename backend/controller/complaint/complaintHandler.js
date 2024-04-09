const User = require("../../model/user");
const Complaint = require("../../model/complainant");
const mongoose = require("mongoose");

exports.handler = async (req, res) => {
  try {
    const userId = mongoose.Types.ObjectId(req.body.userId);
    const complaintId = req.body.complaintId;
    const remark = req.body.remark;
    const state = req.query.state;

    if (
      !state ||
      !complaintId ||
      !userId ||
      (state !== "true" && state !== "false")
    ) {
      return res.status(400).json({
        message: "Invalid data",
      });
    }

    const connectedUser = await User.findById(userId);
    let reqComplaint = await Complaint.findById(complaintId);

    if (!connectedUser || !reqComplaint) {
      return res.status(403).json({
        message: "Invalid data",
      });
    }

    // if (connectedUser.role !== "Super") {
    //   return res.status(401).json({
    //     message: "Unauthorized",
    //   });
    // }

    if (state === "true") {
      reqComplaint.complainantStatus = {
        date: new Date(),
        uniqueUserId : userId,
        user: connectedUser.uniqueUserId,
        status: "Completed",
        remark: remark || "No remark provided",
      };
    } else {
      reqComplaint.complainantStatus = {
        date: new Date(),
        uniqueUserId : userId,
        user: connectedUser.uniqueUserId,
        status: "Park",
        remark: remark || "No remark provided",
      };
    }

    await reqComplaint.save();

    return res.status(200).json({
      message: "Complaint status updated successfully",
      updatedComplaint: reqComplaint,
    });
  } catch (err) {
    console.error("Error:", err);
    return res.status(500).json({
      message: "Internal Server Error",
    });
  }
};
