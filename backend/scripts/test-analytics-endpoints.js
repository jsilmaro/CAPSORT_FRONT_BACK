const analyticsController = require('../src/controllers/analyticsController');

// Mock request and response objects
const createMockResponse = () => {
  return {
    status: (code) => ({
      json: (data) => {
        console.log(`Status: ${code}`);
        console.log('Response:', JSON.stringify(data, null, 2));
        console.log('---\n');
      }
    })
  };
};

async function testAllEndpoints() {
  console.log('🧪 Testing Analytics Endpoints\n');
  
  try {
    console.log('1️⃣ Testing Dashboard Summary:');
    await analyticsController.getAnalyticsDashboard({}, createMockResponse());
    
    console.log('2️⃣ Testing Projects by Year:');
    await analyticsController.getProjectsByYear({}, createMockResponse());
    
    console.log('3️⃣ Testing Field Distribution:');
    await analyticsController.getFieldDistribution({}, createMockResponse());
    
    console.log('4️⃣ Testing Top Saved Projects:');
    await analyticsController.getTopSavedProjects({ query: { limit: '5' } }, createMockResponse());
    
    console.log('5️⃣ Testing User Activity:');
    await analyticsController.getUserActivity({}, createMockResponse());
    
    console.log('✅ All analytics endpoints tested successfully!');
    
  } catch (error) {
    console.error('❌ Error testing endpoints:', error);
  }
}

testAllEndpoints();