#!/usr/bin/env node
import fetch from 'node-fetch';

/**
 * API Connection Test Script
 * 
 * This script tests the connection between frontend and backend
 * by making requests to the test API endpoints.
 * 
 * Usage: node scripts/test-api.js
 */

// Configuration
const API_BASE_URL = process.env.API_BASE_URL || 'http://localhost:3000';
const API_TEST_ENDPOINT = `${API_BASE_URL}/api/test`;

// Function to test the GET endpoint
async function testGetEndpoint() {
  console.log('🧪 Testing GET /api/test endpoint...');
  
  try {
    const response = await fetch(API_TEST_ENDPOINT);
    if (!response.ok) {
      throw new Error(`HTTP error! Status: ${response.status}`);
    }
    
    const data = await response.json();
    console.log('✅ GET endpoint response:', data);
    
    // Basic validation of the response structure
    if (!data.success || !data.message || !data.data || !Array.isArray(data.data.items)) {
      throw new Error('GET response missing expected fields');
    }
    
    console.log('✅ GET test passed!');
    return true;
  } catch (error) {
    console.error('❌ GET test failed:', error);
    return false;
  }
}

// Function to test the POST endpoint
async function testPostEndpoint() {
  console.log('🧪 Testing POST /api/test endpoint...');
  
  try {
    const testPayload = { message: 'Test message from CLI script', testId: Date.now() };
    
    const response = await fetch(API_TEST_ENDPOINT, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(testPayload),
    });
    
    if (!response.ok) {
      throw new Error(`HTTP error! Status: ${response.status}`);
    }
    
    const data = await response.json();
    console.log('✅ POST endpoint response:', data);
    
    // Validate that the echoed data matches what we sent
    if (!data.success || !data.receivedData || data.receivedData.message !== testPayload.message) {
      throw new Error('POST response missing expected fields or data mismatch');
    }
    
    console.log('✅ POST test passed!');
    return true;
  } catch (error) {
    console.error('❌ POST test failed:', error);
    return false;
  }
}

// Run all tests
async function runAllTests() {
  console.log('========= API Connection Tests =========');
  console.log(`API Base URL: ${API_BASE_URL}`);
  
  const getTestPassed = await testGetEndpoint();
  const postTestPassed = await testPostEndpoint();
  
  console.log('========= Test Results =========');
  console.log(`GET Test: ${getTestPassed ? '✅ PASSED' : '❌ FAILED'}`);
  console.log(`POST Test: ${postTestPassed ? '✅ PASSED' : '❌ FAILED'}`);
  console.log(`Overall: ${getTestPassed && postTestPassed ? '✅ ALL TESTS PASSED' : '❌ SOME TESTS FAILED'}`);
  
  // Exit with appropriate code
  process.exit(getTestPassed && postTestPassed ? 0 : 1);
}

// Run the tests
runAllTests().catch(error => {
  console.error('Error running tests:', error);
  process.exit(1);
}); 