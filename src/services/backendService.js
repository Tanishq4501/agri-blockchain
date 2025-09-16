/**
 * Backend Service for AgriTrace
 * This service connects the frontend to the backend API
 */

/**
 * Get the base URL for the backend API
 * @returns {string} - Base URL for backend API
 */
const getApiBaseUrl = () => {
  // In browser environments, we can't access process.env at module scope
  // So we access it when the function is called
  if (typeof process !== 'undefined' && process.env && process.env.REACT_APP_BACKEND_URL) {
    return process.env.REACT_APP_BACKEND_URL;
  }
  
  // Default to localhost for development
  return 'http://localhost:3001/api';
};

/**
 * Handle API response
 * @param {Response} response - Fetch response
 * @returns {Promise<Object>} - Parsed response data
 */
const handleResponse = async (response) => {
  const data = await response.json();
  
  if (!response.ok) {
    throw new Error(data.message || 'API request failed');
  }
  
  return data;
};

/**
 * Register a new user in the backend database
 * @param {Object} userData - User registration data
 * @returns {Promise<Object>} - Registered user data
 */
export const registerUser = async (userData) => {
  try {
    const response = await fetch(`${getApiBaseUrl()}/users`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(userData),
    });
    
    return await handleResponse(response);
  } catch (error) {
    console.error('Error registering user:', error);
    throw error;
  }
};

/**
 * Get user details by ID
 * @param {string} userId - User ID
 * @returns {Promise<Object>} - User data
 */
export const getUser = async (userId) => {
  try {
    const response = await fetch(`${getApiBaseUrl()}/users/${userId}`, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
      },
    });
    
    return await handleResponse(response);
  } catch (error) {
    console.error('Error fetching user:', error);
    throw error;
  }
};

/**
 * Add price history for a crop
 * @param {string} cropId - Crop ID
 * @param {Object} priceData - Price information
 * @returns {Promise<Object>} - Updated crop metadata
 */
export const addCropPrice = async (cropId, priceData) => {
  try {
    const response = await fetch(`${getApiBaseUrl()}/crops/${cropId}/price`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(priceData),
    });
    
    return await handleResponse(response);
  } catch (error) {
    console.error('Error adding crop price:', error);
    throw error;
  }
};

/**
 * Get analytics data for a crop
 * @param {string} cropId - Crop ID
 * @returns {Promise<Object>} - Analytics data
 */
export const getCropAnalytics = async (cropId) => {
  try {
    const response = await fetch(`${getApiBaseUrl()}/crops/${cropId}/analytics`, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
      },
    });
    
    return await handleResponse(response);
  } catch (error) {
    console.error('Error fetching crop analytics:', error);
    throw error;
  }
};

/**
 * Upload a document to IPFS via backend
 * @param {Object} documentData - Document data including content
 * @returns {Promise<Object>} - IPFS hash and metadata
 */
export const uploadDocument = async (documentData) => {
  try {
    const response = await fetch(`${getApiBaseUrl()}/docs/upload`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(documentData),
    });
    
    return await handleResponse(response);
  } catch (error) {
    console.error('Error uploading document:', error);
    throw error;
  }
};

/**
 * Retrieve a document from IPFS via backend
 * @param {string} hash - IPFS hash
 * @returns {Promise<Object>} - Document data
 */
export const retrieveDocument = async (hash) => {
  try {
    const response = await fetch(`${getApiBaseUrl()}/docs/${hash}`, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
      },
    });
    
    return await handleResponse(response);
  } catch (error) {
    console.error('Error retrieving document:', error);
    throw error;
  }
};

// Export all functions
export default {
  registerUser,
  getUser,
  addCropPrice,
  getCropAnalytics,
  uploadDocument,
  retrieveDocument
};
