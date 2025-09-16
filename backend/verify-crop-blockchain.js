// Crop Blockchain Verification Tool
// Use this to check if a crop is registered on the blockchain

const { initializeFabric, getCrop, getCropHistory, closeFabricConnection } = require('./services/fabricService');

async function verifyCropOnBlockchain(cropID) {
  console.log(`🔍 Verifying crop ${cropID} on blockchain...`);
  console.log('=' .repeat(50));
  
  try {
    // Initialize Fabric connection
    await initializeFabric();
    console.log('✅ Connected to blockchain');
    
    // Check if crop exists on blockchain
    const cropResult = await getCrop(cropID);
    
    if (cropResult.success) {
      console.log('✅ CROP FOUND ON BLOCKCHAIN!');
      console.log('\n📋 Crop Details:');
      console.log('   Crop ID:', cropResult.data.cropID);
      console.log('   Name:', cropResult.data.name);
      console.log('   Farmer ID:', cropResult.data.farmerID);
      console.log('   Current Owner:', cropResult.data.currentOwner);
      console.log('   Quantity:', cropResult.data.quantity);
      console.log('   Price:', cropResult.data.price);
      console.log('   Status:', cropResult.data.status);
      console.log('   Created:', cropResult.data.createdAt);
      console.log('   Last Updated:', cropResult.data.updatedAt);
      
      // Check crop history
      const historyResult = await getCropHistory(cropID);
      if (historyResult.success) {
        console.log('\n📜 Transaction History:');
        if (historyResult.data.length > 0) {
          historyResult.data.forEach((transaction, index) => {
            console.log(`   ${index + 1}. ${transaction.transactionType} - ${transaction.timestamp}`);
          });
        } else {
          console.log('   No transactions recorded yet');
        }
      }
      
      // Check documents
      if (cropResult.data.documents && cropResult.data.documents.length > 0) {
        console.log('\n📄 Attached Documents:');
        cropResult.data.documents.forEach((doc, index) => {
          console.log(`   ${index + 1}. ${doc.docType} - ${doc.docHash}`);
        });
      } else {
        console.log('\n📄 No documents attached');
      }
      
      return true;
    } else {
      console.log('❌ CROP NOT FOUND ON BLOCKCHAIN');
      console.log('   Error:', cropResult.error);
      return false;
    }
    
  } catch (error) {
    console.error('❌ Verification failed:', error.message);
    return false;
  } finally {
    await closeFabricConnection();
  }
}

// Function to verify multiple crops
async function verifyMultipleCrops(cropIDs) {
  console.log(`🔍 Verifying ${cropIDs.length} crops on blockchain...`);
  
  try {
    await initializeFabric();
    
    const results = [];
    for (const cropID of cropIDs) {
      const result = await getCrop(cropID);
      results.push({
        cropID,
        exists: result.success,
        data: result.success ? result.data : null,
        error: result.success ? null : result.error
      });
    }
    
    console.log('\n📊 Verification Summary:');
    results.forEach((result, index) => {
      const status = result.exists ? '✅' : '❌';
      console.log(`   ${index + 1}. ${result.cropID}: ${status} ${result.exists ? 'Found' : 'Not Found'}`);
    });
    
    return results;
    
  } catch (error) {
    console.error('❌ Batch verification failed:', error.message);
    return [];
  } finally {
    await closeFabricConnection();
  }
}

// Command line usage
if (require.main === module) {
  const cropID = process.argv[2];
  
  if (!cropID) {
    console.log('Usage: node verify-crop-blockchain.js <CROP_ID>');
    console.log('Example: node verify-crop-blockchain.js CROP-1758059799561');
    process.exit(1);
  }
  
  verifyCropOnBlockchain(cropID)
    .then(exists => {
      process.exit(exists ? 0 : 1);
    })
    .catch(error => {
      console.error('Error:', error);
      process.exit(1);
    });
}

module.exports = { verifyCropOnBlockchain, verifyMultipleCrops };
