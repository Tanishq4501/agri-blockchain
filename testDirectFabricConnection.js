const fs = require('fs');
const path = require('path');
const { Gateway, Wallets } = require('fabric-network');

async function testDirectConnection() {
  try {
    console.log("Testing direct Fabric connection...");
    
    // Create wallet
    const walletPath = path.join(__dirname, 'backend/config/fabric/wallet');
    const wallet = await Wallets.newFileSystemWallet(walletPath);
    console.log(`Wallet created at: ${walletPath}`);
    
    // Check if admin identity exists
    const adminIdentity = await wallet.get('admin');
    if (!adminIdentity) {
      console.log('Admin identity not found, creating it...');
      
      // Load connection profile
      const ccpPath = path.resolve(__dirname, 'backend/config/fabric/connection-profile.json');
      const ccpJSON = fs.readFileSync(ccpPath, 'utf8');
      const ccp = JSON.parse(ccpJSON);
      
      // Load admin credentials
      const certPath = path.resolve(__dirname, '..', 'fabric/fabric-samples/test-network/organizations/peerOrganizations/org1.example.com/users/Admin@org1.example.com/msp/signcerts/Admin@org1.example.com-cert.pem');
      const keyPath = path.resolve(__dirname, '..', 'fabric/fabric-samples/test-network/organizations/peerOrganizations/org1.example.com/users/Admin@org1.example.com/msp/keystore/priv_sk');
      
      const certificate = fs.readFileSync(certPath, 'utf8');
      const privateKey = fs.readFileSync(keyPath, 'utf8');
      
      const identity = {
        credentials: {
          certificate,
          privateKey
        },
        mspId: 'Org1MSP',
        type: 'X.509'
      };
      
      await wallet.put('admin', identity);
      console.log('Admin identity enrolled successfully');
    } else {
      console.log('Admin identity found in wallet');
    }
    
    // Create gateway
    const gateway = new Gateway();
    
    // Load connection profile
    const ccpPath = path.resolve(__dirname, 'backend/config/fabric/connection-profile.json');
    const ccpJSON = fs.readFileSync(ccpPath, 'utf8');
    const ccp = JSON.parse(ccpJSON);
    
    // Connect to gateway
    await gateway.connect(ccp, {
      wallet,
      identity: 'admin',
      discovery: {
        enabled: true,
        asLocalhost: true
      }
    });
    
    console.log('Gateway connected successfully');
    
    // Get network and contract
    const network = await gateway.getNetwork('mychannel');
    const contract = network.getContract('supplychain');
    
    console.log('Network and contract retrieved successfully');
    console.log('Fabric connection test completed successfully!');
    
    // Close gateway
    gateway.disconnect();
  } catch (error) {
    console.error('Direct Fabric connection test failed:', error.message);
    console.error('Error stack:', error.stack);
  }
}

testDirectConnection();
