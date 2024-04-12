const express = require("express");
const router = express.Router();
const {generateContent} = require("../controller/genAi")

router.post("/genAi", generateContent)

module.exports = router;     