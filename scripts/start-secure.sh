#!/bin/bash

# Secure startup script for StockGPT app
echo "🚀 Starting StockGPT with secure environment..."

# Check if master password is set
if [ -z "$ENCRYPTION_MASTER_PASSWORD" ]; then
    echo "❌ ENCRYPTION_MASTER_PASSWORD not found in environment"
    echo "💡 Please set it using:"
    echo "   export ENCRYPTION_MASTER_PASSWORD=d1be2d4516fc5facdcddac41db055a833944f2bfff46adefb71ebaeb37439b42"
    echo ""
    echo "🔧 Auto-setting for this session..."
    export ENCRYPTION_MASTER_PASSWORD=d1be2d4516fc5facdcddac41db055a833944f2bfff46adefb71ebaeb37439b42
fi

# Check if port 3000 is available, use 3001 if not
PORT=3000
if lsof -Pi :$PORT -sTCP:LISTEN -t >/dev/null ; then
    echo "⚠️  Port $PORT is in use, switching to 3001"
    PORT=3001
fi

# Update browserslist database
echo "📦 Updating browserslist database..."
npx browserslist@latest --update-db

# Start the development server
echo "🌐 Starting Next.js on port $PORT..."
echo "🔒 Using encrypted API keys for security"

if [ $PORT -eq 3001 ]; then
    next dev -p 3001
else
    next dev
fi
