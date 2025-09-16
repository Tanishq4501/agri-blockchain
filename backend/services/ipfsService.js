// Load environment variables
require('dotenv').config();

// Import IPFS HTTP client
let ipfsClient = null;

try {
  // For ipfs-http-client v60+, use direct require
  const { create } = require('ipfs-http-client');
  
  // Create IPFS client instance
  try {
    // Configure IPFS client with API URL from environment variables
    ipfsClient = create({
      url: process.env.IPFS_API_URL || 'http://localhost:5001'
    });
    
    console.log('IPFS client initialized');
  } catch (error) {
    console.error('Error initializing IPFS client:', error.message);
    ipfsClient = null;
  }
} catch (error) {
  console.error('Failed to load IPFS client module:', error.message);
  ipfsClient = null;
}

/**
 * Upload a document to IPFS
 * @param {Buffer|String} content - Document content to upload (base64 string or buffer)
 * @param {String} filename - Optional filename
 * @returns {Promise<Object>} - IPFS hash and other metadata
 */
const uploadDocument = async (content, filename = 'document') => {
  try {
    // Check if IPFS client is initialized
    if (!ipfsClient) {
      return {
        success: false,
        error: 'IPFS client not initialized or failed to load'
      };
    }
    
    // Convert base64 content to buffer if it's a string
    let bufferContent;
    if (typeof content === 'string') {
      // Assume it's base64 encoded
      bufferContent = Buffer.from(content, 'base64');
    } else {
      bufferContent = content;
    }
    
    // Add content to IPFS
    const result = await ipfsClient.add({
      content: bufferContent,
      path: filename
    });
    
    // Return the IPFS hash and metadata
    return {
      success: true,
      hash: result.cid.toString(),
      path: result.path,
      size: result.size
    };
  } catch (error) {
    console.error('Error uploading document to IPFS:', error.message);
    return {
      success: false,
      error: error.message
    };
  }
};

/**
 * Retrieve a document from IPFS
 * @param {String} hash - IPFS hash of the document
 * @returns {Promise<Object>} - Document content and metadata
 */
const retrieveDocument = async (hash) => {
  try {
    // Check if IPFS client is initialized
    if (!ipfsClient) {
      return {
        success: false,
        error: 'IPFS client not initialized or failed to load'
      };
    }
    
    // Retrieve content from IPFS
    const stream = ipfsClient.cat(hash);
    
    // Collect all chunks of data
    const chunks = [];
    for await (const chunk of stream) {
      chunks.push(chunk);
    }
    
    // Combine chunks into a single buffer
    const content = Buffer.concat(chunks);
    
    return {
      success: true,
      content: content,
      hash: hash
    };
  } catch (error) {
    console.error('Error retrieving document from IPFS:', error.message);
    return {
      success: false,
      error: error.message
    };
  }
};

/**
 * Get IPFS gateway URL for a document
 * @param {String} hash - IPFS hash of the document
 * @returns {String} - Gateway URL
 */
const getGatewayUrl = (hash) => {
  const baseUrl = process.env.IPFS_GATEWAY_URL || 'https://ipfs.io';
  return `${baseUrl}/ipfs/${hash}`;
};

// Export all functions
module.exports = {
  uploadDocument,
  retrieveDocument,
  getGatewayUrl
};
