// Fabric Gateway Configuration
const { Gateway, Wallets } = require('fabric-network');
const path = require('path');
const fs = require('fs');

// Load connection profile
const ccpPath = path.resolve(__dirname, 'connection-profile.json');
const ccpJSON = fs.readFileSync(ccpPath, 'utf8');
const ccp = JSON.parse(ccpJSON);

// Gateway configuration
const gatewayConfig = {
  discovery: {
    enabled: false,
    asLocalhost: true // Set to false for production
  },
  eventHandlerOptions: {
    commitTimeout: 300,
    strategy: 'MSPID_SCOPE_ANYFORTX'
  },
  queryHandlerOptions: {
    timeout: 30,
    strategy: 'MSPID_SCOPE_ROUND_ROBIN'
  }
};

// Create gateway connection
const createGateway = async (wallet, identityLabel) => {
  try {
    const gateway = new Gateway();
    
    await gateway.connect(ccp, {
      wallet,
      identity: identityLabel,
      discovery: gatewayConfig.discovery
    });
    
    console.log(`Gateway connected with identity: ${identityLabel}`);
    return gateway;
  } catch (error) {
    console.error('Error creating gateway:', error);
    throw error;
  }
};

// Get network and contract
const getNetworkAndContract = async (gateway, channelName, chaincodeName) => {
  try {
    const network = await gateway.getNetwork(channelName);
    const contract = network.getContract(chaincodeName);
    
    console.log(`Connected to network: ${channelName}, contract: ${chaincodeName}`);
    return { network, contract };
  } catch (error) {
    console.error('Error getting network and contract:', error);
    throw error;
  }
};

module.exports = {
  gatewayConfig,
  createGateway,
  getNetworkAndContract
};
