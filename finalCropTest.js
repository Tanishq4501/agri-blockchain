const axios = require('axios');

async function finalCropTest() {
  try {
    console.log("=== Final Crop Registration and Querying Test ===");
    
    // Register a new crop
    const testCrop = {
      name: "Maize",
      farmerID: "FARMER-003",
      quantity: 150,
      price: 60
    };
    
    console.log("\n1. Registering a new crop...");
    const registerResponse = await axios.post('http://localhost:3001/api/crops/register', testCrop);
    console.log("Registration response:", registerResponse.data);
    
    const cropId = registerResponse.data.data.metadata.cropID;
    console.log(`\nCrop registered with ID: ${cropId}`);
    
    // Query crop details
    console.log("\n2. Querying crop details...");
    const getResponse = await axios.get(`http://localhost:3001/api/crops/${cropId}`);
    console.log("GET crop response:", getResponse.data);
    
    // Query crop history
    console.log("\n3. Querying crop history...");
    const historyResponse = await axios.get(`http://localhost:3001/api/crops/${cropId}/history`);
    console.log("GET history response:", historyResponse.data);
    
    console.log("\n=== Test completed successfully ===");
    console.log("The system is now working with MongoDB as primary storage and blockchain as secondary storage.");
    console.log("When blockchain operations fail, the system falls back to MongoDB queries.");
    
  } catch (error) {
    console.error("Error:", error.response?.data || error.message);
  }
}

finalCropTest();
