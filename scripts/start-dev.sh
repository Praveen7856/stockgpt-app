#!/bin/bash

# Check if ENCRYPTION_MASTER_PASSWORD is already set
if [ -z "$ENCRYPTION_MASTER_PASSWORD" ]; then
  # Set the master password
  export ENCRYPTION_MASTER_PASSWORD="d1be2d4516fc5facdcddac41db055a833944f2bfff46adefb71ebaeb37439b42"
  echo "✅ ENCRYPTION_MASTER_PASSWORD has been set!"
else
  echo "✅ ENCRYPTION_MASTER_PASSWORD was already set!"
fi

# Print the encryption password (masked)
password_start=${ENCRYPTION_MASTER_PASSWORD:0:8}
password_end=${ENCRYPTION_MASTER_PASSWORD: -8}
echo "🔑 Using master password: ${password_start}...${password_end}"

# Start the development server
echo "🚀 Starting development server..."
next dev
