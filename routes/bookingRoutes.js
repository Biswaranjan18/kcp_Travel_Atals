const express = require('express');
const router = express.Router();
const bookingController = require('../controllers/bookingcarController.js');


// Create a new booking
router.post('/',bookingController.createBooking);

// Get all bookings (admin)
router.get('/',bookingController.getAllBookings);

// Get user bookings by phone number
router.get('/user/:phone',bookingController.getUserBookings);

// New route for updating status
router.put('/:id/status',bookingController.updateBookingStatus);

// Delete booking by ID
router.delete("/:id",bookingController.deleteBooking);

module.exports = router;