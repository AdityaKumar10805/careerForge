const express = require("express");

const router = express.Router();

const { summaryGenerator } = require("../controllers/aiController");

router.post("/summary", summaryGenerator);

module.exports = router;