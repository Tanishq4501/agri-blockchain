// Validation middleware for AgriTrace backend

/**
 * Validate crop data
 * @param {Object} cropData - Crop data to validate
 * @returns {String|null} - Error message or null if valid
 */
const validateCropData = (cropData) => {
  if (!cropData) {
    return 'Crop data is required';
  }
  
  if (!cropData.name || typeof cropData.name !== 'string') {
    return 'Crop name is required and must be a string';
  }
  
  if (!cropData.quantity || typeof cropData.quantity !== 'number' || cropData.quantity <= 0) {
    return 'Crop quantity is required and must be a positive number';
  }
  
  if (!cropData.price || typeof cropData.price !== 'number' || cropData.price < 0) {
    return 'Crop price is required and must be a non-negative number';
  }
  
  return null; // Valid
};

/**
 * Validate price data
 * @param {Object} priceData - Price data to validate
 * @returns {String|null} - Error message or null if valid
 */
const validatePriceData = (priceData) => {
  if (!priceData) {
    return 'Price data is required';
  }
  
  if (priceData.price === undefined || typeof priceData.price !== 'number' || priceData.price < 0) {
    return 'Price is required and must be a non-negative number';
  }
  
  return null; // Valid
};

/**
 * Validate analytics data
 * @param {Object} analyticsData - Analytics data to validate
 * @returns {String|null} - Error message or null if valid
 */
const validateAnalyticsData = (analyticsData) => {
  if (!analyticsData) {
    return 'Analytics data is required';
  }
  
  if (!analyticsData.metric || typeof analyticsData.metric !== 'string') {
    return 'Analytics metric is required and must be a string';
  }
  
  if (analyticsData.value === undefined || typeof analyticsData.value !== 'number') {
    return 'Analytics value is required and must be a number';
  }
  
  return null; // Valid
};

// Export all validation functions
module.exports = {
  validateCropData,
  validatePriceData,
  validateAnalyticsData
};
