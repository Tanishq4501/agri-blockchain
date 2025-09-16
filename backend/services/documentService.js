// Import IPFS service
const { uploadDocument, retrieveDocument, getGatewayUrl } = require('./ipfsService');

/**
 * Upload a document to IPFS
 * @param {Buffer|String} content - Document content
 * @param {String} filename - Document filename
 * @param {String} docType - Document type (invoice/certificate)
 * @returns {Promise<Object>} - IPFS hash and metadata or error
 */
const uploadDocumentToIPFS = async (content, filename, docType) => {
  try {
    // Validate inputs
    if (!content) {
      return {
        success: false,
        error: 'Document content is required',
        code: 'MISSING_CONTENT'
      };
    }
    
    if (!filename) {
      filename = `document_${Date.now()}`;
    }
    
    // Add document type to filename if not already present
    if (docType && !filename.includes(docType)) {
      filename = `${docType}_${filename}`;
    }
    
    // Upload to IPFS
    const uploadResult = await uploadDocument(content, filename);
    
    if (!uploadResult.success) {
      return {
        success: false,
        error: uploadResult.error || 'Failed to upload document to IPFS',
        code: 'IPFS_UPLOAD_ERROR'
      };
    }
    
    // Generate gateway URL
    const gatewayUrl = getGatewayUrl(uploadResult.hash);
    
    return {
      success: true,
      data: {
        hash: uploadResult.hash,
        path: uploadResult.path,
        size: uploadResult.size,
        gatewayUrl: gatewayUrl,
        filename: filename,
        docType: docType,
        uploadedAt: new Date().toISOString()
      },
      message: 'Document uploaded successfully'
    };
  } catch (error) {
    console.error('Error uploading document:', error.message);
    return {
      success: false,
      error: error.message || 'Failed to upload document',
      code: 'SERVER_ERROR'
    };
  }
};

/**
 * Retrieve a document from IPFS
 * @param {String} hash - IPFS hash
 * @returns {Promise<Object>} - Document content or error
 */
const retrieveDocumentFromIPFS = async (hash) => {
  try {
    // Validate input
    if (!hash) {
      return {
        success: false,
        error: 'IPFS hash is required',
        code: 'MISSING_HASH'
      };
    }
    
    // Retrieve from IPFS
    const retrieveResult = await retrieveDocument(hash);
    
    if (!retrieveResult.success) {
      return {
        success: false,
        error: retrieveResult.error || 'Failed to retrieve document from IPFS',
        code: 'IPFS_RETRIEVE_ERROR'
      };
    }
    
    return {
      success: true,
      data: {
        content: retrieveResult.content,
        hash: retrieveResult.hash
      },
      message: 'Document retrieved successfully'
    };
  } catch (error) {
    console.error('Error retrieving document:', error.message);
    return {
      success: false,
      error: error.message || 'Failed to retrieve document',
      code: 'SERVER_ERROR'
    };
  }
};

/**
 * Get IPFS gateway URL for a document
 * @param {String} hash - IPFS hash
 * @returns {Promise<Object>} - Gateway URL or error
 */
const getDocumentGatewayUrl = async (hash) => {
  try {
    // Validate input
    if (!hash) {
      return {
        success: false,
        error: 'IPFS hash is required',
        code: 'MISSING_HASH'
      };
    }
    
    // Generate gateway URL
    const gatewayUrl = getGatewayUrl(hash);
    
    return {
      success: true,
      data: {
        hash: hash,
        gatewayUrl: gatewayUrl
      },
      message: 'Gateway URL generated successfully'
    };
  } catch (error) {
    console.error('Error generating gateway URL:', error.message);
    return {
      success: false,
      error: error.message || 'Failed to generate gateway URL',
      code: 'SERVER_ERROR'
    };
  }
};

// Export all functions
module.exports = {
  uploadDocumentToIPFS,
  retrieveDocumentFromIPFS,
  getDocumentGatewayUrl
};
