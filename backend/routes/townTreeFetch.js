const {fetchTownTree} = require("../controller/townTreeFetch");
const express = require("express");

const router = express.Router();

router.post("/fetchTownTree", fetchTownTree);


module.exports = router;   