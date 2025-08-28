const express = require("express");
const { createCallback, getCallbacks } = require("../controllers/callbackController.js");


const router = express.Router();

router.post("/", createCallback); // POST /api/callbacks
router.get("/", getCallbacks);    // GET /api/callbacks (for admin)

module.exports = router;

