# Agri Supply Chain Backend

This is the backend for a blockchain-based agricultural supply chain system with MongoDB and IPFS integration.

## Features

- MongoDB integration using Mongoose
- IPFS integration using ipfs-http-client
- RESTful API for user management, crop metadata, and document handling
- Environment-based configuration
- Error handling and validation

## Folder Structure

```
backend/
├── config/          # Configuration files
├── models/          # Mongoose models
├── routes/          # API routes
├── services/        # Business logic
├── .env             # Environment variables
├── server.js        # Entry point
└── package.json     # Dependencies
```

## API Endpoints

### User Management

- `POST /api/users` - Register a new user
- `GET /api/users/:id` - Fetch user details

### Crop Metadata

- `POST /api/crops/:id/price` - Append price history for a crop
- `GET /api/crops/:id/analytics` - Fetch analytics data

### Document Management

- `POST /api/docs/upload` - Upload a document to IPFS
- `GET /api/docs/:hash` - Retrieve document from IPFS

## Setup Instructions

1. Install dependencies:
   ```bash
   npm install
   ```

2. Set up environment variables in `.env`:
   ```
   MONGODB_URI=mongodb://localhost:27017/agri_supplychain
   IPFS_API_URL=http://localhost:5001
   IPFS_GATEWAY_URL=https://ipfs.io
   PORT=3001
   ```

3. Start the server:
   ```bash
   npm start
   ```

   For development with auto-restart:
   ```bash
   npm run dev
   ```

## MongoDB Models

### User

```javascript
{
  userID: String,     // Unique identifier
  role: String,       // Farmer, Distributor, Retailer, Consumer
  name: String,       // Full name
  contactInfo: {      // Contact details
    email: String,
    phone: String,
    address: {
      street: String,
      city: String,
      state: String,
      country: String,
      zipCode: String
    }
  }
}
```

### CropMetadata

```javascript
{
  cropID: String,           // Unique identifier
  priceHistory: [{          // Price history array
    price: Number,
    timestamp: Date,
    notes: String
  }],
  analyticsData: [{         // Analytics data array
    date: Date,
    supply: {
      totalQuantity: Number,
      availableQuantity: Number
    },
    demand: {
      totalOrders: Number,
      totalQuantityOrdered: Number
    },
    priceTrends: {
      averagePrice: Number,
      minPrice: Number,
      maxPrice: Number
    }
  }]
}
```

## IPFS Integration

The backend uses IPFS for document storage:

- Documents are uploaded to IPFS and their hashes are stored in the blockchain
- Documents can be retrieved using their IPFS hashes
- Gateway URLs are provided for direct access to documents

## Error Handling

All API responses follow a consistent format:

```javascript
{
  status: 'success|error',
  message: 'Description of the response',
  data: {},      // For successful responses
  error: {},     // For error responses
  code: 'ERROR_CODE'
}
```

## Development

- Uses Express.js for the web framework
- Mongoose for MongoDB object modeling
- ipfs-http-client for IPFS integration
- dotenv for environment configuration
- helmet for security headers
- morgan for request logging
- cors for cross-origin resource sharing
