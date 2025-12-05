#!/bin/bash
# Deploy script for Vercel and Railway

set -e

ENVIRONMENT=${1:-staging}

echo "🚀 Deploying to $ENVIRONMENT..."

# Build first
npm run build

# Deploy frontend to Vercel
echo "📱 Deploying frontend to Vercel..."
cd frontend && vercel --prod && cd ..

# For Railway backend deployment (manual setup required)
echo "⚙️  Backend deployment requires Railway CLI setup"
echo "📖 See DEPLOYMENT.md for Railway setup instructions"

echo "✅ Deployment initiated!"
