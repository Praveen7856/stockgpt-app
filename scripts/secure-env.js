#!/usr/bin/env node

const crypto = require('crypto');
const fs = require('fs');
const path = require('path');

class EnvironmentEncryption {
  static encrypt(value, masterPassword) {
    const salt = crypto.randomBytes(16).toString('hex');
    const iv = crypto.randomBytes(16);
    const key = crypto.pbkdf2Sync(masterPassword, salt, 100000, 32, 'sha256');
    
    const cipher = crypto.createCipheriv('aes-256-cbc', key, iv);
    let encrypted = cipher.update(value, 'utf8', 'hex');
    encrypted += cipher.final('hex');
    
    return `${salt}:${iv.toString('hex')}:${encrypted}`;
  }
  
  static decrypt(encryptedValue, masterPassword) {
    const [salt, ivHex, encrypted] = encryptedValue.split(':');
    const iv = Buffer.from(ivHex, 'hex');
    const key = crypto.pbkdf2Sync(masterPassword, salt, 100000, 32, 'sha256');
    
    const decipher = crypto.createDecipheriv('aes-256-cbc', key, iv);
    let decrypted = decipher.update(encrypted, 'hex', 'utf8');
    decrypted += decipher.final('utf8');
    
    return decrypted;
  }
  
  static generateMasterPassword() {
    return crypto.randomBytes(32).toString('hex');
  }
  
  static maskValue(value, visibleChars = 4) {
    if (!value || value.length <= visibleChars * 2) {
      return '*'.repeat(8);
    }
    const start = value.substring(0, visibleChars);
    const end = value.substring(value.length - visibleChars);
    const middle = '*'.repeat(Math.max(8, value.length - visibleChars * 2));
    return `${start}${middle}${end}`;
  }
}

function main() {
  console.log('🔐 Securing API Keys');
  console.log('====================\n');

  // Generate or get master password
  let masterPassword = process.env.ENCRYPTION_MASTER_PASSWORD;
  if (!masterPassword) {
    masterPassword = EnvironmentEncryption.generateMasterPassword();
    console.log('⚠️  Generated new master password. Store this securely:');
    console.log(`ENCRYPTION_MASTER_PASSWORD=${masterPassword}\n`);
    console.log('Add this to your system environment variables (not in .env files)\n');
  }

  // Read current .env.local
  const envPath = path.join(process.cwd(), '.env.local');
  if (!fs.existsSync(envPath)) {
    console.error('❌ .env.local file not found');
    return;
  }

  const envContent = fs.readFileSync(envPath, 'utf8');
  const lines = envContent.split('\n');
  
  console.log('🔍 Current API keys (masked):');
  
  const sensitiveKeys = ['OPENAI_API_KEY', 'GOOGLE_AI_API_KEY', 'HUGGINGFACE_API_KEY', 'COHERE_API_KEY', 'GROQ_API_KEY'];
  const keyValues = {};
  
  lines.forEach(line => {
    if (line.includes('=') && !line.startsWith('#')) {
      const [key, ...valueParts] = line.split('=');
      const value = valueParts.join('=');
      
      if (sensitiveKeys.includes(key) && value) {
        keyValues[key] = value;
        console.log(`  ${key}: ${EnvironmentEncryption.maskValue(value)}`);
      }
    }
  });
  
  console.log('\n🔒 Encrypting keys...\n');
  
  // Create secure .env.local
  const secureEnvLines = [
    '# Secure Environment Configuration',
    '# API keys are encrypted for security',
    '',
    '# Set this in your system environment (NOT in this file):',
    `# export ENCRYPTION_MASTER_PASSWORD=${masterPassword}`,
    ''
  ];
  
  Object.entries(keyValues).forEach(([key, value]) => {
    const encrypted = EnvironmentEncryption.encrypt(value, masterPassword);
    secureEnvLines.push(`${key}_ENCRYPTED=${encrypted}`);
    console.log(`✅ Encrypted ${key}`);
  });
  
  secureEnvLines.push('');
  secureEnvLines.push('# Non-sensitive configuration');
  secureEnvLines.push('API_PRIORITY=openai,google,huggingface,cohere,groq');
  secureEnvLines.push('NEXT_PUBLIC_APP_URL=http://localhost:3001');
  
  // Backup original file
  fs.copyFileSync(envPath, `${envPath}.backup`);
  console.log('📁 Backed up original .env.local to .env.local.backup');
  
  // Write secure version
  fs.writeFileSync(envPath, secureEnvLines.join('\n'));
  console.log('✅ Created secure .env.local with encrypted keys');
  
  console.log('\n🎯 Next Steps:');
  console.log('1. Add the master password to your system environment:');
  console.log(`   export ENCRYPTION_MASTER_PASSWORD=${masterPassword}`);
  console.log('2. Add .env.local.backup to .gitignore');
  console.log('3. Never commit the master password to version control');
  console.log('4. Store the master password securely (password manager, etc.)');
}

if (require.main === module) {
  main();
}

module.exports = { EnvironmentEncryption };
