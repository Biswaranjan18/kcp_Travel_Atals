const mongoose = require('mongoose');

const bookingSchema = new mongoose.Schema({
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true,
  },
  packageTitle: {
    type: String,
  },
  price: {
    type: Number,
  },
  car: {
    name: { type: String, required: false},
    price: { type: Number, required: false},
    features: [{ type: String, required: false }],
  },
  status: {
    type: String,
    enum: ['pending', 'confirmed', 'cancelled'],
    default: 'pending',
  },
  createdAt: {
    type: Date,
    default: Date.now,
  }
});

module.exports = mongoose.model('BookingPackage', bookingSchema);
