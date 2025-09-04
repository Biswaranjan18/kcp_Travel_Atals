const express = require('express');
const router = express.Router();
const bookingController = require('../controllers/packageController');
const { protect } = require('../middlewares/authMiddleware');

// Create booking
router.post('/',protect, bookingController.createBooking);

// Get all bookings (admin)
router.get('/',protect, bookingController.getAllBookings);

// Get bookings by user phone
router.get('/:phone', protect,bookingController.getBookingsByPhone);

// New route for updating status
router.put('/:id/status',protect, bookingController.updateBookingStatus);

// Delete booking package by ID
router.delete("/:id", protect,bookingController.deleteBookingPackage);

module.exports = router;
