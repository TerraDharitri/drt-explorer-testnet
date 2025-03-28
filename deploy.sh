#!/bin/bash

# Deploy script for Dharitri Explorer

echo "🚀 Starting deployment process for Dharitri Explorer..."

# Check if we have the correct Node version
node_version=$(node -v)
echo "Using Node version: $node_version"

# Install dependencies
echo "📦 Installing dependencies..."
npm ci

# Create production build
echo "🔨 Creating production build..."
npm run build

# Run tests if they exist
if [ -f "package.json" ] && grep -q "\"test\":" "package.json"; then
  echo "🧪 Running tests..."
  npm test
fi

# Optimize assets (optional)
echo "⚡ Optimizing assets..."
if [ -d "dist" ]; then
  find dist -name "*.js" -exec echo "Optimizing {}" \;
  find dist -name "*.js" -exec gzip -9 -k {} \;
  find dist -name "*.css" -exec gzip -9 -k {} \;
fi

# Deploy to server (this would be customized based on your hosting)
echo "🚢 Deploying to production server..."
echo "This is where you would upload files to your server"
echo "For example: rsync -avz --delete dist/ user@server:/path/to/www"

# Example deployment to a static file host
# aws s3 sync dist/ s3://your-bucket-name/ --delete

echo "✅ Deployment completed!"
echo "Remember to verify the application is working correctly in production."

# Optional: Generate deployment report
echo "📊 Generating deployment report..."
echo "Deployment completed at $(date)" > deployment-report.txt
echo "Build size: $(du -sh dist | cut -f1)" >> deployment-report.txt
echo "Files: $(find dist -type f | wc -l)" >> deployment-report.txt

echo "📝 Deployment report saved to deployment-report.txt" 