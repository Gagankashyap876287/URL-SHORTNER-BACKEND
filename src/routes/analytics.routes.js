const express = require("express");

const {
  getAnalytics
} = require("../controllers/analytics.controller");

const router = express.Router();

router.get("/:shortCode", getAnalytics);

module.exports = router;
