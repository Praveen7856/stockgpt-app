#!/usr/bin/env node

// Utility script to encrypt environment variables
const { EnvironmentEncryption } = require('./utils/encryption.ts');

const SENSITIVE_KEYS = [
  'OPENAI_API_KEY',
  'GOOGLE_AI_API_KEY', 
  'HUGGINGFACE_API_KEY',
  'COHERE_API_KEY',
  'GROQ_API_KEY'
];

// Generate a master password for encryption
const masterPassword = EnvironmentEncryption.generateMasterPassword();

function encryptEnvironmentFile() {
  console.log('🔐 Environment Variable Encryption Tool');
  console.log('=====================================\n');

  // Read current .env.local
  const fs = require('fs');
  const path = require('path');
  
  const envPath = path.join(process.cwd(), '.env.local');
  
  if (!fs.existsSync(envPath)) {
    console.error('❌ .env.local file not found');
    process.exit(1);
  }

  const envContent = fs.readFileSync(envPath, 'utf8');
  const lines = envContent.split('\n');
  
  let encryptedLines = [];
  let hasChanges = false;

  console.log('🔍 Processing environment variables...\n');

  lines.forEach(line => {
    if (line.trim() === '' || line.startsWith('#')) {
      encryptedLines.push(line);
      return;
    }

    const [key, ...valueParts] = line.split('=');
    const value = valueParts.join('=');

    if (SENSITIVE_KEYS.includes(key) && value && !EnvironmentEncryption.isEncrypted(value)) {
      const encrypted = EnvironmentEncryption.encrypt(value, masterPassword);
      encryptedLines.push(`${key}=${encrypted}`);
      console.log(`✅ Encrypted: ${key} = ${EnvironmentEncryption.maskValue(value)}`);
      hasChanges = true;
    } else if (SENSITIVE_KEYS.includes(key) && EnvironmentEncryption.isEncrypted(value)) {
      encryptedLines.push(line);
      console.log(`🔒 Already encrypted: ${key}`);
    } else {
      encryptedLines.push(line);
      if (key && value) {
        console.log(`⚪ Unchanged: ${key} = ${value}`);
      }
    }
  });

  if (hasChanges) {
    // Add master password to the file
    encryptedLines.push('');
    encryptedLines.push('# Encryption master password (keep this secure!)');
    encryptedLines.push(`ENCRYPTION_MASTER_PASSWORD=${masterPassword}`);

    // Backup original file
    const backupPath = `${envPath}.backup.${Date.now()}`;
    fs.copyFileSync(envPath, backupPath);
    console.log(`\n💾 Backup created: ${backupPath}`);

    // Write encrypted file
    fs.writeFileSync(envPath, encryptedLines.join('\n'));
    console.log(`\n✨ Environment file encrypted successfully!`);
    console.log(`\n🔑 Master Password: ${masterPassword}`);
    console.log(`   ⚠️  Store this password securely - you'll need it to decrypt values!`);
    
  } else {
    console.log('\n✅ No changes needed - all sensitive values are already encrypted');
  }
}

// Check for command line arguments
const args = process.argv.slice(2);

if (args.includes('--help') || args.includes('-h')) {
  console.log(`
Environment Variable Encryption Tool

Usage:
  npm run encrypt-env        Encrypt sensitive environment variables
  npm run encrypt-env --help Show this help message

This tool will:
1. Backup your current .env.local file
2. Encrypt all sensitive API keys 
3. Add a master password for decryption
4. Show masked values for verification

Sensitive keys that will be encrypted:
${SENSITIVE_KEYS.map(key => `  - ${key}`).join('\n')}
`);
  process.exit(0);
}

if (require.main === module) {
  encryptEnvironmentFile();
}

module.exports = { encryptEnvironmentFile };
