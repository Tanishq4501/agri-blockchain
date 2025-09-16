const { initializeFabric } = require('./backend/services/fabricService');

async function testFabricConnection() {
  try {
    console.log("Testing Fabric connection...");
    await initializeFabric();
    console.log("Fabric connection successful!");
  } catch (error) {
    console.error("Fabric connection failed:", error.message);
    console.error("Error details:", error);
  }
}

testFabricConnection();
