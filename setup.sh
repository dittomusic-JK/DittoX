#!/bin/bash

# Ditto X - GitHub + Vercel Setup Script
# This script organizes your files for deployment

echo "🎵 Ditto X Schedule App - GitHub + Vercel Setup"
echo "================================================"
echo ""

# Check if we're in the right directory
if [ ! -f "index.html" ]; then
    echo "❌ Error: index.html not found in current directory"
    echo "Please run this script in the folder containing your downloaded files"
    exit 1
fi

echo "✅ Found required files"
echo ""

# Create folder structure
echo "📁 Creating folder structure..."
mkdir -p api
mkdir -p public

echo "✅ Folders created"
echo ""

# Move files to correct locations
echo "📦 Organizing files..."

# Move API file
if [ -f "api-all-data.js" ]; then
    mv api-all-data.js api/all-data.js
    echo "  ✓ api/all-data.js"
else
    echo "  ⚠️  api-all-data.js not found"
fi

# Move HTML file
if [ -f "index.html" ]; then
    mv index.html public/index.html
    echo "  ✓ public/index.html"
elif [ -f "ditto-x-cms-connected.html" ]; then
    mv ditto-x-cms-connected.html public/index.html
    echo "  ✓ public/index.html (renamed from ditto-x-cms-connected.html)"
else
    echo "  ⚠️  HTML file not found"
fi

# Root files are already in place
echo "  ✓ package.json"
echo "  ✓ vercel.json"
echo "  ✓ .gitignore"
echo "  ✓ README.md"

echo ""
echo "✅ File organization complete!"
echo ""

# Show folder structure
echo "📂 Your folder structure:"
echo ""
echo "dittox-schedule-app/"
echo "├── api/"
echo "│   └── all-data.js          ← Serverless function"
echo "├── public/"
echo "│   └── index.html            ← Your app"
echo "├── .gitignore"
echo "├── package.json"
echo "├── vercel.json"
echo "└── README.md"
echo ""

# Initialize git if not already
if [ ! -d ".git" ]; then
    echo "🔧 Initializing git repository..."
    git init
    echo "✅ Git initialized"
    echo ""
fi

echo "🎯 Next Steps:"
echo ""
echo "1. Create GitHub repository:"
echo "   → Go to https://github.com/new"
echo "   → Name: dittox-schedule-app"
echo "   → Create repository"
echo ""
echo "2. Push to GitHub:"
echo "   → git add ."
echo "   → git commit -m \"Initial commit\""
echo "   → git remote add origin https://github.com/YOUR_USERNAME/dittox-schedule-app.git"
echo "   → git branch -M main"
echo "   → git push -u origin main"
echo ""
echo "3. Deploy to Vercel:"
echo "   → Go to https://vercel.com/new"
echo "   → Import your GitHub repository"
echo "   → Add environment variable: WEBFLOW_API_TOKEN"
echo "   → Deploy!"
echo ""
echo "📖 Full instructions: GITHUB_VERCEL_DEPLOY.md"
echo ""
echo "🎉 You're all set! Happy deploying!"
