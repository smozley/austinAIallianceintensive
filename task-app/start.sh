#!/bin/bash

echo "🚀 Starting Task Management App..."
echo ""

# Check if Node.js is installed
if ! command -v node &> /dev/null; then
    echo "❌ Node.js is not installed. Please install Node.js first."
    exit 1
fi

# Check if dependencies are installed
if [ ! -d "server/node_modules" ]; then
    echo "📦 Installing server dependencies..."
    cd server && npm install && cd ..
fi

if [ ! -d "client/node_modules" ]; then
    echo "📦 Installing client dependencies..."
    cd client && npm install && cd ..
fi

echo "🔧 Starting backend server..."
cd server
node server.js &
SERVER_PID=$!
cd ..

echo "⏳ Waiting for server to start..."
sleep 3

echo "🌐 Starting frontend application..."
echo "📱 Frontend will be available at: http://localhost:3000"
echo "🔌 Backend API is running at: http://localhost:5000"
echo ""
echo "Press Ctrl+C to stop both applications"
echo ""

cd client
npm start

# Cleanup: Kill server when frontend stops
kill $SERVER_PID 2>/dev/null