#!/bin/bash

# ISS Orange - Quick Start Script (Linux/Mac)
# This script helps you set up and run the development environment

echo "🚀 ISS Orange - Development Environment Setup"
echo "============================================="
echo ""

# Check if .env exists
if [ ! -f ".env" ]; then
    echo "⚠️  .env file not found. Creating from .env.example..."
    cp .env.example .env
    echo "✅ Created .env file. Please update it with your configuration."
    echo ""
fi

# Check what the user wants to do
echo "Choose an option:"
echo "1. Install dependencies (npm install for both backend and frontend)"
echo "2. Start with Docker (docker-compose up)"
echo "3. Start locally (run backend and frontend separately)"
echo "4. Install + Start with Docker"
echo "5. Exit"
echo ""

read -p "Enter your choice (1-5): " choice

case $choice in
    1)
        echo ""
        echo "📦 Installing backend dependencies..."
        cd backend
        npm install
        cd ..
        
        echo ""
        echo "📦 Installing frontend dependencies..."
        cd frontend
        npm install
        cd ..
        
        echo ""
        echo "✅ All dependencies installed!"
        echo "Run this script again and choose option 2 or 3 to start the application."
        ;;
    2)
        echo ""
        echo "🐳 Starting with Docker..."
        echo "This will start PostgreSQL, Backend, and Frontend"
        echo ""
        docker-compose up
        ;;
    3)
        echo ""
        echo "💻 Starting locally..."
        echo ""
        echo "Make sure PostgreSQL is running!"
        echo ""
        
        # Start backend in background
        echo "Starting backend..."
        cd backend
        npm run start:dev &
        BACKEND_PID=$!
        cd ..
        
        sleep 3
        
        # Start frontend in background
        echo "Starting frontend..."
        cd frontend
        npm start &
        FRONTEND_PID=$!
        cd ..
        
        echo ""
        echo "✅ Services started!"
        echo "Backend: http://localhost:3000"
        echo "Frontend: http://localhost:4200"
        echo "API Docs: http://localhost:3000/api/docs"
        echo ""
        echo "Press Ctrl+C to stop all services"
        
        # Wait and handle Ctrl+C
        trap "kill $BACKEND_PID $FRONTEND_PID; exit" INT
        wait
        ;;
    4)
        echo ""
        echo "📦 Installing dependencies..."
        
        cd backend
        npm install
        cd ..
        
        cd frontend
        npm install
        cd ..
        
        echo ""
        echo "✅ Dependencies installed!"
        echo ""
        echo "🐳 Starting with Docker..."
        docker-compose up
        ;;
    5)
        echo "Goodbye! 👋"
        exit 0
        ;;
    *)
        echo "Invalid choice. Exiting."
        exit 1
        ;;
esac
