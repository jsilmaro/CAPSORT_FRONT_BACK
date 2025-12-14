#!/usr/bin/env node

const fs = require('fs');
const path = require('path');

function validateEnvFile(filePath) {
  console.log(`🔍 Validating: ${filePath}`);
  
  if (!fs.existsSync(filePath)) {
    console.log(`❌ File not found: ${filePath}`);
    return false;
  }
  
  const content = fs.readFileSync(filePath, 'utf8');
  const lines = content.split('\n');
  const keys = new Set();
  const duplicates = [];
  
  lines.forEach((line, index) => {
    const trimmed = line.trim();
    
    // Skip comments and empty lines
    if (trimmed.startsWith('#') || trimmed === '') return;
    
    // Extract key from KEY=value format
    const match = trimmed.match(/^([^=]+)=/);
    if (match) {
      const key = match[1].trim();
      
      if (keys.has(key)) {
        duplicates.push({ key, line: index + 1 });
      } else {
        keys.add(key);
      }
    }
  });
  
  if (duplicates.length > 0) {
    console.log(`❌ Found ${duplicates.length} duplicate key(s):`);
    duplicates.forEach(dup => {
      console.log(`   - "${dup.key}" on line ${dup.line}`);
    });
    return false;
  } else {
    console.log(`✅ No duplicate keys found`);
    console.log(`📊 Total unique keys: ${keys.size}`);
    return true;
  }
}

// Validate all env files
const envFiles = [
  '.env',
  '.env.production',
  '.env.example'
];

let allValid = true;

envFiles.forEach(file => {
  const filePath = path.join(__dirname, '..', file);
  const isValid = validateEnvFile(filePath);
  allValid = allValid && isValid;
  console.log('');
});

if (allValid) {
  console.log('🎉 All environment files are valid!');
  process.exit(0);
} else {
  console.log('❌ Some environment files have issues. Please fix them.');
  process.exit(1);
}