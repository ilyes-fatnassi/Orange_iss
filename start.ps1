# ISS Orange - Quick Start Script
# This script helps you set up and run the development environment

Write-Host "🚀 ISS Orange - Development Environment Setup" -ForegroundColor Cyan
Write-Host "=============================================" -ForegroundColor Cyan
Write-Host ""

# Check if .env exists
if (-Not (Test-Path ".env")) {
    Write-Host "⚠️  .env file not found. Creating from .env.example..." -ForegroundColor Yellow
    Copy-Item ".env.example" ".env"
    Write-Host "✅ Created .env file. Please update it with your configuration." -ForegroundColor Green
    Write-Host ""
}

# Check what the user wants to do
Write-Host "Choose an option:" -ForegroundColor Cyan
Write-Host "1. Install dependencies (npm install for both backend and frontend)"
Write-Host "2. Start with Docker (docker-compose up)"
Write-Host "3. Start locally (run backend and frontend separately)"
Write-Host "4. Install + Start with Docker"
Write-Host "5. Exit"
Write-Host ""

$choice = Read-Host "Enter your choice (1-5)"

switch ($choice) {
    "1" {
        Write-Host ""
        Write-Host "📦 Installing backend dependencies..." -ForegroundColor Cyan
        Set-Location backend
        npm install
        Set-Location ..
        
        Write-Host ""
        Write-Host "📦 Installing frontend dependencies..." -ForegroundColor Cyan
        Set-Location frontend
        npm install
        Set-Location ..
        
        Write-Host ""
        Write-Host "✅ All dependencies installed!" -ForegroundColor Green
        Write-Host "Run this script again and choose option 2 or 3 to start the application." -ForegroundColor Yellow
    }
    "2" {
        Write-Host ""
        Write-Host "🐳 Starting with Docker..." -ForegroundColor Cyan
        Write-Host "This will start PostgreSQL, Backend, and Frontend" -ForegroundColor Yellow
        Write-Host ""
        docker-compose up
    }
    "3" {
        Write-Host ""
        Write-Host "💻 Starting locally..." -ForegroundColor Cyan
        Write-Host ""
        Write-Host "Make sure PostgreSQL is running!" -ForegroundColor Yellow
        Write-Host ""
        
        # Start backend in new terminal
        Write-Host "Starting backend..." -ForegroundColor Cyan
        Start-Process powershell -ArgumentList "-NoExit", "-Command", "cd backend; npm run start:dev"
        
        Start-Sleep -Seconds 2
        
        # Start frontend in new terminal
        Write-Host "Starting frontend..." -ForegroundColor Cyan
        Start-Process powershell -ArgumentList "-NoExit", "-Command", "cd frontend; npm start"
        
        Write-Host ""
        Write-Host "✅ Services starting..." -ForegroundColor Green
        Write-Host "Backend: http://localhost:3000" -ForegroundColor Yellow
        Write-Host "Frontend: http://localhost:4200" -ForegroundColor Yellow
        Write-Host "API Docs: http://localhost:3000/api/docs" -ForegroundColor Yellow
    }
    "4" {
        Write-Host ""
        Write-Host "📦 Installing dependencies..." -ForegroundColor Cyan
        
        Set-Location backend
        npm install
        Set-Location ..
        
        Set-Location frontend
        npm install
        Set-Location ..
        
        Write-Host ""
        Write-Host "✅ Dependencies installed!" -ForegroundColor Green
        Write-Host ""
        Write-Host "🐳 Starting with Docker..." -ForegroundColor Cyan
        docker-compose up
    }
    "5" {
        Write-Host "Goodbye! 👋" -ForegroundColor Cyan
        exit
    }
    default {
        Write-Host "Invalid choice. Exiting." -ForegroundColor Red
        exit
    }
}
