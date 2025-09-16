// Import User model
const User = require('../models/User');

/**
 * Register a new user
 * @param {Object} userData - User registration data
 * @returns {Promise<Object>} - Registered user data or error
 */
const registerUser = async (userData) => {
  try {
    // Check if user with the same userID already exists
    const existingUser = await User.findOne({ userID: userData.userID });
    
    if (existingUser) {
      return {
        success: false,
        error: 'User with this ID already exists',
        code: 'USER_EXISTS'
      };
    }
    
    // Create new user
    const user = new User(userData);
    const savedUser = await user.save();
    
    return {
      success: true,
      data: savedUser,
      message: 'User registered successfully'
    };
  } catch (error) {
    console.error('Error registering user:', error.message);
    
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
      error: error.message || 'Failed to register user',
      code: 'SERVER_ERROR'
    };
  }
};

/**
 * Get user by ID
 * @param {String} userId - User ID
 * @returns {Promise<Object>} - User data or error
 */
const getUserById = async (userId) => {
  try {
    // Find user by userID
    const user = await User.findOne({ userID: userId });
    
    if (!user) {
      return {
        success: false,
        error: 'User not found',
        code: 'USER_NOT_FOUND'
      };
    }
    
    return {
      success: true,
      data: user
    };
  } catch (error) {
    console.error('Error fetching user:', error.message);
    return {
      success: false,
      error: error.message || 'Failed to fetch user',
      code: 'SERVER_ERROR'
    };
  }
};

/**
 * Get all users (with optional filtering)
 * @param {Object} filter - Filter criteria
 * @param {Object} options - Pagination and sorting options
 * @returns {Promise<Object>} - List of users or error
 */
const getAllUsers = async (filter = {}, options = {}) => {
  try {
    const { page = 1, limit = 10, sort = { createdAt: -1 } } = options;
    
    // Find users with filtering and pagination
    const users = await User.find(filter)
      .sort(sort)
      .limit(limit * 1)
      .skip((page - 1) * limit)
      .exec();
    
    // Get total count for pagination
    const total = await User.countDocuments(filter);
    
    return {
      success: true,
      data: users,
      pagination: {
        page: parseInt(page),
        limit: parseInt(limit),
        total,
        pages: Math.ceil(total / limit)
      }
    };
  } catch (error) {
    console.error('Error fetching users:', error.message);
    return {
      success: false,
      error: error.message || 'Failed to fetch users',
      code: 'SERVER_ERROR'
    };
  }
};

// Export all functions
module.exports = {
  registerUser,
  getUserById,
  getAllUsers
};
