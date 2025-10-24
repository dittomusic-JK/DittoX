#!/bin/bash

# Ditto X Quick Deploy Script
# This script helps you deploy your app quickly

echo "🎵 Ditto X Deployment Helper"
echo "=============================="
echo ""

# Check if Vercel CLI is installed
if ! command -v vercel &> /dev/null
then
    echo "📦 Vercel CLI not found. Installing..."
    npm install -g vercel
    echo "✅ Vercel CLI installed!"
else
    echo "✅ Vercel CLI already installed"
fi

echo ""
echo "🚀 Let's deploy your proxy server!"
echo ""
echo "Step 1: Make sure you have these files in your proxy folder:"
echo "  - webflow-proxy.js"
echo "  - package.json"
echo "  - vercel.json"
echo ""

read -p "Are all files ready? (y/n) " -n 1 -r
echo ""

if [[ ! $REPLY =~ ^[Yy]$ ]]
then
    echo "❌ Please prepare your files first. See README.md for details."
    exit 1
fi

echo ""
echo "Step 2: Deploying to Vercel..."
echo ""

# Deploy to Vercel
vercel --prod

echo ""
echo "✅ Proxy deployed!"
echo ""
echo "Step 3: Don't forget to:"
echo "  1. Add WEBFLOW_API_TOKEN environment variable in Vercel dashboard"
echo "  2. Update API_BASE in your HTML file to your Vercel URL"
echo "  3. Deploy HTML to Netlify Drop or another static host"
echo ""
echo "📖 See DEPLOYMENT_GUIDE.md for detailed instructions"
echo ""
echo "🎉 You're almost done!"
