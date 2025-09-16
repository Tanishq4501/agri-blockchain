// Fabric Service for AgriTrace
// This service connects the backend to the Hyperledger Fabric network

const { createWallet } = require('../config/fabric/wallet-config');
const { createGateway, getNetworkAndContract } = require('../config/fabric/gateway-config');

// Channel and chaincode names
const CHANNEL_NAME = 'mychannel';
const CHAINCODE_NAME = 'supplychain';

// Global gateway instance
let gateway = null;
let contract = null;

/**
 * Initialize Fabric connection
 * @param {string} identityLabel - Identity label for the user
 * @returns {Promise<void>}
 */
const initializeFabric = async (identityLabel = 'admin') => {
  try {
    console.log('Initializing Fabric connection...');
    
    // Create wallet
    const wallet = await createWallet();
    
    // Check if admin identity exists in wallet
    const adminIdentity = await wallet.get('admin');
    if (!adminIdentity) {
      console.log('Admin identity not found in wallet, enrolling...');
      
      // Load admin credentials from test network
      const fs = require('fs');
      const path = require('path');
      
      const certPath = path.resolve(__dirname, '../../..', 'fabric/fabric-samples/test-network/organizations/peerOrganizations/org1.example.com/users/Admin@org1.example.com/msp/signcerts/Admin@org1.example.com-cert.pem');
      const keyPath = path.resolve(__dirname, '../../..', 'fabric/fabric-samples/test-network/organizations/peerOrganizations/org1.example.com/users/Admin@org1.example.com/msp/keystore/priv_sk');
      
      const certificate = fs.readFileSync(certPath, 'utf8');
      const privateKey = fs.readFileSync(keyPath, 'utf8');
      
      const identity = {
        credentials: {
          certificate,
          privateKey
        },
        mspId: 'Org1MSP',
        type: 'X.509',
        version: 1
      };
      
      await wallet.put('admin', identity);
      console.log('Admin identity enrolled successfully');
    }
    
    // Create gateway
    gateway = await createGateway(wallet, identityLabel);
    
    // Get network and contract
    const { network, contract: contractInstance } = await getNetworkAndContract(
      gateway, 
      CHANNEL_NAME, 
      CHAINCODE_NAME
    );
    
    contract = contractInstance;
    
    console.log('Fabric connection initialized successfully');
  } catch (error) {
    console.error('Error initializing Fabric connection:', error);
    throw error;
  }
};

/**
 * Register a new crop on the blockchain
 * @param {Object} cropData - Crop registration data
 * @returns {Promise<Object>} - Registered crop data
 */
const registerCrop = async (cropData) => {
  try {
    if (!contract) {
      throw new Error('Fabric connection not initialized');
    }
    
    // Generate a unique crop ID
    const cropID = `CROP-${Date.now()}`;
    
    // Call chaincode function
    await contract.submitTransaction(
      'RegisterCrop',
      cropID,
      cropData.name || cropData.cropType,
      cropData.farmerID || 'FARMER-001',
      cropData.quantity.toString(),
      cropData.price.toString()
    );
    
    console.log('Crop registered on blockchain with ID:', cropID);
    
    // Fetch the registered crop to return complete data
    const cropResult = await contract.evaluateTransaction('GetCrop', cropID);
    const crop = JSON.parse(cropResult.toString());
    
    return {
      success: true,
      data: { ...crop, cropID },
      message: 'Crop successfully registered on the blockchain'
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
const getCrop = async (cropID) => {
  try {
    if (!contract) {
      throw new Error('Fabric connection not initialized');
    }
    
    // Call chaincode function
    const result = await contract.evaluateTransaction('GetCrop', cropID);
    
    // Parse result
    const crop = JSON.parse(result.toString());
    
    return {
      success: true,
      data: crop
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
const getCropHistory = async (cropID) => {
  try {
    if (!contract) {
      throw new Error('Fabric connection not initialized');
    }
    
    // Call chaincode function
    const result = await contract.evaluateTransaction('GetCropHistory', cropID);
    
    // Parse result
    const history = JSON.parse(result.toString());
    
    return {
      success: true,
      data: history
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
const registerUser = async (userData) => {
  try {
    if (!contract) {
      throw new Error('Fabric connection not initialized');
    }
    
    // Generate a unique user ID
    const userID = `${userData.role.toUpperCase()}-${Date.now()}`;
    
    // Call chaincode function
    await contract.submitTransaction(
      'RegisterUser',
      userID,
      userData.role,
      userData.name
    );
    
    console.log('User registered on blockchain with ID:', userID);
    
    // Create user object for response (RegisterUser doesn't return data)
    const user = {
      userID,
      role: userData.role,
      name: userData.name,
      createdAt: new Date().toISOString()
    };
    
    return {
      success: true,
      data: user,
      message: 'User successfully registered on the blockchain'
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
const transferOwnership = async (cropID, fromID, toID) => {
  try {
    if (!contract) {
      throw new Error('Fabric connection not initialized');
    }
    
    // Call chaincode function
    const result = await contract.submitTransaction(
      'TransferOwnership',
      cropID,
      fromID,
      toID
    );
    
    console.log('Ownership transferred on blockchain:', result.toString());
    
    // Parse result
    const crop = JSON.parse(result.toString());
    
    return {
      success: true,
      data: crop,
      message: `Ownership successfully transferred to ${toID}`
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
const makePayment = async (cropID, buyerID, amount) => {
  try {
    if (!contract) {
      throw new Error('Fabric connection not initialized');
    }
    
    // Call chaincode function
    const result = await contract.submitTransaction(
      'MakePayment',
      cropID,
      buyerID,
      amount.toString()
    );
    
    console.log('Payment recorded on blockchain:', result.toString());
    
    // Parse result
    const crop = JSON.parse(result.toString());
    
    return {
      success: true,
      data: crop,
      message: `Payment of ${amount} recorded successfully`
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
const attachDoc = async (cropID, docHash, docType) => {
  try {
    if (!contract) {
      throw new Error('Fabric connection not initialized');
    }
    
    // Call chaincode function
    const result = await contract.submitTransaction(
      'AttachDoc',
      cropID,
      docHash,
      docType
    );
    
    console.log('Document attached on blockchain');
    
    // The AttachDoc function doesn't return anything, so we return a success message
    return {
      success: true,
      message: `Document successfully attached to crop ${cropID}`
    };
  } catch (error) {
    console.error('Error attaching document:', error);
    return {
      success: false,
      error: error.message || 'Failed to attach document to crop on blockchain'
    };
  }
};

/**
 * Close Fabric connection
 * @returns {Promise<void>}
 */
const closeFabricConnection = async () => {
  try {
    if (gateway) {
      await gateway.disconnect();
      console.log('Fabric connection closed');
    }
  } catch (error) {
    console.error('Error closing Fabric connection:', error);
  }
};

// Export all functions
module.exports = {
  initializeFabric,
  registerCrop,
  getCrop,
  getCropHistory,
  registerUser,
  transferOwnership,
  makePayment,
  attachDoc,
  closeFabricConnection
};
