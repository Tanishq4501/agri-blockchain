// Core Blockchain Functionality Test
// Tests essential read and write operations

const { 
  initializeFabric, 
  registerCrop, 
  getCrop, 
  getCropHistory, 
  attachDoc,
  closeFabricConnection 
} = require('./services/fabricService');

async function testCoreBlockchainFunctionality() {
  console.log('🚀 Testing Core Blockchain Functionality');
  console.log('=' .repeat(50));
  
  try {
    // Initialize Fabric
    console.log('\n1. Initializing Fabric connection...');
    await initializeFabric();
    console.log('✅ Fabric initialized successfully');
    
    // Test crop registration (write operation)
    console.log('\n2. Testing crop registration (WRITE)...');
    const cropData = {
      name: 'Premium Rice',
      farmerID: 'FARMER-CORE-001',
      quantity: 500,
      price: 75.50
    };
    
    const registerResult = await registerCrop(cropData);
    if (!registerResult.success) {
      throw new Error(`Crop registration failed: ${registerResult.error}`);
    }
    
    const cropID = registerResult.data.cropID;
    console.log('✅ Crop registered successfully:', cropID);
    
    // Test crop query (read operation)
    console.log('\n3. Testing crop query (READ)...');
    const queryResult = await getCrop(cropID);
    if (!queryResult.success) {
      throw new Error(`Crop query failed: ${queryResult.error}`);
    }
    console.log('✅ Crop query successful');
    console.log('   Crop details:', JSON.stringify(queryResult.data, null, 2));
    
    // Test document attachment (write operation)
    console.log('\n4. Testing document attachment (WRITE)...');
    const docResult = await attachDoc(cropID, 'QmCoreTestHash789', 'certificate');
    if (!docResult.success) {
      throw new Error(`Document attachment failed: ${docResult.error}`);
    }
    console.log('✅ Document attached successfully');
    
    // Test crop history query (read operation)
    console.log('\n5. Testing crop history query (READ)...');
    const historyResult = await getCropHistory(cropID);
    if (!historyResult.success) {
      throw new Error(`History query failed: ${historyResult.error}`);
    }
    console.log('✅ Crop history query successful');
    console.log('   History entries:', JSON.stringify(historyResult.data, null, 2));
    
    // Final verification
    console.log('\n6. Final verification...');
    const finalResult = await getCrop(cropID);
    if (!finalResult.success) {
      throw new Error(`Final verification failed: ${finalResult.error}`);
    }
    
    const finalCrop = finalResult.data;
    console.log('✅ Final verification successful');
    console.log('   Documents attached:', finalCrop.documents?.length || 0);
    
    console.log('\n' + '=' .repeat(50));
    console.log('🎉 ALL CORE BLOCKCHAIN OPERATIONS WORKING!');
    console.log('✅ Write Operations: Crop Registration, Document Attachment');
    console.log('✅ Read Operations: Crop Query, History Query');
    console.log('=' .repeat(50));
    
    return true;
    
  } catch (error) {
    console.error('\n❌ Core blockchain test failed:', error.message);
    return false;
  } finally {
    await closeFabricConnection();
  }
}

// Run the test
if (require.main === module) {
  testCoreBlockchainFunctionality()
    .then(success => {
      process.exit(success ? 0 : 1);
    })
    .catch(error => {
      console.error('❌ Test execution failed:', error);
      process.exit(1);
    });
}

module.exports = { testCoreBlockchainFunctionality };
