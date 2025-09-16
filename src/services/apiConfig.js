/**
 * API Configuration for AgriTrace
 * This file contains configuration settings for connecting to the Hyperledger Fabric network
 */

// In a production environment, these values would come from environment variables
const API_CONFIG = {
  // Fabric Network Configuration
  NETWORK_CONFIG: {
    CHANNEL_NAME: 'agrichannel',
    CHAINCODE_NAME: 'agrisupplychain',
    NETWORK_URL: process.env.FABRIC_NETWORK_URL || 'grpc://localhost:7051',
    EVENT_URL: process.env.FABRIC_EVENT_URL || 'grpc://localhost:7053',
    CA_URL: process.env.FABRIC_CA_URL || 'http://localhost:7054',
    MSP_ID: process.env.FABRIC_MSP_ID || 'Org1MSP',
    PEER_NAME: process.env.FABRIC_PEER_NAME || 'peer0.org1.example.com',
    ORDERER_URL: process.env.FABRIC_ORDERER_URL || 'grpc://localhost:7050'
  },
  
  // Wallet Configuration
  WALLET_CONFIG: {
    WALLET_PATH: process.env.WALLET_PATH || './wallet',
    IDENTITY_LABEL: process.env.IDENTITY_LABEL || 'appUser'
  },
  
  // Connection Options
  CONNECTION_OPTIONS: {
    'grpc.max_send_message_length': -1,
    'grpc.max_receive_message_length': -1,
    'grpc.keepalive_time_ms': 120000,
    'grpc.http2.min_time_between_pings_ms': 120000,
    'grpc.keepalive_timeout_ms': 20000,
    'grpc.http2.max_pings_without_data': 0,
    'grpc.keepalive_permit_without_calls': 1
  },
  
  // Transaction Settings
  TRANSACTION: {
    TIMEOUT: 30000, // 30 seconds
    COMMIT_TIMEOUT: 60000 // 60 seconds
  },
  
  // Retry Configuration
  RETRY: {
    MAX_ATTEMPTS: 3,
    DELAY: 1000 // 1 second
  }
};

// Export configuration
export default API_CONFIG;

// Helper function to get configuration with environment overrides
export const getConfig = () => {
  return {
    ...API_CONFIG,
    NETWORK_CONFIG: {
      ...API_CONFIG.NETWORK_CONFIG,
      CHANNEL_NAME: process.env.CHANNEL_NAME || API_CONFIG.NETWORK_CONFIG.CHANNEL_NAME,
      CHAINCODE_NAME: process.env.CHAINCODE_NAME || API_CONFIG.NETWORK_CONFIG.CHAINCODE_NAME
    }
  };
};

// Helper function to get API base URL
export const getApiBaseUrl = () => {
  return process.env.REACT_APP_API_URL || 'http://localhost:3001';
};
