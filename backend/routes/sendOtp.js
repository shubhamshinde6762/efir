const express = require("express");
const router = express.Router();
const {sentOtp, verifyOtp} = require("../controller/otp");
const {logIn} = require("../controller/log");

router.post("/sendOtp", sentOtp);
router.post("/verifyOtp", verifyOtp, logIn);

  
module.exports = router;  