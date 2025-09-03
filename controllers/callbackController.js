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


// Update callback status (for admin)
exports.updateCallbackStatus = async (req, res) => {
  try {
    const { id } = req.params;
    const { status} = req.body;

    const callback = await Callback.findByIdAndUpdate(
      id,
      { status, updatedAt: Date.now() },
      { new: true, runValidators: true }
    );

    if (!callback) {
      return res.status(404).json({
        success: false,
        error: 'Callback not found',
      });
    }

    res.status(200).json({
      success: true,
      data: callback,
      message: 'Callback status updated successfully',
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      error: error.message,
    });
  }
};

// Delete callback by ID (for admin)
exports.deleteCallback = async (req, res) => {
  try {
    const { id } = req.params;

    const callback = await Callback.findByIdAndDelete(id);

    if (!callback) {
      return res.status(404).json({
        success: false,
        error: "Callback not found",
      });
    }

    res.status(200).json({
      success: true,
      message: "Callback deleted successfully",
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      error: error.message,
    });
  }
};