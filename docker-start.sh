#!/bin/sh

# Startup script with logging and verification

echo "========================================"
echo "Riverstone Labs Website - Starting up..."
echo "========================================"
echo "NODE_ENV: $NODE_ENV"
echo "PORT: $PORT"
echo "HOSTNAME: $HOSTNAME"
echo ""

# Verify server.js exists
if [ ! -f ./server.js ]; then
  echo "ERROR: server.js not found!"
  echo "Contents of /app:"
  ls -la /app
  exit 1
fi

echo "✓ server.js found"
echo "✓ Starting Next.js server..."
echo ""

# Start the server
exec node server.js
