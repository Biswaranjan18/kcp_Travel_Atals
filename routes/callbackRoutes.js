const express = require("express");
const { createCallback, getCallbacks,updateCallbackStatus, deleteCallback } = require("../controllers/callbackController.js");
const { protect } = require('../middlewares/authMiddleware');


const router = express.Router();

router.post("/",protect, createCallback); // POST /api/callbacks
router.get("/",protect, getCallbacks);    // GET /api/callbacks (for admin)
// New route for updating status
router.put('/:id/status',protect,updateCallbackStatus );
// Delete callback by ID
router.delete("/delate/:id",protect, deleteCallback);

module.exports = router;

