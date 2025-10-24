# 🚀 GitHub + Vercel Deployment Guide

## Overview

You'll create ONE GitHub repository with both:
- **Proxy Server** (backend) - deploys to Vercel as serverless functions
- **HTML App** (frontend) - deploys to Vercel as static site

---

## 📁 Step 1: Set Up GitHub Repository (3 minutes)

### Create Local Repository Structure

```bash
# Create project folder
mkdir dittox-schedule-app
cd dittox-schedule-app

# Initialize git
git init

# Create folder structure
mkdir api
mkdir public
```

### File Structure

```
dittox-schedule-app/
├── api/                          # Backend (Vercel Serverless)
│   └── all-data.js              # Main API endpoint
├── public/                       # Frontend (Static)
│   └── index.html               # Your HTML app
├── .gitignore
├── vercel.json                  # Vercel configuration
├── package.json                 # Dependencies
└── README.md                    # Project info
```

### Copy Files to Correct Locations

```bash
# Copy proxy code to api folder
cp webflow-proxy.js api/all-data.js

# Copy HTML to public folder
cp ditto-x-cms-connected.html public/index.html

# Copy other files
cp package.json .
cp .gitignore .
cp vercel.json .
cp README.md .
```

---

## ⚙️ Step 2: Update Files for GitHub/Vercel

### Update `api/all-data.js`

Your serverless function needs slight modifications. Replace the entire file with this:

```javascript
// This is now a Vercel serverless function
const axios = require('axios');

// Webflow API Configuration
const WEBFLOW_API_TOKEN = process.env.WEBFLOW_API_TOKEN;
const SITE_ID = '655e0fa544c67c1ee5ce01a4';

const COLLECTION_IDS = {
    speakers: '655e0fa544c67c1ee5ce01cb',
    schedule: '655e0fa544c67c1ee5ce01c9',
    sponsors: '655e0fa544c67c1ee5ce01d2',
    stages: '655e0fa544c67c1ee5ce01c8',
    exhibitors: '686d0e5c8b5fa9db95a0e47e'
};

// Fetch from Webflow
async function fetchCollection(collectionId) {
    try {
        const response = await axios.get(
            `https://api.webflow.com/v2/collections/${collectionId}/items`,
            {
                headers: {
                    'Authorization': `Bearer ${WEBFLOW_API_TOKEN}`,
                    'accept-version': '1.0.0'
                }
            }
        );
        return response.data.items || [];
    } catch (error) {
        console.error(`Error fetching ${collectionId}:`, error.message);
        return [];
    }
}

// Process schedule with relationships
function processScheduleItems(scheduleItems, speakers, stages) {
    return scheduleItems.map(item => {
        const speakerIds = item.fieldData?.speakers || [];
        const stageId = item.fieldData?.stage;
        
        const relatedSpeakers = speakers.filter(s => speakerIds.includes(s.id));
        const speakerNames = relatedSpeakers
            .map(s => s.fieldData?.name)
            .filter(Boolean)
            .join(', ');
        
        const relatedStage = stages.find(s => s.id === stageId);
        const stageName = relatedStage?.fieldData?.name || '';
        
        return {
            ...item,
            speakerNames,
            stageName,
            relatedSpeakers
        };
    });
}

// Vercel Serverless Function Handler
module.exports = async (req, res) => {
    // Enable CORS
    res.setHeader('Access-Control-Allow-Credentials', true);
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader('Access-Control-Allow-Methods', 'GET,OPTIONS');
    res.setHeader('Access-Control-Allow-Headers', 'X-CSRF-Token, X-Requested-With, Accept, Accept-Version, Content-Length, Content-MD5, Content-Type, Date, X-Api-Version');
    
    // Handle OPTIONS request
    if (req.method === 'OPTIONS') {
        res.status(200).end();
        return;
    }

    try {
        console.log('Fetching all collections...');
        
        const [speakers, schedule, sponsors, stages, exhibitors] = await Promise.all([
            fetchCollection(COLLECTION_IDS.speakers),
            fetchCollection(COLLECTION_IDS.schedule),
            fetchCollection(COLLECTION_IDS.sponsors),
            fetchCollection(COLLECTION_IDS.stages),
            fetchCollection(COLLECTION_IDS.exhibitors)
        ]);
        
        const processedSchedule = processScheduleItems(schedule, speakers, stages);
        
        const data = {
            speakers,
            schedule: processedSchedule,
            sponsors,
            stages,
            exhibitors
        };
        
        console.log('✓ Data fetched:', {
            speakers: speakers.length,
            schedule: schedule.length,
            sponsors: sponsors.length,
            stages: stages.length,
            exhibitors: exhibitors.length
        });
        
        res.status(200).json(data);
    } catch (error) {
        console.error('Error:', error);
        res.status(500).json({ 
            error: 'Failed to fetch data',
            message: error.message 
        });
    }
};
```

### Update `public/index.html`

In your HTML file, change the API_BASE (around line 681):

```javascript
// OLD:
const API_BASE = 'http://localhost:3000/api';

// NEW:
const API_BASE = '/api';  // Vercel will handle the routing
```

### Update `vercel.json`

```json
{
  "version": 2,
  "builds": [
    {
      "src": "public/**",
      "use": "@vercel/static"
    },
    {
      "src": "api/**/*.js",
      "use": "@vercel/node"
    }
  ],
  "routes": [
    {
      "src": "/api/(.*)",
      "dest": "/api/$1"
    },
    {
      "src": "/(.*)",
      "dest": "/public/$1"
    }
  ]
}
```

### Update `package.json`

```json
{
  "name": "dittox-schedule-app",
  "version": "1.0.0",
  "description": "Ditto X 2025 Schedule App",
  "scripts": {
    "dev": "vercel dev",
    "deploy": "vercel --prod"
  },
  "dependencies": {
    "axios": "^1.6.0"
  },
  "engines": {
    "node": "18.x"
  }
}
```

---

## 🔗 Step 3: Push to GitHub (2 minutes)

```bash
# Add all files
git add .

# Commit
git commit -m "Initial commit - Ditto X Schedule App"

# Create GitHub repo (go to github.com/new)
# Then connect it:
git remote add origin https://github.com/YOUR_USERNAME/dittox-schedule-app.git

# Push
git push -u origin main
```

**Create the GitHub repo:**
1. Go to https://github.com/new
2. Name: `dittox-schedule-app`
3. Leave empty (no README, no .gitignore)
4. Click "Create repository"
5. Follow the commands shown

---

## ☁️ Step 4: Deploy to Vercel (3 minutes)

### Option A: Vercel Dashboard (Easiest)

1. Go to https://vercel.com/new
2. Click "Import Git Repository"
3. Select your `dittox-schedule-app` repository
4. **Configure:**
   - Framework Preset: **Other**
   - Root Directory: **Leave blank**
   - Build Command: **Leave blank**
   - Output Directory: **public**
5. Click **"Deploy"**

### Option B: Vercel CLI

```bash
# Install Vercel CLI
npm install -g vercel

# Login
vercel login

# Deploy
vercel --prod
```

---

## 🔒 Step 5: Add Environment Variable (1 minute)

**In Vercel Dashboard:**
1. Go to your project
2. Click **Settings** tab
3. Click **Environment Variables**
4. Add variable:
   - **Name:** `WEBFLOW_API_TOKEN`
   - **Value:** `your_webflow_api_token_here`
   - **Environments:** Check all (Production, Preview, Development)
5. Click **Save**
6. Go to **Deployments** tab
7. Click **⋯** on latest deployment
8. Click **Redeploy**

---

## ✅ Step 6: Test Your App (2 minutes)

Vercel will give you a URL like: `https://dittox-schedule-app.vercel.app`

**Test:**
1. Visit your URL
2. Should see animated loading spinner
3. Data should load from Webflow
4. Test all features:
   - Schedule loads
   - Maps work (zoom/drag)
   - Search/filters work
   - Favorites save

---

## 🔄 Future Updates

**Every time you push to GitHub, Vercel auto-deploys!**

```bash
# Make changes
git add .
git commit -m "Updated schedule feature"
git push

# Vercel automatically deploys! 🎉
```

**Preview Deployments:**
- Every branch/PR gets a preview URL
- Test changes before merging to main

---

## 🌐 Custom Domain (Optional)

1. In Vercel: **Settings** > **Domains**
2. Add your domain: `schedule.dittomusic.com`
3. Update DNS records (Vercel shows you how)
4. SSL certificate automatically provisioned ✅

---

## 📊 Monitoring

**Vercel Dashboard shows:**
- Real-time logs
- Deployment history
- Analytics (page views)
- Function invocations
- Error tracking

**Check:**
- https://vercel.com/YOUR_USERNAME/dittox-schedule-app

---

## 🐛 Troubleshooting

### API Not Working
- Check Vercel logs: **Functions** tab in dashboard
- Verify `WEBFLOW_API_TOKEN` is set
- Check function logs for errors

### HTML Not Loading
- Verify `public/index.html` exists
- Check `vercel.json` routes are correct
- View deployment logs

### CORS Errors
- Already handled in `api/all-data.js`
- If issues, add your domain to CORS settings

### Environment Variable Not Working
- Make sure you redeployed after adding it
- Check it's set for all environments
- Try removing and re-adding

---

## 🎯 Quick Command Reference

```bash
# Local development
vercel dev                    # Run locally with Vercel
git status                    # Check what changed
git add .                     # Stage all changes
git commit -m "message"       # Commit with message
git push                      # Push to GitHub (auto-deploys!)

# Vercel commands
vercel                        # Deploy preview
vercel --prod                 # Deploy production
vercel logs                   # View logs
vercel env pull               # Pull env variables locally
```

---

## ✨ Benefits of This Setup

✅ **Automatic Deployments** - Push to GitHub, auto-deploy
✅ **Preview URLs** - Test every branch/PR
✅ **Rollbacks** - One-click rollback to any version
✅ **Free SSL** - HTTPS automatically
✅ **CDN** - Fast globally
✅ **Logs** - Real-time function logs
✅ **Monitoring** - Built-in analytics

---

## 🎉 You're Done!

Your app is now:
- ✅ Deployed to Vercel
- ✅ Auto-deploys on push
- ✅ Has preview deployments
- ✅ Monitored and logged

**Your URLs:**
- Production: `https://dittox-schedule-app.vercel.app`
- GitHub: `https://github.com/YOUR_USERNAME/dittox-schedule-app`

Share the production URL at your event! 🎵
