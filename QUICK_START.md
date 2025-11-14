# Ditto X Schedule App - Quick Start 🚀

## Your Setup is Complete! ✅

The repository has been cloned and configured for deployment.

## Essential Commands

### Local Development
```bash
# Install dependencies (already done ✓)
npm install

# Start local development server
npm run dev
# Visit http://localhost:3000
```

### Deployment to Vercel

#### First Time Setup
```bash
# 1. Login to Vercel
npm run login

# 2. Add your Webflow API token to .env file
# Edit .env and replace: WEBFLOW_API_TOKEN=your_actual_token_here

# 3. Deploy
npm run deploy
```

#### Subsequent Deployments
```bash
# Preview deployment (test before going live)
npm run deploy:preview

# Production deployment
npm run deploy
```

### Git Workflow
```bash
# Stage changes
git add -A

# Commit with message
git commit -m "Your commit message"

# Push to GitHub (triggers auto-deploy on Vercel)
git push origin main
```

## What You Need

### 1. Webflow API Token 🔑
- Get it from: https://designers.webflow.com/workspace/settings/integrations
- Add it to `.env` file locally
- Add it to Vercel dashboard → Settings → Environment Variables

### 2. Vercel Account
- Sign up at: https://vercel.com
- Connect your GitHub account

## Project Structure

```
Schedule/
├── api/
│   └── all-data.js       ← Serverless API function
├── public/
│   ├── index.html        ← Main app
│   ├── fonts/            ← Brand fonts (Neusa, Satoshi)
│   ├── manifest.json     ← PWA config
│   └── sw.js             ← Service worker
├── .env                  ← Environment variables (DO NOT COMMIT)
├── .gitignore           ← Git ignore rules
├── package.json         ← Dependencies & scripts
├── vercel.json          ← Vercel config
└── DEPLOYMENT.md        ← Full deployment guide
```

## Testing Your Deployment

After deploying, test these URLs:
- `https://your-app.vercel.app/` - Main app
- `https://your-app.vercel.app/api/all-data` - API endpoint

## Features Included

- ✅ Full event schedule
- ✅ Interactive venue maps (3 floors)
- ✅ Personal agenda (saved in browser)
- ✅ Industry market exhibitors
- ✅ Smart search & filters
- ✅ Mobile-first responsive design
- ✅ PWA support (install to home screen)
- ✅ Offline support
- ✅ Custom brand fonts (Neusa, Satoshi)

## Current Status

- ✅ Repository cloned
- ✅ Dependencies installed
- ✅ Git configured
- ✅ Vercel CLI installed locally
- ⏳ Needs: Webflow API token in `.env`
- ⏳ Needs: First deployment

## Next Steps

1. **Add Webflow API token** to `.env` file
2. **Test locally**: `npm run dev`
3. **Deploy**: `npm run login` then `npm run deploy`
4. **Set up auto-deploy**: Deploy via Vercel dashboard to enable GitHub integration

## Customization

### Event Details
The app is pre-configured for:
- **Event**: Ditto X 2025
- **Date**: Thursday, 20th November
- **Venue**: Indigo at The O2, London

### Brand Colors
- Teal: `#00ff99`
- Purple: `#7e00e9`
- Orange: `#ff7201`
- Dark: `#070707`

### Fonts
- **Headings**: Neusa (bold, medium)
- **Body**: Satoshi (regular, medium, bold)

## Support

- 📖 Full guide: `DEPLOYMENT.md`
- 🐛 Issues: Check Vercel function logs
- 💬 Webflow API: [developers.webflow.com](https://developers.webflow.com/)

---

**🎵 Ready to deploy! Let's go!**
