
const mongoose = require('mongoose');
const Booking = require('../models/packagemodel');
const User = require('../models/Usermodel');

// Create a new booking
exports.createBooking = async (req, res) => {
  try {
    const { name, phone, email, packageTitle, car } = req.body;

    if (!name || !phone || !packageTitle || !car?.name || !car?.price) {
      return res.status(400).json({
        success: false,
        error: 'Required fields missing',
      });
    }

    // Find or create user
    let user = await User.findOne({ phone });
    if (!user) {
      user = await User.create({ name, phone, email });
    }

    // Create booking
    const booking = await Booking.create({
      user: user._id,
      packageTitle,
      car,
    });

    // Link booking to user
    user.packagebookings.push(booking._id);
    await user.save();

    res.status(201).json({
      success: true,
      data: booking,
    });
  } catch (error) {
    res.status(500).json({ success: false, error: error.message });
  }
};

// Get all bookings (admin)
exports.getAllBookings = async (req, res) => {
  try {
    const bookings = await Booking.find()
      .populate('user', 'name phone email')
      .sort({ createdAt: -1 });

    res.status(200).json({
      success: true,
      count: bookings.length,
      data: bookings,
    });
  } catch (error) {
    res.status(500).json({ success: false, error: error.message });
  }
};

exports.getBookingsByPhone = async (req, res) => {
  try {
    const { phone } = req.params;

    // Find the user by phone
    const user = await mongoose.model("User").findOne({ phone });
    if (!user) {
      return res.status(404).json({ success: false, error: 'User not found' });
    }

    // Find bookings related to that user
    const bookings = await Booking.find({ user: user._id });

    res.status(200).json({
      success: true,
      data: bookings,
    });
  } catch (error) {
    res.status(500).json({ success: false, error: error.message });
  }
};

// Update booking status
exports.updateBookingStatus = async (req, res) => {
  try {
    const { id } = req.params; // booking ID
    const { status } = req.body; // new status

    // Validate status
    if (!['pending', 'confirmed', 'cancelled'].includes(status)) {
      return res.status(400).json({ success: false, error: 'Invalid status' });
    }

    // Find and update booking
    const booking = await Booking.findByIdAndUpdate(
      id,
      { status },
      { new: true }
    ).populate('user', 'name phone email');

    if (!booking) {
      return res.status(404).json({ success: false, error: 'Booking not found' });
    }

    res.status(200).json({ success: true, data: booking });
  } catch (error) {
    res.status(500).json({ success: false, error: error.message });
  }
};

