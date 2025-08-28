const express = require('express');
const router = express.Router();
const { loginAdmin, requestOTP, resetPasswordWithOTP, } = require('../controllers/adminController');
const { protect } = require('../middlewares/authMiddleware');

router.post('/login', loginAdmin);
router.post('/request-otp', requestOTP);
router.put('/reset-password', resetPasswordWithOTP);


module.exports = router;
