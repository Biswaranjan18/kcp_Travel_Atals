const Callback = require("../models/Callbackmodel.js");


// @desc    Create new callback request
// @route   POST /api/callbacks
// @access  Public
exports.createCallback = async (req, res) => {
  try {
    const { phone } = req.body;

    if (!phone || !/^\d{10}$/.test(phone)) {
      return res.status(400).json({ message: "Valid 10-digit phone number is required" });
    }

    const callback = new Callback({ phone });
    await callback.save();

    res.status(201).json({ message: "Callback request received", callback });
  } catch (error) {
    res.status(500).json({ message: "Server error", error: error.message });
  }
};

// @desc    Get all callback requests
// @route   GET /api/callbacks
// @access  Admin (optional)
exports.getCallbacks = async (req, res) => {
  try {
    const callbacks = await Callback.find().sort({ createdAt: -1 });
    res.json(callbacks);
  } catch (error) {
    res.status(500).json({ message: "Server error", error: error.message });
  }
};
