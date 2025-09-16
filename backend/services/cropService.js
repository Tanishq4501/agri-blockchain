// Import CropMetadata model
const CropMetadata = require('../models/CropMetadata');

// Import Fabric service
const { registerCrop, getCrop, getCropHistory } = require('./fabricService');

/**
 * Create or update crop metadata
 * @param {String} cropId - Crop ID
 * @param {Object} cropData - Crop metadata
 * @returns {Promise<Object>} - Crop metadata or error
 */
const createOrUpdateCropMetadata = async (cropId, cropData) => {
  try {
    // Find existing crop metadata or create new
    let cropMetadata = await CropMetadata.findOne({ cropID: cropId });
    
    if (!cropMetadata) {
      // Create new crop metadata
      cropMetadata = new CropMetadata({
        cropID: cropId,
        ...cropData
      });
    } else {
      // Update existing crop metadata
      Object.assign(cropMetadata, cropData);
    }
    
    const savedCropMetadata = await cropMetadata.save();
    
    return {
      success: true,
      data: savedCropMetadata,
      message: 'Crop metadata saved successfully'
    };
  } catch (error) {
    console.error('Error saving crop metadata:', error.message);
    
    // Handle Mongoose validation errors
    if (error.name === 'ValidationError') {
      const errors = Object.values(error.errors).map(err => err.message);
      return {
        success: false,
        error: 'Validation error',
        details: errors,
        code: 'VALIDATION_ERROR'
      };
    }
    
    return {
      success: false,
      error: error.message || 'Failed to save crop metadata',
      code: 'SERVER_ERROR'
    };
  }
};

/**
 * Get crop metadata by ID
 * @param {String} cropId - Crop ID
 * @returns {Promise<Object>} - Crop metadata or error
 */
const getCropMetadataById = async (cropId) => {
  try {
    // Find crop metadata by cropID
    const cropMetadata = await CropMetadata.findOne({ cropID: cropId });
    
    if (!cropMetadata) {
      return {
        success: false,
        error: 'Crop metadata not found',
        code: 'CROP_NOT_FOUND'
      };
    }
    
    return {
      success: true,
      data: cropMetadata
    };
  } catch (error) {
    console.error('Error fetching crop metadata:', error.message);
    return {
      success: false,
      error: error.message || 'Failed to fetch crop metadata',
      code: 'SERVER_ERROR'
    };
  }
};

/**
 * Add price history entry for a crop
 * @param {String} cropId - Crop ID
 * @param {Object} priceData - Price information
 * @returns {Promise<Object>} - Updated crop metadata or error
 */
const addPriceHistory = async (cropId, priceData) => {
  try {
    // Find crop metadata by cropID
    const cropMetadata = await CropMetadata.findOne({ cropID: cropId });
    
    if (!cropMetadata) {
      // If crop metadata doesn't exist, create it
      const newCropMetadata = new CropMetadata({
        cropID: cropId,
        priceHistory: [priceData]
      });
      
      const savedCropMetadata = await newCropMetadata.save();
      
      return {
        success: true,
        data: savedCropMetadata,
        message: 'Price history added and crop metadata created'
      };
    }
    
    // Add new price entry to history
    cropMetadata.priceHistory.push(priceData);
    
    // Sort price history by timestamp (newest first)
    cropMetadata.priceHistory.sort((a, b) => b.timestamp - a.timestamp);
    
    const savedCropMetadata = await cropMetadata.save();
    
    return {
      success: true,
      data: savedCropMetadata,
      message: 'Price history updated successfully'
    };
  } catch (error) {
    console.error('Error adding price history:', error.message);
    
    // Handle Mongoose validation errors
    if (error.name === 'ValidationError') {
      const errors = Object.values(error.errors).map(err => err.message);
      return {
        success: false,
        error: 'Validation error',
        details: errors,
        code: 'VALIDATION_ERROR'
      };
    }
    
    return {
      success: false,
      error: error.message || 'Failed to add price history',
      code: 'SERVER_ERROR'
    };
  }
};

/**
 * Get analytics data for a crop
 * @param {String} cropId - Crop ID
 * @returns {Promise<Object>} - Analytics data or error
 */
const getAnalyticsData = async (cropId) => {
  try {
    // Find crop metadata by cropID
    const cropMetadata = await CropMetadata.findOne({ cropID: cropId });
    
    if (!cropMetadata) {
      return {
        success: false,
        error: 'Crop metadata not found',
        code: 'CROP_NOT_FOUND'
      };
    }
    
    return {
      success: true,
      data: {
        cropID: cropMetadata.cropID,
        analyticsData: cropMetadata.analyticsData,
        priceHistory: cropMetadata.priceHistory
      }
    };
  } catch (error) {
    console.error('Error fetching analytics data:', error.message);
    return {
      success: false,
      error: error.message || 'Failed to fetch analytics data',
      code: 'SERVER_ERROR'
    };
  }
};

/**
 * Add analytics data for a crop
 * @param {String} cropId - Crop ID
 * @param {Object} analyticsData - Analytics information
 * @returns {Promise<Object>} - Updated crop metadata or error
 */
const addAnalyticsData = async (cropId, analyticsData) => {
  try {
    // Find crop metadata by cropID
    const cropMetadata = await CropMetadata.findOne({ cropID: cropId });
    
    if (!cropMetadata) {
      // If crop metadata doesn't exist, create it
      const newCropMetadata = new CropMetadata({
        cropID: cropId,
        analyticsData: [analyticsData]
      });
      
      const savedCropMetadata = await newCropMetadata.save();
      
      return {
        success: true,
        data: savedCropMetadata,
        message: 'Analytics data added and crop metadata created'
      };
    }
    
    // Add new analytics entry
    cropMetadata.analyticsData.push(analyticsData);
    
    // Sort analytics data by date (newest first)
    cropMetadata.analyticsData.sort((a, b) => b.date - a.date);
    
    const savedCropMetadata = await cropMetadata.save();
    
    return {
      success: true,
      data: savedCropMetadata,
      message: 'Analytics data updated successfully'
    };
  } catch (error) {
    console.error('Error adding analytics data:', error.message);
    
    // Handle Mongoose validation errors
    if (error.name === 'ValidationError') {
      const errors = Object.values(error.errors).map(err => err.message);
      return {
        success: false,
        error: 'Validation error',
        details: errors,
        code: 'VALIDATION_ERROR'
      };
    }
    
    return {
      success: false,
      error: error.message || 'Failed to add analytics data',
      code: 'SERVER_ERROR'
    };
  }
};

// Export all functions
module.exports = {
  createOrUpdateCropMetadata,
  getCropMetadataById,
  addPriceHistory,
  getAnalyticsData,
  addAnalyticsData
};
