const express = require('express');
const router = express.Router();
const userController = require('../controllers/userController.js');

// Get all users (admin)
router.get('/', userController.getAllUsers);

// Get user details with bookings
router.get('/:phone', userController.getUserDetails);

module.exports = router;