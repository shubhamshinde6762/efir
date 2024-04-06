const express = require("express");
const router = express.Router();
const {register} = require("../controller/complaint/registerComplaint")

router.post("/register-complaint", register);

module.exports = router;