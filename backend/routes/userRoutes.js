// Import Express router
const express = require('express');
const router = express.Router();

// Import user service
const { registerUser, getUserById } = require('../services/userService');

// Import Fabric service
const { registerUser: registerUserOnBlockchain } = require('../services/fabricService');

/**
 * POST /api/users
 * Register a new user
 * Request body: { userID, role, name, contactInfo }
 */
router.post('/', async (req, res) => {
  try {
    // Get user data from request body
    const userData = req.body;
    
    // Validate required fields
    if (!userData.userID || !userData.role || !userData.name) {
      return res.status(400).json({
        status: 'error',
        message: 'userID, role, and name are required',
        code: 'MISSING_REQUIRED_FIELDS'
      });
    }
    
    // Register user
    const result = await registerUser(userData);
    
    if (!result.success) {
      // Handle different error types
      switch (result.code) {
        case 'USER_EXISTS':
          return res.status(409).json({
            status: 'error',
            message: result.error,
            code: result.code
          });
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
    console.error('Error in POST /users:', error.message);
    return res.status(500).json({
      status: 'error',
      message: 'Internal server error',
      code: 'SERVER_ERROR'
    });
  }
});

/**
 * POST /api/users/register
 * Register a new user on blockchain
 * Request body: { role, name, email, ... }
 */
router.post('/register', async (req, res) => {
  try {
    // Get user data from request body
    const userData = req.body;
    
    // Validate required fields
    if (!userData.role || !userData.name) {
      return res.status(400).json({
        status: 'error',
        message: 'role and name are required',
        code: 'MISSING_REQUIRED_FIELDS'
      });
    }
    
    // Register user on blockchain
    const result = await registerUserOnBlockchain(userData);
    
    if (!result.success) {
      return res.status(400).json({
        status: 'error',
        message: result.error,
        code: 'BLOCKCHAIN_ERROR'
      });
    }
    
    res.status(201).json({
      status: 'success',
      message: result.message,
      data: result.data
    });
  } catch (error) {
    console.error('Error in POST /users/register:', error.message);
    return res.status(500).json({
      status: 'error',
      message: 'Internal server error',
      code: 'SERVER_ERROR'
    });
  }
});

/**
 * GET /api/users/:id
 * Fetch user details by ID
 */
router.get('/:id', async (req, res) => {
  try {
    // Get user ID from route parameters
    const userId = req.params.id;
    
    // Validate user ID
    if (!userId) {
      return res.status(400).json({
        status: 'error',
        message: 'User ID is required',
        code: 'MISSING_USER_ID'
      });
    }
    
    // Fetch user
    const result = await getUserById(userId);
    
    if (!result.success) {
      // Handle different error types
      switch (result.code) {
        case 'USER_NOT_FOUND':
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
    console.error('Error in GET /users/:id:', error.message);
    return res.status(500).json({
      status: 'error',
      message: 'Internal server error',
      code: 'SERVER_ERROR'
    });
  }
});

// Export router
module.exports = router;
