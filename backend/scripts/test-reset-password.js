const jwt = require('jsonwebtoken');

// Test the JWT token from the email link
const token = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VySWQiOjE5LCJlbWFpbCI6ImpzaWxtYXJvODQ2ODZAbGljZW8uZWR1LnBoIiwidHlwZSI6InBhc3N3b3JkLXJlc2V0IiwiaWF0IjoxNzY1NzM1NjQ2LCJleHAiOjE3NjU3MzkyNDZ9.DM8q2lYZAOxuSXVk_JqCz9_u9mRF_XGbircYqI9Eqhw";

try {
  console.log('🔍 Testing JWT token from email link...\n');
  
  // Decode without verification first to see the payload
  const decoded = jwt.decode(token);
  console.log('📋 Token payload:', JSON.stringify(decoded, null, 2));
  
  // Check if token is expired
  const now = Math.floor(Date.now() / 1000);
  const isExpired = decoded.exp < now;
  
  console.log('\n⏰ Token timing:');
  console.log('   Current time:', new Date(now * 1000).toISOString());
  console.log('   Token expires:', new Date(decoded.exp * 1000).toISOString());
  console.log('   Is expired:', isExpired ? '❌ YES' : '✅ NO');
  
  if (isExpired) {
    console.log('\n⚠️  Token is expired! User needs to request a new password reset.');
  } else {
    console.log('\n✅ Token is valid and not expired.');
  }
  
  // Try to verify with JWT_SECRET (this will fail if we don't have the right secret)
  try {
    const verified = jwt.verify(token, process.env.JWT_SECRET);
    console.log('\n🔐 Token verification: ✅ SUCCESS');
    console.log('   User ID:', verified.userId);
    console.log('   Email:', verified.email);
    console.log('   Type:', verified.type);
  } catch (verifyError) {
    console.log('\n🔐 Token verification: ❌ FAILED');
    console.log('   Error:', verifyError.message);
  }
  
} catch (error) {
  console.error('❌ Error testing token:', error.message);
}

console.log('\n🔗 Reset URL: https://capsortustpcdo.vercel.app/reset-password?token=' + token);
console.log('\n📝 To test the reset password page:');
console.log('   1. Visit the URL above');
console.log('   2. Enter a new password');
console.log('   3. Submit the form');
console.log('   4. Check if the password is updated successfully');