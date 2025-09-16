// Import Mongoose
const mongoose = require('mongoose');

// Define Price History sub-schema
const priceHistorySchema = new mongoose.Schema({
  // Price value
  price: {
    type: Number,
    required: [true, 'Price is required'],
    min: [0, 'Price cannot be negative']
  },
  
  // Timestamp when price was recorded
  timestamp: {
    type: Date,
    default: Date.now
  },
  
  // Optional notes about the price change
  notes: {
    type: String,
    trim: true,
    maxlength: [500, 'Notes cannot exceed 500 characters']
  }
});

// Define Analytics Data sub-schema
const analyticsDataSchema = new mongoose.Schema({
  // Date for which analytics are recorded
  date: {
    type: Date,
    required: [true, 'Date is required']
  },
  
  // Supply metrics
  supply: {
    totalQuantity: {
      type: Number,
      default: 0
    },
    availableQuantity: {
      type: Number,
      default: 0
    }
  },
  
  // Demand metrics
  demand: {
    totalOrders: {
      type: Number,
      default: 0
    },
    totalQuantityOrdered: {
      type: Number,
      default: 0
    }
  },
  
  // Market price trends
  priceTrends: {
    averagePrice: {
      type: Number,
      default: 0
    },
    minPrice: {
      type: Number,
      default: 0
    },
    maxPrice: {
      type: Number,
      default: 0
    }
  },
  
  // Geographical distribution
  distribution: [{
    region: String,
    quantity: Number
  }],
  
  // Quality metrics
  quality: {
    organicPercentage: {
      type: Number,
      default: 0,
      min: 0,
      max: 100
    },
    averageRating: {
      type: Number,
      default: 0,
      min: 0,
      max: 5
    }
  }
});

// Define Crop Metadata schema
const cropMetadataSchema = new mongoose.Schema({
  // Unique identifier for the crop (should match blockchain cropID)
  cropID: {
    type: String,
    required: [true, 'Crop ID is required'],
    unique: true,
    trim: true
  },
  
  // Price history array
  priceHistory: [priceHistorySchema],
  
  // Analytics data array
  analyticsData: [analyticsDataSchema],
  
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
cropMetadataSchema.pre('save', function(next) {
  this.updatedAt = Date.now();
  next();
});

// Create and export CropMetadata model
module.exports = mongoose.model('CropMetadata', cropMetadataSchema);
