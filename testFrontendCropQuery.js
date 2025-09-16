// Test the frontend blockchainService getCrop function
const { getCrop } = require('./src/services/blockchainService');

async function testFrontendCropQuery() {
  try {
    console.log("Testing frontend getCrop function...");
    
    // Test with a crop ID that should exist in MongoDB
    const cropId = "CROP-1758041538472";
    const result = await getCrop(cropId);
    
    if (result.success) {
      console.log("Crop query successful:", result.data);
    } else {
      console.log("Crop query failed:", result.error);
    }
  } catch (error) {
    console.error("Error:", error.message);
  }
}

testFrontendCropQuery();
