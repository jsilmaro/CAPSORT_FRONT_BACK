#!/usr/bin/env node

require('dotenv').config();
const emailService = require('../src/services/emailService');

async function testEmail() {
  console.log('🧪 Testing email configuration...\n');

  // Check if email environment variables are set
  const requiredVars = ['SMTP_USER', 'SMTP_PASS'];
  const missingVars = requiredVars.filter(varName => !process.env[varName] || process.env[varName] === 'your-email@gmail.com');

  if (missingVars.length > 0) {
    console.log('❌ Missing email configuration:');
    console.log('Please update your .env file with:');
    console.log('');
    console.log('SMTP_USER="your-actual-email@gmail.com"');
    console.log('SMTP_PASS="your-gmail-app-password"');
    console.log('');
    console.log('📋 To get Gmail App Password:');
    console.log('1. Go to https://myaccount.google.com/security');
    console.log('2. Enable 2-Factor Authentication');
    console.log('3. Go to "App passwords"');
    console.log('4. Generate password for "Mail"');
    console.log('5. Use that password in SMTP_PASS');
    console.log('');
    return;
  }

  console.log('📧 Email configuration found:');
  console.log('SMTP_USER:', process.env.SMTP_USER);
  console.log('SMTP_HOST:', process.env.SMTP_HOST);
  console.log('SMTP_PORT:', process.env.SMTP_PORT);
  console.log('');

  // Test SMTP connection
  console.log('🔌 Testing SMTP connection...');
  const connectionResult = await emailService.testConnection();
  
  if (!connectionResult.success) {
    console.log('❌ SMTP connection failed:', connectionResult.error);
    console.log('');
    console.log('🔧 Troubleshooting:');
    console.log('1. Check your Gmail App Password is correct');
    console.log('2. Ensure 2-Factor Authentication is enabled');
    console.log('3. Verify your email address is correct');
    console.log('4. Check your internet connection');
    return;
  }

  console.log('✅ SMTP connection successful!');
  console.log('');

  // Test sending email
  const testEmail = process.env.SMTP_USER; // Send to yourself for testing
  const testResetLink = 'http://localhost:3000/reset-password?token=test-token-123';

  console.log(`📤 Sending test email to: ${testEmail}`);
  
  const emailResult = await emailService.sendPasswordResetEmail(
    testEmail,
    testResetLink,
    'Test User'
  );

  if (emailResult.success) {
    console.log('✅ Test email sent successfully!');
    console.log('Message ID:', emailResult.messageId);
    console.log('');
    console.log('📬 Check your inbox for the password reset email.');
  } else {
    console.log('❌ Failed to send test email:', emailResult.error);
  }
}

testEmail();