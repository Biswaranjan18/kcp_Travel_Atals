const express = require('express');
const router = express.Router();
const bookingController = require('../controllers/packageController');

// Create booking
router.post('/', bookingController.createBooking);

// Get all bookings (admin)
router.get('/', bookingController.getAllBookings);

// Get bookings by user phone
router.get('/:phone', bookingController.getBookingsByPhone);

// New route for updating status
router.put('/:id/status', bookingController.updateBookingStatus);

// Delete booking package by ID
router.delete("/:id", bookingController.deleteBookingPackage);

module.exports = router;
