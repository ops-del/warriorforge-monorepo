@echo off
REM Test script for Windows (PowerShell version)
REM Usage: ./scripts/test.ps1

Write-Host "🧪 Running tests and linting..." -ForegroundColor Cyan

Write-Host "📋 Linting frontend..." -ForegroundColor Yellow
npm run lint --workspace frontend
if ($LASTEXITCODE -ne 0) { exit 1 }

Write-Host "🧪 Running unit tests..." -ForegroundColor Yellow
npm run test --if-present

Write-Host "✅ All checks passed!" -ForegroundColor Green
