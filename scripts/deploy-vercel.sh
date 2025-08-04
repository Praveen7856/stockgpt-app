#!/bin/bash

# Deploy to Vercel with proper environment variables
# This script helps ensure all required environment variables are set

echo "🚀 Deploying StockGPT to Vercel..."

# Check if Vercel CLI is installed
if ! command -v vercel &> /dev/null; then
    echo "❌ Vercel CLI not found. Installing..."
    npm install -g vercel
fi

# Set the encryption master password as an environment variable in Vercel
echo "🔐 Setting encryption master password..."
vercel env add ENCRYPTION_MASTER_PASSWORD production
vercel env add ENCRYPTION_MASTER_PASSWORD preview
vercel env add ENCRYPTION_MASTER_PASSWORD development

echo "📦 Deploying to Vercel..."
vercel --prod

echo "✅ Deployment complete!"
echo ""
echo "📋 Next steps:"
echo "1. Go to your Vercel dashboard"
echo "2. Navigate to Settings > Environment Variables"
echo "3. Ensure ENCRYPTION_MASTER_PASSWORD is set to: d1be2d4516fc5facdcddac41db055a833944f2bfff46adefb71ebaeb37439b42"
echo "4. Redeploy if necessary"
