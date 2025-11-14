# Ditto X Schedule App - Deployment Guide

## 🚀 Quick Deploy to Vercel

This guide will help you deploy the Ditto X Schedule app to Vercel.

### Prerequisites

- ✅ Git installed and configured
- ✅ Node.js 22.x installed
- ✅ GitHub account
- ✅ Vercel account (sign up at [vercel.com](https://vercel.com))
- ✅ Webflow API token

### Step 1: Get Your Webflow API Token

1. Go to [Webflow Workspace Settings](https://designers.webflow.com/workspace/settings/integrations)
2. Create a new API token
3. Copy the token (you'll need it for Vercel)

### Step 2: Set Up Environment Variables Locally

Edit the `.env` file and add your Webflow API token:

```bash
WEBFLOW_API_TOKEN=your_actual_token_here
PORT=3000
```

### Step 3: Test Locally (Optional but Recommended)

```bash
# Install dependencies (already done)
npm install

# Start local development server
npm run dev
```

Visit `http://localhost:3000` to see your app running locally.

### Step 4: Commit Your Changes to Git

```bash
# Stage all changes
git add -A

# Commit changes
git commit -m "Set up deployment configuration"

# Push to GitHub
git push origin main
```

### Step 5: Deploy to Vercel

#### Option A: Deploy via Vercel Dashboard (Recommended for First Time)

1. Go to [vercel.com](https://vercel.com) and log in
2. Click "Add New Project"
3. Import your GitHub repository: `dittomusic-JK/DittoX`
4. Configure project:
   - **Framework Preset:** Other
   - **Root Directory:** `./`
   - **Build Command:** (leave empty)
   - **Output Directory:** `public`
5. Add Environment Variable:
   - **Name:** `WEBFLOW_API_TOKEN`
   - **Value:** Your Webflow API token
6. Click "Deploy"

#### Option B: Deploy via CLI

```bash
# Login to Vercel (first time only)
npm run login

# Deploy preview
npm run deploy:preview

# Deploy to production
npm run deploy
```

When prompted, add your environment variables:
- `WEBFLOW_API_TOKEN`: Your Webflow API token

### Step 6: Verify Deployment

1. Visit your Vercel deployment URL (e.g., `https://ditto-x-abc123.vercel.app`)
2. Check that the API is working: `https://your-url.vercel.app/api/all-data`
3. Test the main app: `https://your-url.vercel.app/`

### 🔧 Configuration

#### API Endpoints

Your app exposes these endpoints:
- `GET /api/all-data` - All collections (schedule, speakers, stages, exhibitors, sponsors)
- Main app at root: `/`

#### Environment Variables in Vercel

To update environment variables after deployment:
1. Go to your project in Vercel dashboard
2. Settings → Environment Variables
3. Add/update `WEBFLOW_API_TOKEN`
4. Redeploy for changes to take effect

### 🎨 Customization

#### Update Webflow Collections

If you need to change collection IDs, edit `api/all-data.js`:

```javascript
// Line 4-8
const WEBFLOW_CONFIG = {
    siteId: '655e0fa544c67c1ee5ce01a4',
    apiToken: process.env.WEBFLOW_API_TOKEN,
    baseUrl: 'https://api.webflow.com/v2'
};
```

#### Customize Event Filters

The app currently filters for specific events:
- **Schedule**: MTMI: 25 event (`86742d9d05a1057c7f30ce72498d21da`)
- **Stages**: London event at Indigo O2 (`386bc0edacc93d0d034fa7bff70938a2`)

Update these IDs in `api/all-data.js` if you need different events.

### 📱 PWA (Progressive Web App)

The app includes PWA features:
- Install to home screen on mobile
- Offline support
- Custom app icons

Configuration in:
- `public/manifest.json` - PWA manifest
- `public/sw.js` - Service worker

### 🐛 Troubleshooting

#### "API Error" on frontend

- Check that `WEBFLOW_API_TOKEN` is set in Vercel
- Verify the token is valid in Webflow
- Check Vercel function logs in dashboard

#### "404 Not Found"

- Make sure `public/` directory is set as output directory
- Check that `index.html` exists in `public/`

#### Styles not loading

- Check that font files are in `public/fonts/`
- Verify Webflow CDN URLs are accessible

#### CORS errors

- CORS is configured to allow all origins (`*`)
- If you need to restrict, edit `api/all-data.js` line 13

### 🔒 Security Best Practices

1. **Never commit `.env` file** - Already in `.gitignore`
2. **Use environment variables** - Store API token in Vercel settings
3. **Restrict CORS** - Update to specific domain in production
4. **Enable rate limiting** - Consider adding rate limiting middleware

### 📊 Performance Tips

1. **Enable caching** - Response headers for API endpoints
2. **Optimize images** - Already using Webflow CDN
3. **Monitor usage** - Check Vercel analytics

### 🔄 Continuous Deployment

Vercel automatically deploys when you push to GitHub:

```bash
# Make changes
git add .
git commit -m "Update schedule"
git push origin main
# Vercel automatically deploys! 🎉
```

### 📞 Support

- Vercel docs: [vercel.com/docs](https://vercel.com/docs)
- Webflow API docs: [developers.webflow.com](https://developers.webflow.com/)

---

**🎵 Built for Ditto X 2025**

Thursday 20th November • Indigo at The O2, London
