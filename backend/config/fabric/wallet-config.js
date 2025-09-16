// Fabric Wallet Configuration
const path = require('path');
const { Wallets } = require('fabric-network');

// Create wallet path
const walletPath = path.join(__dirname, 'wallet');

// Wallet configuration
const walletConfig = {
  path: walletPath,
  type: 'filesystem' // or 'in-memory' for development
};

// Export wallet functions
const createWallet = async () => {
  try {
    const wallet = await Wallets.newFileSystemWallet(walletPath);
    console.log(`Wallet created at: ${walletPath}`);
    return wallet;
  } catch (error) {
    console.error('Error creating wallet:', error);
    throw error;
  }
};

module.exports = {
  walletConfig,
  createWallet
};
