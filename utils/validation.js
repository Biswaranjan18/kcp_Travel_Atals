const validateBookingData = (data) => {
  const errors = {};
  
  // Validate user data
  if (!data.user || !data.user.name || !data.user.phone) {
    errors.user = 'User name and phone are required';
  } else if (!/^\d{10}$/.test(data.user.phone)) {
    errors.user = 'Phone number must be 10 digits';
  }
  
  // Validate trip details
  if (!data.tripDetails || !data.tripDetails.tripType) {
    errors.tripDetails = 'Trip type is required';
  }
  
  // Validate based on trip type
  if (data.tripDetails.tripType === 'one-way' || data.tripDetails.tripType === 'round-trip') {
    if (!data.tripDetails.to) {
      errors.to = 'Destination is required for one-way and round-trip';
    }
  }
  
  if (data.tripDetails.tripType === 'round-trip' && !data.tripDetails.returnDate) {
    errors.returnDate = 'Return date is required for round-trip';
  }
  
  if (data.tripDetails.tripType === 'local' && !data.tripDetails.hours) {
    errors.hours = 'Duration is required for local trips';
  }
  
  if (data.tripDetails.tripType === 'package' && !data.tripDetails.packageType) {
    errors.packageType = 'Package type is required for package trips';
  }
  
  return {
    isValid: Object.keys(errors).length === 0,
    errors,
  };
};

module.exports = {
  validateBookingData,
};