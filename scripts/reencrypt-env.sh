#!/bin/bash

# Re-encrypt environment variables with the correct master password
echo "🔐 Re-encrypting environment variables..."

# Set the master password
export ENCRYPTION_MASTER_PASSWORD="d1be2d4516fc5facdcddac41db055a833944f2bfff46adefb71ebaeb37439b42"

# Create backup of current .env.local
cp .env.local .env.local.backup
echo "✅ Created backup at .env.local.backup"

# Read the original API keys from backup
OPENAI_API_KEY=$(grep "^OPENAI_API_KEY=" .env.local.backup | cut -d '=' -f2)
GOOGLE_AI_API_KEY=$(grep "^GOOGLE_AI_API_KEY=" .env.local.backup | cut -d '=' -f2)

# Re-encrypt the API keys
echo "🔄 Re-encrypting API keys..."
node -e "
const { EnvironmentEncryption } = require('./utils/encryption');
const fs = require('fs');

const masterPassword = process.env.ENCRYPTION_MASTER_PASSWORD;
const openaiKey = process.argv[1];
const googleKey = process.argv[2];

let envContent = '# Secure Environment Configuration\n';
envContent += '# API keys are encrypted for security\n\n';

envContent += '# Set this in your system environment (NOT in this file):\n';
envContent += '# export ENCRYPTION_MASTER_PASSWORD=d1be2d4516fc5facdcddac41db055a833944f2bfff46adefb71ebaeb37439b42\n\n';

if (openaiKey) {
  const encrypted = EnvironmentEncryption.encrypt(openaiKey, masterPassword);
  envContent += \`OPENAI_API_KEY_ENCRYPTED=\${encrypted}\n\`;
}

if (googleKey) {
  const encrypted = EnvironmentEncryption.encrypt(googleKey, masterPassword);
  envContent += \`GOOGLE_AI_API_KEY_ENCRYPTED=\${encrypted}\n\`;
}

envContent += '\n# Non-sensitive configuration\n';
envContent += 'API_PRIORITY=openai,google,huggingface,cohere,groq\n';
envContent += 'NEXT_PUBLIC_APP_URL=http://localhost:3001\n';

fs.writeFileSync('.env.local', envContent);
" "$OPENAI_API_KEY" "$GOOGLE_AI_API_KEY"

echo "✅ Environment variables re-encrypted!"
echo "🚀 You can now start the development server using: npm run dev:secure"
