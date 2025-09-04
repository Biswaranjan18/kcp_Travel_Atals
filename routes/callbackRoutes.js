const express = require("express");
const { createCallback, getCallbacks,updateCallbackStatus, deleteCallback } = require("../controllers/callbackController.js");


const router = express.Router();

router.post("/",createCallback); // POST /api/callbacks
router.get("/",getCallbacks);    // GET /api/callbacks (for admin)
// New route for updating status
router.put('/:id/status',updateCallbackStatus );
// Delete callback by ID
router.delete("/delate/:id",deleteCallback);

module.exports = router;

