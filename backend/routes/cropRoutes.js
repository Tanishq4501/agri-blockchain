// Import Express router
const express = require('express');
const router = express.Router();

// Import crop service
const { createOrUpdateCropMetadata, getCropMetadataById, addPriceHistory, getAnalyticsData, addAnalyticsData } = require('../services/cropService');

// Import Fabric service
const { registerCrop } = require('../services/fabricService');

// Import validation middleware
const { validateCropData, validatePriceData, validateAnalyticsData } = require('../middleware/validation');

/**
 * POST /api/crops/register
 * Register a new crop on the blockchain
 * Request body: { name, farmerID, quantity, price, ... }
 */
router.post('/register', async (req, res) => {
  try {
    // Get crop data from request body
    const cropData = req.body;
    
    // Register crop on blockchain
    const result = await registerCrop(cropData);
    
    if (!result.success) {
      return res.status(400).json({
        status: 'error',
        message: result.error,
        code: 'BLOCKCHAIN_ERROR'
      });
    }
    
    // Also create metadata in MongoDB
    const metadataResult = await createOrUpdateCropMetadata(result.data.cropID, {
      ...cropData,
      blockchainData: result.data
    });
    
    res.status(201).json({
      status: 'success',
      message: 'Crop registered successfully on blockchain and metadata created',
      data: {
        blockchainData: result.data,
        metadata: metadataResult.data
      }
    });
  } catch (error) {
    console.error('Error registering crop:', error);
    res.status(500).json({
      status: 'error',
      message: error.message || 'Failed to register crop',
      code: 'SERVER_ERROR'
    });
  }
});

/**
 * POST /api/crops/:id/price
 * Append price history for a crop
 * Request body: { price, notes }
 */
router.post('/:id/price', async (req, res) => {
  try {
    // Get crop ID from route parameters
    const cropId = req.params.id;
    
    // Get price data from request body
    const priceData = req.body;
    
    // Validate crop ID
    if (!cropId) {
      return res.status(400).json({
        status: 'error',
        message: 'Crop ID is required',
        code: 'MISSING_CROP_ID'
      });
    }
    
    // Validate price
    if (priceData.price === undefined || priceData.price === null) {
      return res.status(400).json({
        status: 'error',
        message: 'Price is required',
        code: 'MISSING_PRICE'
      });
    }
    
    // Validate price is a number
    if (isNaN(parseFloat(priceData.price))) {
      return res.status(400).json({
        status: 'error',
        message: 'Price must be a valid number',
        code: 'INVALID_PRICE'
      });
    }
    
    // Add timestamp if not provided
    if (!priceData.timestamp) {
      priceData.timestamp = new Date().toISOString();
    }
    
    // Add price history
    const result = await addPriceHistory(cropId, priceData);
    
    if (!result.success) {
      // Handle different error types
      switch (result.code) {
        case 'VALIDATION_ERROR':
          return res.status(400).json({
            status: 'error',
            message: result.error,
            details: result.details,
            code: result.code
          });
        default:
          return res.status(500).json({
            status: 'error',
            message: result.error,
            code: result.code || 'SERVER_ERROR'
          });
      }
    }
    
    // Return success response
    return res.status(201).json({
      status: 'success',
      message: result.message,
      data: result.data
    });
  } catch (error) {
    console.error('Error in POST /crops/:id/price:', error.message);
    return res.status(500).json({
      status: 'error',
      message: 'Internal server error',
      code: 'SERVER_ERROR'
    });
  }
});

/**
 * GET /api/crops/:id/analytics
 * Fetch analytics data for a crop
 */
router.get('/:id/analytics', async (req, res) => {
  try {
    // Get crop ID from route parameters
    const cropId = req.params.id;
    
    // Validate crop ID
    if (!cropId) {
      return res.status(400).json({
        status: 'error',
        message: 'Crop ID is required',
        code: 'MISSING_CROP_ID'
      });
    }
    
    // Fetch analytics data
    const result = await getAnalyticsData(cropId);
    
    if (!result.success) {
      // Handle different error types
      switch (result.code) {
        case 'CROP_NOT_FOUND':
          return res.status(404).json({
            status: 'error',
            message: result.error,
            code: result.code
          });
        default:
          return res.status(500).json({
            status: 'error',
            message: result.error,
            code: result.code || 'SERVER_ERROR'
          });
      }
    }
    
    // Return success response
    return res.status(200).json({
      status: 'success',
      data: result.data
    });
  } catch (error) {
    console.error('Error in GET /crops/:id/analytics:', error.message);
    return res.status(500).json({
      status: 'error',
      message: 'Internal server error',
      code: 'SERVER_ERROR'
    });
  }
});

/**
 * GET /api/crops/:id/history
 * Get crop history from blockchain
 * Response: { status, data: [history entries] }
 */
router.get('/:id/history', async (req, res) => {
  try {
    // Get crop ID from route parameters
    const cropId = req.params.id;
    
    // Import Fabric service
    const { getCropHistory } = require('../services/fabricService');
    
    // Get crop history from blockchain
    const result = await getCropHistory(cropId);
    
    if (!result.success) {
      return res.status(404).json({
        status: 'error',
        message: result.error,
        code: 'CROP_NOT_FOUND'
      });
    }
    
    res.status(200).json({
      status: 'success',
      data: result.data
    });
  } catch (error) {
    console.error('Error fetching crop history:', error);
    res.status(500).json({
      status: 'error',
      message: error.message || 'Failed to fetch crop history',
      code: 'SERVER_ERROR'
    });
  }
});

/**
 * POST /api/crops/:id/transfer
 * Transfer ownership of a crop
 * Request body: { fromID, toID }
 */
router.post('/:id/transfer', async (req, res) => {
  try {
    // Get crop ID from route parameters
    const cropId = req.params.id;
    
    // Get transfer data from request body
    const { fromID, toID } = req.body;
    
    // Validate transfer data
    if (!fromID || !toID) {
      return res.status(400).json({
        status: 'error',
        message: 'fromID and toID are required',
        code: 'VALIDATION_ERROR'
      });
    }
    
    // Import Fabric service
    const { transferOwnership } = require('../services/fabricService');
    
    // Transfer ownership on blockchain
    const result = await transferOwnership(cropId, fromID, toID);
    
    if (!result.success) {
      return res.status(400).json({
        status: 'error',
        message: result.error,
        code: 'BLOCKCHAIN_ERROR'
      });
    }
    
    res.status(200).json({
      status: 'success',
      message: result.message,
      data: result.data
    });
  } catch (error) {
    console.error('Error transferring ownership:', error);
    res.status(500).json({
      status: 'error',
      message: error.message || 'Failed to transfer ownership',
      code: 'SERVER_ERROR'
    });
  }
});

/**
 * POST /api/crops/:id/payment
 * Record payment for a crop
 * Request body: { buyerID, amount }
 */
router.post('/:id/payment', async (req, res) => {
  try {
    // Get crop ID from route parameters
    const cropId = req.params.id;
    
    // Get payment data from request body
    const { buyerID, amount } = req.body;
    
    // Validate payment data
    if (!buyerID || !amount) {
      return res.status(400).json({
        status: 'error',
        message: 'buyerID and amount are required',
        code: 'VALIDATION_ERROR'
      });
    }
    
    // Import Fabric service
    const { makePayment } = require('../services/fabricService');
    
    // Record payment on blockchain
    const result = await makePayment(cropId, buyerID, amount);
    
    if (!result.success) {
      return res.status(400).json({
        status: 'error',
        message: result.error,
        code: 'BLOCKCHAIN_ERROR'
      });
    }
    
    res.status(200).json({
      status: 'success',
      message: result.message,
      data: result.data
    });
  } catch (error) {
    console.error('Error recording payment:', error);
    res.status(500).json({
      status: 'error',
      message: error.message || 'Failed to record payment',
      code: 'SERVER_ERROR'
    });
  }
});

/**
 * POST /api/crops/:id/document
 * Attach a document to a crop
 * Request body: { docHash, docType }
 */
router.post('/:id/document', async (req, res) => {
  try {
    // Get crop ID from route parameters
    const cropId = req.params.id;
    
    // Get document data from request body
    const { docHash, docType } = req.body;
    
    // Validate document data
    if (!docHash || !docType) {
      return res.status(400).json({
        status: 'error',
        message: 'docHash and docType are required',
        code: 'VALIDATION_ERROR'
      });
    }
    
    // Import Fabric service
    const { attachDoc } = require('../services/fabricService');
    
    // Attach document to crop on blockchain
    const result = await attachDoc(cropId, docHash, docType);
    
    if (!result.success) {
      return res.status(400).json({
        status: 'error',
        message: result.error,
        code: 'BLOCKCHAIN_ERROR'
      });
    }
    
    res.status(200).json({
      status: 'success',
      message: result.message,
      data: result.data
    });
  } catch (error) {
    console.error('Error attaching document:', error);
    res.status(500).json({
      status: 'error',
      message: error.message || 'Failed to attach document',
      code: 'SERVER_ERROR'
    });
  }
});

// Export router
module.exports = router;
