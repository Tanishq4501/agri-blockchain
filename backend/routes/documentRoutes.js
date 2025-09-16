// Import Express router
const express = require('express');
const router = express.Router();

// Import document service
const { uploadDocumentToIPFS, retrieveDocumentFromIPFS } = require('../services/documentService');

/**
 * POST /api/docs/upload
 * Upload a document (invoice/certificate) to IPFS, return hash
 * Request body: { content, filename, docType }
 */
router.post('/upload', async (req, res) => {
  try {
    // Get document data from request body
    const { content, filename, docType } = req.body;
    
    // Validate required fields
    if (!content) {
      return res.status(400).json({
        status: 'error',
        message: 'Document content is required',
        code: 'MISSING_CONTENT'
      });
    }
    
    // Upload document to IPFS
    const result = await uploadDocumentToIPFS(content, filename, docType);
    
    if (!result.success) {
      // Handle different error types
      switch (result.code) {
        case 'MISSING_CONTENT':
          return res.status(400).json({
            status: 'error',
            message: result.error,
            code: result.code
          });
        case 'IPFS_UPLOAD_ERROR':
          return res.status(500).json({
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
    return res.status(201).json({
      status: 'success',
      message: result.message,
      data: result.data
    });
  } catch (error) {
    console.error('Error in POST /docs/upload:', error.message);
    return res.status(500).json({
      status: 'error',
      message: 'Internal server error',
      code: 'SERVER_ERROR'
    });
  }
});

/**
 * GET /api/docs/:hash
 * Retrieve document from IPFS using hash
 */
router.get('/:hash', async (req, res) => {
  try {
    // Get IPFS hash from route parameters
    const hash = req.params.hash;
    
    // Validate hash
    if (!hash) {
      return res.status(400).json({
        status: 'error',
        message: 'IPFS hash is required',
        code: 'MISSING_HASH'
      });
    }
    
    // Retrieve document from IPFS
    const result = await retrieveDocumentFromIPFS(hash);
    
    if (!result.success) {
      // Handle different error types
      switch (result.code) {
        case 'MISSING_HASH':
          return res.status(400).json({
            status: 'error',
            message: result.error,
            code: result.code
          });
        case 'IPFS_RETRIEVE_ERROR':
          return res.status(500).json({
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
    // Note: For binary content, we might want to handle this differently in a real application
    return res.status(200).json({
      status: 'success',
      message: result.message,
      data: result.data
    });
  } catch (error) {
    console.error('Error in GET /docs/:hash:', error.message);
    return res.status(500).json({
      status: 'error',
      message: 'Internal server error',
      code: 'SERVER_ERROR'
    });
  }
});

// Export router
module.exports = router;
