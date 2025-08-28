const User = require('../models/Usermodel');
const Booking = require('../models/BookingCarmodel');

// Get all users (for admin)
exports.getAllUsers = async (req, res) => {
  try {
    const users = await User.find().sort({ createdAt: -1 });
    res.status(200).json({
      success: true,
      count: users.length,
      data: users,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      error: error.message,
    });
  }
};

// Get user details with bookings
exports.getUserDetails = async (req, res) => {
  try {
    const { phone } = req.params;
    
    const user = await User.findOne({ phone }).populate('bookings');
    
    if (!user) {
      return res.status(404).json({
        success: false,
        error: 'User not found',
      });
    }
    
    res.status(200).json({
      success: true,
      data: user,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      error: error.message,
    });
  }
};