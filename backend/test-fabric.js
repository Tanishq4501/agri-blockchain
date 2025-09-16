// Test script for Fabric integration
const { initializeFabric, registerCrop, getCrop } = require('./services/fabricService');

async function testFabricIntegration() {
  try {
    console.log('Testing Fabric integration...');
    
    // Initialize Fabric connection
    await initializeFabric();
    
    // Test crop registration
    console.log('Registering test crop...');
    const cropData = {
      name: 'Test Tomatoes',
      farmerID: 'FARMER-001',
      quantity: 100,
      price: 2.50
    };
    
    const registerResult = await registerCrop(cropData);
    console.log('Registration result:', registerResult);
    
    if (registerResult.success) {
      console.log('Crop registered successfully!');
      
      // Test getting crop details
      console.log('Fetching crop details...');
      const cropResult = await getCrop(registerResult.data.cropID);
      console.log('Crop details:', cropResult);
    }
    
    console.log('Fabric integration test completed successfully!');
  } catch (error) {
    console.error('Fabric integration test failed:', error);
  }
}

testFabricIntegration();
