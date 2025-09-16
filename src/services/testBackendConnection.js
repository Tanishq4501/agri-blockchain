/**
 * Test script to verify frontend-backend connection
 */

import { registerUser, addCropPrice, getCropAnalytics } from './backendService';

/**
 * Test backend connection
 */
export const testBackendConnection = async () => {
  console.log('Testing frontend-backend connection...');
  
  try {
    // Test user registration
    console.log('Testing user registration...');
    const userResult = await registerUser({
      userID: 'frontend-test-user',
      role: 'Farmer',
      name: 'Frontend Test User',
      contactInfo: {
        email: 'frontend@test.com'
      }
    });
    
    console.log('User registration result:', userResult);
    
    // Test crop price addition
    console.log('Testing crop price addition...');
    const priceResult = await addCropPrice('frontend-test-crop', {
      price: 150.75,
      notes: 'Test price from frontend'
    });
    
    console.log('Crop price addition result:', priceResult);
    
    // Test crop analytics retrieval
    console.log('Testing crop analytics retrieval...');
    const analyticsResult = await getCropAnalytics('frontend-test-crop');
    
    console.log('Crop analytics result:', analyticsResult);
    
    console.log('All tests completed successfully!');
    return true;
  } catch (error) {
    console.error('Test failed:', error);
    return false;
  }
};

export default testBackendConnection;
