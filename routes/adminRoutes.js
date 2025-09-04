const express = require('express');
const router = express.Router();
const { loginAdmin, requestOTP, resetPasswordWithOTP, } = require('../controllers/adminController');


router.post('/login', loginAdmin,);
router.post('/request-otp', requestOTP);
router.put('/reset-password', resetPasswordWithOTP);


module.exports = router;
