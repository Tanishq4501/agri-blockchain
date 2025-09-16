/**
 * Blockchain Service for AgriTrace
 * This service connects the frontend to the backend API which connects to Hyperledger Fabric
 */

import { getApiBaseUrl } from './apiConfig';

// Helper function to handle API responses
const handleResponse = async (response) => {
  const data = await response.json();
  
  if (!response.ok) {
    throw new Error(data.message || 'API request failed');
  }
  
  return data;
};

/**
 * Register a new crop on the blockchain
 * @param {Object} cropData - Crop registration data
 * @returns {Promise<Object>} - Registered crop data
 */
export const registerCrop = async (cropData) => {
  try {
    // Call backend API to register crop on blockchain
    const response = await fetch(`${getApiBaseUrl()}/crops/register`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(cropData),
    });
    
    const result = await handleResponse(response);
    
    return {
      success: true,
      data: result.data.blockchainData,
      message: result.message
    };
  } catch (error) {
    console.error('Error registering crop:', error);
    return {
      success: false,
      error: error.message || 'Failed to register crop on blockchain'
    };
  }
};

/**
 * Get crop details from the blockchain
 * @param {string} cropID - Unique identifier for the crop
 * @returns {Promise<Object>} - Crop details
 */
export const getCrop = async (cropID) => {
  try {
    // In a real implementation, this would call the Fabric chaincode
    // For now, we'll fetch from backend which stores blockchain data
    const response = await fetch(`${getApiBaseUrl()}/crops/${cropID}`);
    
    if (!response.ok) {
      throw new Error('Crop not found');
    }
    
    const result = await handleResponse(response);
    
    return {
      success: true,
      data: result.data
    };
  } catch (error) {
    console.error('Error fetching crop:', error);
    return {
      success: false,
      error: error.message || 'Failed to fetch crop from blockchain'
    };
  }
};

/**
 * Get crop history from the blockchain
 * @param {string} cropID - Unique identifier for the crop
 * @returns {Promise<Object>} - Crop history
 */
export const getCropHistory = async (cropID) => {
  try {
    // Call backend API to get crop history from blockchain
    const response = await fetch(`${getApiBaseUrl()}/crops/${cropID}/history`);
    
    if (!response.ok) {
      throw new Error('Crop history not found');
    }
    
    const result = await handleResponse(response);
    
    return {
      success: true,
      data: result.data
    };
  } catch (error) {
    console.error('Error fetching crop history:', error);
    return {
      success: false,
      error: error.message || 'Failed to fetch crop history from blockchain'
    };
  }
};

/**
 * Register a new user on the blockchain
 * @param {Object} userData - User registration data
 * @returns {Promise<Object>} - Registered user data
 */
export const registerUser = async (userData) => {
  try {
    // Call backend API to register user on blockchain
    const response = await fetch(`${getApiBaseUrl()}/users/register`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(userData),
    });
    
    const result = await handleResponse(response);
    
    return {
      success: true,
      data: result.data,
      message: result.message
    };
  } catch (error) {
    console.error('Error registering user:', error);
    return {
      success: false,
      error: error.message || 'Failed to register user on blockchain'
    };
  }
};

/**
 * Transfer ownership of a crop
 * @param {string} cropID - Unique identifier for the crop
 * @param {string} fromID - ID of the current owner
 * @param {string} toID - ID of the new owner
 * @returns {Promise<Object>} - Transfer result
 */
export const transferOwnership = async (cropID, fromID, toID) => {
  try {
    // Call backend API to transfer ownership on blockchain
    const response = await fetch(`${getApiBaseUrl()}/crops/${cropID}/transfer`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ fromID, toID }),
    });
    
    const result = await handleResponse(response);
    
    return {
      success: true,
      data: result.data,
      message: result.message
    };
  } catch (error) {
    console.error('Error transferring ownership:', error);
    return {
      success: false,
      error: error.message || 'Failed to transfer ownership on blockchain'
    };
  }
};

/**
 * Record payment for a crop
 * @param {string} cropID - Unique identifier for the crop
 * @param {string} buyerID - ID of the buyer
 * @param {number} amount - Payment amount
 * @returns {Promise<Object>} - Payment result
 */
export const makePayment = async (cropID, buyerID, amount) => {
  try {
    // Call backend API to record payment on blockchain
    const response = await fetch(`${getApiBaseUrl()}/crops/${cropID}/payment`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ buyerID, amount: parseFloat(amount) }),
    });
    
    const result = await handleResponse(response);
    
    return {
      success: true,
      data: result.data,
      message: result.message
    };
  } catch (error) {
    console.error('Error recording payment:', error);
    return {
      success: false,
      error: error.message || 'Failed to record payment on blockchain'
    };
  }
};

/**
 * Attach a document to a crop
 * @param {string} cropID - Unique identifier for the crop
 * @param {string} docHash - IPFS hash of the document
 * @param {string} docType - Type of document
 * @returns {Promise<Object>} - Attachment result
 */
export const attachDoc = async (cropID, docHash, docType) => {
  try {
    // Call backend API to attach document to crop on blockchain
    const response = await fetch(`${getApiBaseUrl()}/crops/${cropID}/document`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ docHash, docType }),
    });
    
    const result = await handleResponse(response);
    
    return {
      success: true,
      data: result.data,
      message: result.message
    };
  } catch (error) {
    console.error('Error attaching document:', error);
    return {
      success: false,
      error: error.message || 'Failed to attach document to crop on blockchain'
    };
  }
};

// Export all functions
export default {
  registerCrop,
  getCrop,
  getCropHistory,
  registerUser,
  transferOwnership,
  makePayment,
  attachDoc
};
