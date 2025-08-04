#!/usr/bin/env node

// Simple environment check script
const fs = require('fs');
const path = require('path');

function checkEnvironment() {
  console.log('🔍 Environment Security Status');
  console.log('==============================\n');

  // Check if .env.local exists
  const envPath = path.join(process.cwd(), '.env.local');
  if (!fs.existsSync(envPath)) {
    console.log('❌ .env.local not found');
    return;
  }

  const envContent = fs.readFileSync(envPath, 'utf8');
  const lines = envContent.split('\n');
  
  let hasEncryptedKeys = false;
  let hasPlainKeys = false;
  
  console.log('📋 API Key Status:');
  
  const sensitiveKeys = ['OPENAI_API_KEY', 'GOOGLE_AI_API_KEY', 'HUGGINGFACE_API_KEY', 'COHERE_API_KEY', 'GROQ_API_KEY'];
  
  lines.forEach(line => {
    if (line.includes('=') && !line.startsWith('#')) {
      const [key] = line.split('=');
      
      if (key.endsWith('_ENCRYPTED')) {
        const baseKey = key.replace('_ENCRYPTED', '');
        if (sensitiveKeys.includes(baseKey)) {
          hasEncryptedKeys = true;
          console.log(`  ✅ ${baseKey}: Encrypted`);
        }
      } else if (sensitiveKeys.includes(key)) {
        hasPlainKeys = true;
        console.log(`  ⚠️  ${key}: Plain text (not secure)`);
      }
    }
  });
  
  console.log('\n📊 Security Summary:');
  console.log(`  Encrypted keys: ${hasEncryptedKeys ? '✅ Yes' : '❌ None'}`);
  console.log(`  Plain text keys: ${hasPlainKeys ? '⚠️  Found' : '✅ None'}`);
  
  // Check master password
  const masterPassword = process.env.ENCRYPTION_MASTER_PASSWORD;
  console.log(`  Master password: ${masterPassword ? '✅ Set' : '❌ Not set'}`);
  
  if (hasEncryptedKeys && masterPassword) {
    console.log('\n🎉 Security Status: GOOD');
    console.log('   Your API keys are encrypted and secure!');
  } else if (hasEncryptedKeys && !masterPassword) {
    console.log('\n⚠️  Security Status: PARTIAL');
    console.log('   Keys are encrypted but master password not set.');
    console.log('   Set it with: export ENCRYPTION_MASTER_PASSWORD=...');
  } else {
    console.log('\n🚨 Security Status: NEEDS ATTENTION');
    console.log('   Run: npm run encrypt-env');
  }
}

checkEnvironment();
