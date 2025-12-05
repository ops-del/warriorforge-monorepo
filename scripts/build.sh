#!/bin/bash
# Build script for both backend and frontend

set -e

echo "🔨 Building WarriorForge monorepo..."

echo "📦 Building backend..."
npm run build:backend

echo "📦 Building frontend..."
npm run build:frontend

echo "✅ Build complete!"
echo "Backend dist: backend/dist/"
echo "Frontend dist: frontend/dist/"
