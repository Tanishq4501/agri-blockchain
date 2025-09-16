// Fix Crop Registration - Register existing MongoDB crop on blockchain
const { initializeFabric, registerCrop, closeFabricConnection } = require('./services/fabricService');

async function fixCropRegistration(cropID, cropDetails) {
  console.log(`🔧 Fixing registration for crop ${cropID}...`);
  console.log('=' .repeat(50));
  
  try {
    // Initialize Fabric connection
    await initializeFabric();
    console.log('✅ Connected to blockchain');
    
    // Prepare crop data with required fields
    const cropData = {
      name: cropDetails.name || cropDetails.cropType || 'Unknown Crop',
      farmerID: cropDetails.farmerID || 'FARMER-001',
      quantity: cropDetails.quantity || 1,
      price: cropDetails.price || 0
    };
    
    console.log('📋 Registering with data:', cropData);
    
    // Register crop on blockchain with the existing ID
    const result = await registerCrop(cropData);
    
    if (result.success) {
      console.log('✅ CROP SUCCESSFULLY REGISTERED ON BLOCKCHAIN!');
      console.log('   Blockchain Crop ID:', result.data.cropID);
      console.log('   Name:', result.data.name);
      console.log('   Farmer ID:', result.data.farmerID);
      console.log('   Quantity:', result.data.quantity);
      console.log('   Price:', result.data.price);
      console.log('   Status:', result.data.status);
      return result.data;
    } else {
      console.error('❌ Failed to register on blockchain:', result.error);
      return null;
    }
    
  } catch (error) {
    console.error('❌ Registration failed:', error.message);
    return null;
  } finally {
    await closeFabricConnection();
  }
}

// Interactive crop registration
async function interactiveFixRegistration(cropID) {
  const readline = require('readline');
  const rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout
  });
  
  const question = (prompt) => new Promise(resolve => rl.question(prompt, resolve));
  
  try {
    console.log(`🔧 Interactive fix for crop ${cropID}`);
    console.log('Please provide the missing crop details:\n');
    
    const name = await question('Crop Name (e.g., "Organic Tomatoes"): ');
    const quantity = await question('Quantity (e.g., 100): ');
    const price = await question('Price per unit (e.g., 50.75): ');
    const farmerID = await question('Farmer ID (or press Enter for default): ') || 'FARMER-001';
    
    const cropDetails = {
      name: name.trim(),
      quantity: parseFloat(quantity) || 1,
      price: parseFloat(price) || 0,
      farmerID: farmerID.trim()
    };
    
    rl.close();
    
    return await fixCropRegistration(cropID, cropDetails);
    
  } catch (error) {
    rl.close();
    console.error('❌ Interactive registration failed:', error.message);
    return null;
  }
}

// Command line usage
if (require.main === module) {
  const cropID = process.argv[2];
  const mode = process.argv[3];
  
  if (!cropID) {
    console.log('Usage:');
    console.log('  node fix-crop-registration.js <CROP_ID> interactive');
    console.log('  node fix-crop-registration.js CROP-1758060098187 interactive');
    process.exit(1);
  }
  
  if (mode === 'interactive') {
    interactiveFixRegistration(cropID)
      .then(result => {
        process.exit(result ? 0 : 1);
      })
      .catch(error => {
        console.error('Error:', error);
        process.exit(1);
      });
  } else {
    // Quick fix with default values
    const defaultCropDetails = {
      name: 'Registered Crop',
      quantity: 1,
      price: 0,
      farmerID: 'FARMER-001'
    };
    
    fixCropRegistration(cropID, defaultCropDetails)
      .then(result => {
        process.exit(result ? 0 : 1);
      })
      .catch(error => {
        console.error('Error:', error);
        process.exit(1);
      });
  }
}

module.exports = { fixCropRegistration, interactiveFixRegistration };
