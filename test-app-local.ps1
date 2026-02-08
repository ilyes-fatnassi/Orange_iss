# Test the Orange ISS Application Locally (without Docker)
# This script starts backend and frontend services locally

Write-Host "🚀 Starting Orange ISS Application (Local Mode)..." -ForegroundColor Cyan
Write-Host ""

$workspaceRoot = $PSScriptRoot

# Check Node.js
Write-Host "📋 Checking prerequisites..." -ForegroundColor Yellow
$nodeVersion = node --version 2>$null
if ($LASTEXITCODE -eq 0) {
    Write-Host "✅ Node.js: $nodeVersion" -ForegroundColor Green
} else {
    Write-Host "❌ Node.js is not installed" -ForegroundColor Red
    exit 1
}

# Check PostgreSQL
Write-Host "📋 Checking PostgreSQL..." -ForegroundColor Yellow
$pgStatus = psql --version 2>$null
if ($LASTEXITCODE -eq 0) {
    Write-Host "✅ PostgreSQL is available" -ForegroundColor Green
} else {
    Write-Host "⚠️  PostgreSQL CLI not found - you'll need a database running" -ForegroundColor Yellow
    Write-Host "   You can use Docker just for the database:" -ForegroundColor Yellow
    Write-Host "   docker run -d -p 5432:5432 -e POSTGRES_DB=iss_orange -e POSTGRES_USER=iss_user -e POSTGRES_PASSWORD=changeme postgres:14-alpine" -ForegroundColor Cyan
}

Write-Host ""
Write-Host "📦 Installing dependencies..." -ForegroundColor Yellow

# Install backend dependencies
Set-Location "$workspaceRoot\backend"
if (-not (Test-Path "node_modules")) {
    Write-Host "   Installing backend dependencies..." -ForegroundColor Gray
    npm install
}

# Install frontend dependencies
Set-Location "$workspaceRoot\frontend"
if (-not (Test-Path "node_modules")) {
    Write-Host "   Installing frontend dependencies..." -ForegroundColor Gray
    npm install
}

Set-Location $workspaceRoot

Write-Host ""
Write-Host "✅ Ready to start!" -ForegroundColor Green
Write-Host ""
Write-Host "🔧 Starting services..." -ForegroundColor Yellow
Write-Host ""

# Start backend in new terminal
Write-Host "🟢 Starting Backend (http://localhost:3000)..." -ForegroundColor Green
Start-Process powershell -ArgumentList "-NoExit", "-Command", "cd '$workspaceRoot\backend'; Write-Host '🔧 Backend Server' -ForegroundColor Cyan; npm run start:dev"

# Wait a bit for backend to start
Start-Sleep -Seconds 3

# Start frontend in new terminal
Write-Host "🔵 Starting Frontend (http://localhost:4200)..." -ForegroundColor Blue
Start-Process powershell -ArgumentList "-NoExit", "-Command", "cd '$workspaceRoot\frontend'; Write-Host '🔧 Frontend Server' -ForegroundColor Cyan; npm start"

Write-Host ""
Write-Host "✅ Services are starting!" -ForegroundColor Green
Write-Host ""
Write-Host "📱 Your application will be available at:" -ForegroundColor Cyan
Write-Host "   Frontend: http://localhost:4200" -ForegroundColor White
Write-Host "   Backend:  http://localhost:3000" -ForegroundColor White
Write-Host ""
Write-Host "💡 Two terminal windows have been opened for backend and frontend" -ForegroundColor Yellow
Write-Host "   Close those windows to stop the services" -ForegroundColor Yellow
Write-Host ""
