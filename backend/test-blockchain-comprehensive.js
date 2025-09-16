// Comprehensive Blockchain Functionality Test
// Tests all read and write operations for the agri-blockchain system

const { 
  initializeFabric, 
  registerCrop, 
  getCrop, 
  getCropHistory, 
  registerUser, 
  transferOwnership, 
  makePayment, 
  attachDoc,
  closeFabricConnection 
} = require('./services/fabricService');

// Test data
const testCropData = {
  name: 'Organic Tomatoes',
  farmerID: 'FARMER-TEST-001',
  quantity: 100,
  price: 50.75
};

const testUserData = {
  role: 'Farmer',
  name: 'Test Farmer'
};

let testCropID = null;
let testUserID = null;

// Test functions
async function testInitialization() {
  console.log('\n=== Testing Fabric Initialization ===');
  try {
    await initializeFabric();
    console.log('✅ Fabric initialization successful');
    return true;
  } catch (error) {
    console.error('❌ Fabric initialization failed:', error.message);
    return false;
  }
}

async function testUserRegistration() {
  console.log('\n=== Testing User Registration ===');
  try {
    const result = await registerUser(testUserData);
    if (result.success) {
      testUserID = result.data.userID;
      console.log('✅ User registration successful:', testUserID);
      console.log('   User data:', JSON.stringify(result.data, null, 2));
      return true;
    } else {
      console.error('❌ User registration failed:', result.error);
      return false;
    }
  } catch (error) {
    console.error('❌ User registration error:', error.message);
    return false;
  }
}

async function testCropRegistration() {
  console.log('\n=== Testing Crop Registration ===');
  try {
    const result = await registerCrop(testCropData);
    if (result.success) {
      testCropID = result.data.cropID;
      console.log('✅ Crop registration successful:', testCropID);
      console.log('   Crop data:', JSON.stringify(result.data, null, 2));
      return true;
    } else {
      console.error('❌ Crop registration failed:', result.error);
      return false;
    }
  } catch (error) {
    console.error('❌ Crop registration error:', error.message);
    return false;
  }
}

async function testCropQuery() {
  console.log('\n=== Testing Crop Query ===');
  try {
    if (!testCropID) {
      console.error('❌ No crop ID available for testing');
      return false;
    }
    
    const result = await getCrop(testCropID);
    if (result.success) {
      console.log('✅ Crop query successful');
      console.log('   Retrieved crop:', JSON.stringify(result.data, null, 2));
      return true;
    } else {
      console.error('❌ Crop query failed:', result.error);
      return false;
    }
  } catch (error) {
    console.error('❌ Crop query error:', error.message);
    return false;
  }
}

async function testCropHistoryQuery() {
  console.log('\n=== Testing Crop History Query ===');
  try {
    if (!testCropID) {
      console.error('❌ No crop ID available for testing');
      return false;
    }
    
    const result = await getCropHistory(testCropID);
    if (result.success) {
      console.log('✅ Crop history query successful');
      console.log('   History entries:', JSON.stringify(result.data, null, 2));
      return true;
    } else {
      console.error('❌ Crop history query failed:', result.error);
      return false;
    }
  } catch (error) {
    console.error('❌ Crop history query error:', error.message);
    return false;
  }
}

async function testDocumentAttachment() {
  console.log('\n=== Testing Document Attachment ===');
  try {
    if (!testCropID) {
      console.error('❌ No crop ID available for testing');
      return false;
    }
    
    const docHash = 'QmTestHash123456789';
    const docType = 'certificate';
    
    const result = await attachDoc(testCropID, docHash, docType);
    if (result.success) {
      console.log('✅ Document attachment successful');
      console.log('   Message:', result.message);
      return true;
    } else {
      console.error('❌ Document attachment failed:', result.error);
      return false;
    }
  } catch (error) {
    console.error('❌ Document attachment error:', error.message);
    return false;
  }
}

async function testPaymentRecording() {
  console.log('\n=== Testing Payment Recording ===');
  try {
    if (!testCropID || !testUserID) {
      console.error('❌ Missing crop ID or user ID for testing');
      return false;
    }
    
    const amount = 5075; // 100 * 50.75
    
    const result = await makePayment(testCropID, testUserID, amount);
    if (result.success) {
      console.log('✅ Payment recording successful');
      console.log('   Message:', result.message);
      return true;
    } else {
      console.error('❌ Payment recording failed:', result.error);
      return false;
    }
  } catch (error) {
    console.error('❌ Payment recording error:', error.message);
    return false;
  }
}

async function testOwnershipTransfer() {
  console.log('\n=== Testing Ownership Transfer ===');
  try {
    if (!testCropID) {
      console.error('❌ No crop ID available for testing');
      return false;
    }
    
    // First register a distributor user
    const distributorData = {
      role: 'Distributor',
      name: 'Test Distributor'
    };
    
    const distributorResult = await registerUser(distributorData);
    if (!distributorResult.success) {
      console.error('❌ Failed to register distributor for transfer test:', distributorResult.error);
      return false;
    }
    
    const distributorID = distributorResult.data.userID;
    console.log('   Registered distributor:', distributorID);
    
    // Transfer ownership from farmer to distributor
    const result = await transferOwnership(testCropID, testCropData.farmerID, distributorID);
    if (result.success) {
      console.log('✅ Ownership transfer successful');
      console.log('   Message:', result.message);
      return true;
    } else {
      console.error('❌ Ownership transfer failed:', result.error);
      return false;
    }
  } catch (error) {
    console.error('❌ Ownership transfer error:', error.message);
    return false;
  }
}

async function runComprehensiveTest() {
  console.log('🚀 Starting Comprehensive Blockchain Functionality Test');
  console.log('=' .repeat(60));
  
  const testResults = [];
  
  // Test 1: Initialize Fabric connection
  testResults.push(await testInitialization());
  
  // Test 2: Register a user
  testResults.push(await testUserRegistration());
  
  // Test 3: Register a crop (write operation)
  testResults.push(await testCropRegistration());
  
  // Test 4: Query crop details (read operation)
  testResults.push(await testCropQuery());
  
  // Test 5: Query crop history (read operation)
  testResults.push(await testCropHistoryQuery());
  
  // Test 6: Attach document (write operation)
  testResults.push(await testDocumentAttachment());
  
  // Test 7: Record payment (write operation)
  testResults.push(await testPaymentRecording());
  
  // Test 8: Transfer ownership (write operation)
  testResults.push(await testOwnershipTransfer());
  
  // Test 9: Final crop query to verify all changes
  console.log('\n=== Final Verification Query ===');
  if (testCropID) {
    const finalResult = await getCrop(testCropID);
    if (finalResult.success) {
      console.log('✅ Final crop state verification successful');
      console.log('   Final crop data:', JSON.stringify(finalResult.data, null, 2));
      testResults.push(true);
    } else {
      console.error('❌ Final verification failed:', finalResult.error);
      testResults.push(false);
    }
  } else {
    testResults.push(false);
  }
  
  // Summary
  console.log('\n' + '=' .repeat(60));
  console.log('📊 TEST SUMMARY');
  console.log('=' .repeat(60));
  
  const passedTests = testResults.filter(result => result === true).length;
  const totalTests = testResults.length;
  
  console.log(`✅ Passed: ${passedTests}/${totalTests} tests`);
  console.log(`❌ Failed: ${totalTests - passedTests}/${totalTests} tests`);
  
  if (passedTests === totalTests) {
    console.log('🎉 ALL BLOCKCHAIN FUNCTIONALITY IS WORKING PROPERLY!');
  } else {
    console.log('⚠️  Some blockchain operations failed. Check the logs above for details.');
  }
  
  // Close connection
  await closeFabricConnection();
  
  return passedTests === totalTests;
}

// Run the test
if (require.main === module) {
  runComprehensiveTest()
    .then(success => {
      process.exit(success ? 0 : 1);
    })
    .catch(error => {
      console.error('❌ Test execution failed:', error);
      process.exit(1);
    });
}

module.exports = { runComprehensiveTest };
