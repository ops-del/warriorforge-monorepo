#!/bin/bash
# Test script for running linting and tests

set -e

echo "🧪 Running tests and linting..."

if [ "$1" = "lint-only" ]; then
  echo "📋 Linting frontend..."
  npm run lint --workspace frontend
  echo "✅ Frontend linting passed!"
else
  echo "📋 Linting frontend..."
  npm run lint --workspace frontend
  
  echo "🧪 Running unit tests..."
  npm run test --if-present
  
  echo "✅ All checks passed!"
fi
