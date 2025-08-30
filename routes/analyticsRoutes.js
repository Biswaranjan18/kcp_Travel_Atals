const express = require("express");
const router = express.Router();
const { getLifetimeVisitors } = require("../controllers/analyticsController");

// API endpoint: /api/visitors
router.get("/visitors", getLifetimeVisitors);

module.exports = router;
