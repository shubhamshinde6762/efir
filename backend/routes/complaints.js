const express = require("express");
const router = express.Router();
const {register} = require("../controller/complaint/registerComplaint")
const {fetchComplaint, fetchComplaintSuper} = require("../controller/complaint/fetchComplaints");

router.post("/register-complaint", register);
router.post("/fetchComplaint/:firId?", fetchComplaint)
router.get("/fetchSuper/:userId?", fetchComplaintSuper)


module.exports = router;