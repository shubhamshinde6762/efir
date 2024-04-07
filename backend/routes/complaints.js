const express = require("express");
const router = express.Router();
const {register} = require("../controller/complaint/registerComplaint")
const {fetchComplaint} = require("../controller/complaint/fetchComplaints");

router.post("/register-complaint", register);
router.post("/fetchComplaint/:firId?", fetchComplaint)
router.get("/fetchComplaint/Super/:userId", fetchComplaint)


module.exports = router;