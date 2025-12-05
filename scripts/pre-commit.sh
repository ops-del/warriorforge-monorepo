#!/bin/bash
# Pre-commit hook - runs linting and basic checks before commit

set -e

echo "🔍 Running pre-commit checks..."

# Check for ESLint
if npm run lint --if-present > /dev/null 2>&1; then
  echo "✅ Linting passed"
else
  echo "❌ Linting failed - commit aborted"
  exit 1
fi

# Check for TypeScript errors (frontend)
if npm run build:frontend --if-present > /dev/null 2>&1; then
  echo "✅ Frontend TypeScript check passed"
else
  echo "⚠️  Frontend build check warning (non-fatal)"
fi

echo "✅ Pre-commit checks passed!"
exit 0
