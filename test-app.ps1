# Test the Orange ISS Application
# This script starts the full application stack with Docker

Write-Host "🚀 Starting Orange ISS Application..." -ForegroundColor Cyan
Write-Host ""

# Check if Docker is running
Write-Host "📋 Checking Docker status..." -ForegroundColor Yellow
$dockerRunning = $false
try {
    docker info 2>&1 | Out-Null
    if ($LASTEXITCODE -eq 0) {
        $dockerRunning = $true
        Write-Host "✅ Docker is running" -ForegroundColor Green
    }
} catch {
    Write-Host "❌ Docker is not running" -ForegroundColor Red
}

if (-not $dockerRunning) {
    Write-Host ""
    Write-Host "⚠️  Docker Desktop is not running!" -ForegroundColor Yellow
    Write-Host "Please start Docker Desktop and try again." -ForegroundColor Yellow
    Write-Host ""
    Write-Host "Or run services locally with: .\test-app-local.ps1" -ForegroundColor Cyan
    exit 1
}

# Stop any existing containers
Write-Host ""
Write-Host "🧹 Cleaning up existing containers..." -ForegroundColor Yellow
docker-compose down 2>&1 | Out-Null

# Start the application
Write-Host ""
Write-Host "🔨 Building and starting services..." -ForegroundColor Yellow
Write-Host "   - PostgreSQL Database on port 5432" -ForegroundColor Gray
Write-Host "   - Backend API on port 3000" -ForegroundColor Gray
Write-Host "   - Frontend App on port 4200" -ForegroundColor Gray
Write-Host ""

docker-compose up --build -d

if ($LASTEXITCODE -eq 0) {
    Write-Host ""
    Write-Host "✅ Application started successfully!" -ForegroundColor Green
    Write-Host ""
    Write-Host "📱 Access your application:" -ForegroundColor Cyan
    Write-Host "   Frontend: http://localhost:4200" -ForegroundColor White
    Write-Host "   Backend:  http://localhost:3000" -ForegroundColor White
    Write-Host "   Database: localhost:5432" -ForegroundColor White
    Write-Host ""
    Write-Host "📊 View logs with: docker-compose logs -f" -ForegroundColor Cyan
    Write-Host "🛑 Stop with: docker-compose down" -ForegroundColor Cyan
    Write-Host ""
    
    # Wait a moment and check container status
    Start-Sleep -Seconds 3
    Write-Host "📦 Container Status:" -ForegroundColor Yellow
    docker-compose ps
} else {
    Write-Host ""
    Write-Host "❌ Failed to start application" -ForegroundColor Red
    Write-Host "Check logs with: docker-compose logs" -ForegroundColor Yellow
}
