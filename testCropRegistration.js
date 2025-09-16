const axios = require('axios');

// Test crop data
const testCrop = {
  name: "Wheat",
  farmerID: "FARMER-001",
  quantity: 100,
  price: 50
};

async function testCropRegistration() {
  try {
    console.log("Registering a new crop...");
    const registerResponse = await axios.post('http://localhost:3001/api/crops/register', testCrop);
    console.log("Registration response:", registerResponse.data);
    
    const cropId = registerResponse.data.data.metadata.cropID;
    console.log(`\nCrop registered with ID: ${cropId}`);
    
    // Wait a moment for the blockchain registration to complete
    await new Promise(resolve => setTimeout(resolve, 2000));
    
    console.log("\nChecking if crop exists on blockchain...");
    try {
      const getResponse = await axios.get(`http://localhost:3001/api/crops/${cropId}`);
      console.log("Blockchain crop data:", getResponse.data);
    } catch (error) {
      console.log("Crop not found on blockchain:", error.response?.data || error.message);
    }
    
    console.log("\nChecking crop history on blockchain...");
    try {
      const historyResponse = await axios.get(`http://localhost:3001/api/crops/${cropId}/history`);
      console.log("Blockchain crop history:", historyResponse.data);
    } catch (error) {
      console.log("Crop history not found on blockchain:", error.response?.data || error.message);
    }
  } catch (error) {
    console.error("Error:", error.response?.data || error.message);
  }
}

testCropRegistration();
