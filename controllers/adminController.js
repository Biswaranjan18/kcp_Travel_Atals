const Admin = require('../models/adminModel');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt');
const nodemailer = require('nodemailer');

const generateToken = (id, email) => jwt.sign({ id, email }, process.env.JWT_SECRET, { expiresIn: '30m' });

// Create transporter for sending emails
const transporter = nodemailer.createTransport({
  host: 'smtp.gmail.com',
  port: 465,
  secure: true,
  auth: {
    user: process.env.EMAIL_USER,
    pass: process.env.EMAIL_PASS
  }
});

// ----- Admin Login -----
exports.loginAdmin = async (req, res) => {
  try {
    const { email, password } = req.body;
    const admin = await Admin.findOne({ email });
    if (!admin) return res.status(401).json({ message: 'Invalid email or password' });

    const isMatch = await admin.matchPassword(password);
    if (!isMatch) return res.status(401).json({ message: 'Invalid email or password' });

    res.json({
      _id: admin._id,
      email: admin.email,
      token: generateToken(admin._id, admin.email)
    });
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: 'Server error' });
  }
};

// ----- Request OTP -----
exports.requestOTP = async (req, res) => {
  try {
    const { email } = req.body;
    const admin = await Admin.findOne({ email });
    if (!admin) return res.status(404).json({ message: 'Admin not found' });

    const otp = Math.floor(100000 + Math.random() * 900000);
    admin.otp = otp;
    admin.otpExpiry = Date.now() + 10 * 60 * 1000; // 10 mins
    await admin.save();

    // Send OTP email
    const mailOptions = {
      from: process.env.EMAIL_USER,
      to: email,
      subject: 'KCP Travel Admin OTP',
      text: `Your OTP for password reset is: ${otp}. It will expire in 10 minutes.`
    };

    transporter.sendMail(mailOptions, (err, info) => {
      if (err) {
        console.log('Error sending OTP email:', err.message);
        return res.status(500).json({ message: 'Failed to send OTP email', error: err.message });
      }
      res.json({ message: 'OTP sent to email' });
    });
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: 'Server error' });
  }
};

// ----- Reset Password With OTP -----
exports.resetPasswordWithOTP = async (req, res) => {
  try {
    const { email, otp, newPassword } = req.body;
    const admin = await Admin.findOne({ email });
    if (!admin) return res.status(404).json({ message: 'Admin not found' });

    if (admin.otp !== Number(otp) || Date.now() > admin.otpExpiry) {
      return res.status(400).json({ message: 'Invalid or expired OTP' });
    }

admin.password = newPassword; // directly save
admin.otp = undefined;
admin.otpExpiry = undefined;
await admin.save();


    res.json({ message: 'Password changed successfully' });
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: 'Server error' });
  }
};

