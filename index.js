const express = require("express");
const dotenv = require("dotenv");
const cors = require("cors");
const connectDB = require("./config/db.js");
const callbackRoutes = require("./routes/callbackRoutes.js");
const morgan = require('morgan');
const errorHandler = require('./middlewares/errorHandler');
const mongoose = require('mongoose');
const bcrypt = require('bcrypt');
const Admin = require('./models/adminModel.js');
const analyticsRoutes = require('./routes/analyticsRoutes.js');

dotenv.config();
connectDB();

const app = express();

// Route files
const bookingRoutes = require('./routes/bookingRoutes');
const userRoutes = require('./routes/userRoutes');
const packageRoutes = require('./routes/packageRoutes.js');
const adminRoutes = require('./routes/adminRoutes');

// Middleware
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({extended:false}))
// Error handler middleware
app.use(errorHandler);

// Dev logging middleware
if (process.env.NODE_ENV === 'development') {
  app.use(morgan('dev'));
}

// Routes
app.use("/api/callbacks", callbackRoutes);
app.use('/api/v1/bookings', bookingRoutes);
app.use('/api/v1/users', userRoutes);
app.use('/api/packagebookings', packageRoutes);

// const createAdmin = async () => {
//   try {
//     // await connectDB(); // ensure DB connection
//     const hashedPassword = '1234';

//     // Check if admin already exists
//     const existingAdmin = await Admin.findOne({ email: 'danusahoo6@gmail.com' });
//     if (existingAdmin) {
//       console.log('Admin already exists!');
//       process.exit();
//     }

//     const admin = new Admin({ email: 'danusahoo6@gmail.com', password: hashedPassword });
//     await admin.save();
//     console.log('Admin created!');
//     process.exit();
//   } catch (error) {
//     console.error(error);
//     process.exit(1);
//   }
// };

// createAdmin();

app.use('/api/admin', adminRoutes);
app.use("/api", analyticsRoutes);

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`🚀 Server running on port ${PORT}`));

// const createAdmin = async () => {
//   try {
//     // await connectDB(); // ensure DB connection
//     const hashedPassword = await bcrypt.hash('1234', 10);

//     // Check if admin already exists
//     const existingAdmin = await Admin.findOne({ email: 'kcptravel@gmail.com' });
//     if (existingAdmin) {
//       console.log('Admin already exists!');
//       process.exit();
//     }

//     const admin = new Admin({ email: 'kcptravel@gmail.com', password: hashedPassword });
//     await admin.save();
//     console.log('Admin created!');
//     process.exit();
//   } catch (error) {
//     console.error(error);
//     process.exit(1);
//   }
// };

// createAdmin();
