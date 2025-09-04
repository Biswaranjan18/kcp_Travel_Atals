const express = require('express');
const router = express.Router();
const bookingController = require('../controllers/bookingcarController.js');
const { protect } = require('../middlewares/authMiddleware');


// Create a new booking
router.post('/', protect, bookingController.createBooking);

// Get all bookings (admin)
router.get('/', protect, bookingController.getAllBookings);

// Get user bookings by phone number
router.get('/user/:phone',protect, bookingController.getUserBookings);

// New route for updating status
router.put('/:id/status', protect, bookingController.updateBookingStatus);

// Delete booking by ID
router.delete("/:id",protect, bookingController.deleteBooking);

module.exports = router;