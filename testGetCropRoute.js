const axios = require('axios');

// Test with a crop ID that we know exists in MongoDB from our previous tests
async function testGetCropRoute() {
  try {
    console.log("Testing GET route for crop details...");
    
    // First, register a new crop to ensure we have one in the database
    const testCrop = {
      name: "Rice",
      farmerID: "FARMER-002",
      quantity: 200,
      price: 75
    };
    
    console.log("Registering a new crop...");
    const registerResponse = await axios.post('http://localhost:3001/api/crops/register', testCrop);
    console.log("Registration response:", registerResponse.data);
    
    const cropId = registerResponse.data.data.metadata.cropID;
    console.log(`\nCrop registered with ID: ${cropId}`);
    
    // Now test the GET route for this crop
    console.log("\nTesting GET route for the registered crop...");
    const getResponse = await axios.get(`http://localhost:3001/api/crops/${cropId}`);
    console.log("GET response:", getResponse.data);
    
    // Also test the history route
    console.log("\nTesting GET route for crop history...");
    const historyResponse = await axios.get(`http://localhost:3001/api/crops/${cropId}/history`);
    console.log("History response:", historyResponse.data);
    
  } catch (error) {
    console.error("Error:", error.response?.data || error.message);
  }
}

testGetCropRoute();
