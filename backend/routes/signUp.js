const {signIn} = require("../controller/log.js");
const express = require("express");
const router = express.Router();


router.post("/signUp",signIn);

module.exports = router;