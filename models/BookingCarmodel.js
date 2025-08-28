const mongoose = require('mongoose');

const bookingSchema = new mongoose.Schema({
  user: {
    name: {
      type: String,
      required: true,
    },
    phone: {
      type: String,
      required: true,
    },
    email: {
      type: String,
    },
  },
  tripType: {
    type: String,
    required: true,
    enum: ['one-way', 'round-trip', 'local', 'package'],
  },
  from: {
    type: String,
    required: true,
  },
  to: {
    type: String,
    required: function() {
      return this.tripType === 'one-way' || this.tripType === 'round-trip';
    },
  },
  pickupDate: {
    type: Date,
    required: true,
  },
  pickupTime: {
    type: String,
    required: true,
  },
  timePeriod: {
    type: String,
    required: true,
    enum: ['AM', 'PM'],
  },
  carType: {
    type: String,
    required: true,
    enum: ['Sedan (4-seater)', 'SUV', 'Hatchback', 'Luxury'],
  },
  returnDate: {
    type: Date,
    required: function() {
      return this.tripType === 'round-trip';
    },
  },
  returnTime: {
    type: String,
    required: function() {
      return this.tripType === 'round-trip';
    },
  },
  returnTimePeriod: {
    type: String,
    enum: ['AM', 'PM'],
    required: function() {
      return this.tripType === 'round-trip';
    },
  },
  hours: {
    type: String,
    required: function() {
      return this.tripType === 'local';
    },
  },
  packageType: {
    type: String,
    required: function() {
      return this.tripType === 'package';
    },
  },
  status: {
    type: String,
    enum: ['pending', 'confirmed', 'cancelled', 'completed'],
    default: 'pending',
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
  updatedAt: {
    type: Date,
    default: Date.now,
  },
  notes: {
    type: String,
  },
});

// Update the updatedAt field before saving
bookingSchema.pre('save', function(next) {
  this.updatedAt = Date.now();
  next();
});

module.exports = mongoose.model('Booking', bookingSchema);