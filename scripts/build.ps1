@echo off
REM Build script for Windows (PowerShell version)
REM Usage: ./scripts/build.ps1

Write-Host "🔨 Building WarriorForge monorepo..." -ForegroundColor Cyan

Write-Host "📦 Building backend..." -ForegroundColor Yellow
npm run build:backend
if ($LASTEXITCODE -ne 0) { exit 1 }

Write-Host "📦 Building frontend..." -ForegroundColor Yellow
npm run build:frontend
if ($LASTEXITCODE -ne 0) { exit 1 }

Write-Host "✅ Build complete!" -ForegroundColor Green
Write-Host "Backend dist: backend/dist/"
Write-Host "Frontend dist: frontend/dist/"
