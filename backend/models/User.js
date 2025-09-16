// Import Mongoose
const mongoose = require('mongoose');

// Define User schema
const userSchema = new mongoose.Schema({
  // Unique identifier for the user (should match blockchain userID)
  userID: {
    type: String,
    required: [true, 'User ID is required'],
    unique: true,
    trim: true
  },
  
  // Role of the user in the supply chain
  role: {
    type: String,
    required: [true, 'Role is required'],
    enum: {
      values: ['Farmer', 'Distributor', 'Retailer', 'Consumer'],
      message: 'Role must be either Farmer, Distributor, Retailer, or Consumer'
    }
  },
  
  // Full name of the user
  name: {
    type: String,
    required: [true, 'Name is required'],
    trim: true,
    maxlength: [100, 'Name cannot exceed 100 characters']
  },
  
  // Contact information
  contactInfo: {
    email: {
      type: String,
      trim: true,
      lowercase: true,
      validate: {
        validator: function(email) {
          return /^([\w-\.]+@([\w-]+\.)+[\w-]{2,4})?$/.test(email);
        },
        message: 'Please enter a valid email address'
      }
    },
    phone: {
      type: String,
      trim: true,
      validate: {
        validator: function(phone) {
          return /^\+?[1-9]\d{1,14}$/.test(phone); // Basic phone validation
        },
        message: 'Please enter a valid phone number'
      }
    },
    address: {
      street: String,
      city: String,
      state: String,
      country: String,
      zipCode: String
    }
  },
  
  // Timestamps
  createdAt: {
    type: Date,
    default: Date.now
  },
  
  updatedAt: {
    type: Date,
    default: Date.now
  }
});

// Update the updatedAt field before saving
userSchema.pre('save', function(next) {
  this.updatedAt = Date.now();
  next();
});

// Create and export User model
module.exports = mongoose.model('User', userSchema);
