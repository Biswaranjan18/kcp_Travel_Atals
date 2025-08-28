const Booking = require('../models/BookingCarmodel');
const User = require('../models/Usermodel.js');

// Create a new booking
exports.createBooking = async (req, res) => {
  try {
    const { user, tripDetails } = req.body;
    
    // Check if user exists by phone number
    let existingUser = await User.findOne({ phone: user.phone });
    
    if (!existingUser) {
      // Create new user if not exists
      existingUser = new User({
        name: user.name,
        phone: user.phone,
        email: user.email || undefined,
      });
      await existingUser.save();
    }
    
    // Create booking
    const booking = new Booking({
      user: {
        name: user.name,
        phone: user.phone,
        email: user.email || undefined,
      },
      ...tripDetails,
    });
    
    await booking.save();
    
    // Add booking to user's bookings array
    existingUser.bookings.push(booking._id);
    await existingUser.save();
    
    res.status(201).json({
      success: true,
      data: booking,
      message: 'Booking created successfully',
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      error: error.message,
    });
  }
};

// Get all bookings (for admin)
exports.getAllBookings = async (req, res) => {
  try {
    const bookings = await Booking.find().sort({ createdAt: -1 });
    res.status(200).json({
      success: true,
      count: bookings.length,
      data: bookings,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      error: error.message,
    });
  }
};

// Get bookings by phone number (for users)
exports.getUserBookings = async (req, res) => {
  try {
    const { phone } = req.params;
    
    const bookings = await Booking.find({ 'user.phone': phone }).sort({ createdAt: -1 });
    
    res.status(200).json({
      success: true,
      count: bookings.length,
      data: bookings,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      error: error.message,
    });
  }
};

// Update booking status (for admin)
exports.updateBookingStatus = async (req, res) => {
  try {
    const { id } = req.params;
    const { status, notes } = req.body;
    
    const booking = await Booking.findByIdAndUpdate(
      id,
      { status, notes, updatedAt: Date.now() },
      { new: true, runValidators: true }
    );
    
    if (!booking) {
      return res.status(404).json({
        success: false,
        error: 'Booking not found',
      });
    }
    
    res.status(200).json({
      success: true,
      data: booking,
      message: 'Booking status updated successfully',
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      error: error.message,
    });
  }
};

// Update booking status & add notes
exports.updateBookingStatus = async (req, res) => {
  try {
    const { id } = req.params;
    const { status} = req.body;

    if (!['pending', 'confirmed', 'cancelled', 'completed'].includes(status)) {
      return res.status(400).json({ success: false, error: 'Invalid status' });
    }

    const booking = await Booking.findByIdAndUpdate(
      id,
      { status, updatedAt: Date.now() },
      { new: true, runValidators: true }
    );

    if (!booking) {
      return res.status(404).json({ success: false, error: 'Booking not found' });
    }

    res.status(200).json({ success: true, data: booking, message: 'Booking status updated successfully' });
  } catch (error) {
    res.status(500).json({ success: false, error: error.message });
  }
};