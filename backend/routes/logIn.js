const {logIn, autoLogin} = require("../controller/log");
const {auth} = require("../middleware/auth")
const express = require("express");
const router = express.Router();


router.post("/login",logIn); 
router.get("/login", auth, autoLogin);

module.exports = router; 