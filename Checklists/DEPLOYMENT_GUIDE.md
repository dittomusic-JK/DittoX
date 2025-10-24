# Ditto X Schedule App - Deployment Guide

## 🚀 Quick Deploy (Recommended)

### Step 1: Deploy Proxy Server to Vercel

1. **Install Vercel CLI**
   ```bash
   npm install -g vercel
   ```

2. **Prepare your proxy folder**
   - Make sure you have: `webflow-proxy.js`, `package.json`, `vercel.json`
   - Your `webflow-proxy.js` should export the Express app:
     ```javascript
     module.exports = app; // Add this at the end of webflow-proxy.js
     ```

3. **Deploy**
   ```bash
   cd your-proxy-folder
   vercel
   ```
   
4. **Add Environment Variable**
   ```bash
   vercel env add WEBFLOW_API_TOKEN
   # Paste your Webflow API token when prompted
   ```

5. **Your proxy will be live at:** `https://your-project.vercel.app`

---

### Step 2: Update HTML File

Open `ditto-x-cms-connected.html` and update line ~681:

**Change:**
```javascript
const API_BASE = 'http://localhost:3000/api';
```

**To:**
```javascript
const API_BASE = 'https://your-project.vercel.app/api';
```

---

### Step 3: Deploy HTML to Netlify (or any static host)

**Option A: Netlify Drop (Easiest)**
1. Go to https://app.netlify.com/drop
2. Drag and drop your `ditto-x-cms-connected.html` file
3. Rename it to `index.html` after upload
4. Done! Your app is live at `https://random-name.netlify.app`

**Option B: Netlify CLI**
```bash
npm install -g netlify-cli
netlify deploy --prod
```

**Option C: GitHub Pages**
1. Create GitHub repo
2. Push `index.html` (renamed from ditto-x-cms-connected.html)
3. Enable GitHub Pages in repo settings
4. Live at `https://yourusername.github.io/repo-name`

---

## 🎯 Alternative Deployment Options

### Proxy Server Alternatives:

**Render.com (Free tier)**
- Create new Web Service
- Connect GitHub repo
- Build command: `npm install`
- Start command: `node webflow-proxy.js`
- Add environment variable: `WEBFLOW_API_TOKEN`

**Railway.app (Free tier)**
- Import GitHub repo
- Auto-detects Node.js
- Add environment variable
- One-click deploy

**Heroku (Paid)**
```bash
heroku create dittox-proxy
heroku config:set WEBFLOW_API_TOKEN=your_token
git push heroku main
```

### HTML Hosting Alternatives:

**Vercel (for static sites)**
```bash
vercel --prod
```

**Cloudflare Pages**
- Connect GitHub repo
- Auto-deploy on push

**AWS S3 + CloudFront**
- Upload HTML to S3 bucket
- Enable static website hosting
- Add CloudFront for CDN

---

## 🔒 Security Best Practices

1. **Environment Variables**
   - Never commit API tokens to Git
   - Use `.env` files locally
   - Use hosting platform's secret management

2. **CORS Configuration**
   - Update CORS in proxy to allow only your domain:
     ```javascript
     app.use(cors({
       origin: 'https://yourdomain.com'
     }));
     ```

3. **Rate Limiting**
   - Already implemented in proxy (100 requests/hour per user)

---

## 📱 Testing Your Deployment

1. **Check proxy endpoint:**
   ```bash
   curl https://your-proxy.vercel.app/api/all-data
   ```

2. **Open your deployed HTML in browser**
   - Should see animated loading spinner
   - Data should load from your proxy
   - Check browser console for any CORS errors

3. **Test on mobile device:**
   - Open deployed URL on phone
   - Test all interactions (zoom, drag, schedule filtering)

---

## 🐛 Troubleshooting

**CORS Errors:**
- Make sure proxy has correct CORS settings
- Check that API_BASE URL in HTML matches your deployed proxy

**Data Not Loading:**
- Verify proxy is running: visit `https://your-proxy.vercel.app/api/all-data`
- Check proxy logs on Vercel dashboard
- Verify Webflow API token is set correctly

**404 Errors:**
- Make sure HTML file is named `index.html`
- Check that proxy routes are configured correctly in `vercel.json`

---

## 🎉 You're Live!

Once deployed:
- Share URL: `https://yourdomain.com`
- QR Code: Generate at qr-code-generator.com for easy mobile access
- Custom Domain: Add via Netlify/Vercel settings

---

## 📊 Monitoring

**Vercel Dashboard:**
- View proxy logs
- Monitor API calls
- Check performance

**Netlify Analytics:**
- Track visitors
- See page views
- Monitor bandwidth

---

## 🔄 Updating Your App

**To update HTML:**
1. Make changes locally
2. Drag new file to Netlify Drop (or push to Git)

**To update Proxy:**
1. Make changes to `webflow-proxy.js`
2. Run `vercel --prod` (or push to Git)

---

## 💰 Cost Estimate

**Free Tier (Recommended for Event):**
- Vercel Proxy: Free (100GB bandwidth)
- Netlify Static: Free (100GB bandwidth)
- Total: $0/month

**If You Exceed Free Tier:**
- Vercel Pro: $20/month (1TB bandwidth)
- Netlify Pro: $19/month (1TB bandwidth)

For a single event with ~1000 attendees, free tier is plenty!

---

## 🎯 Quick Start Checklist

- [ ] Proxy deployed to Vercel
- [ ] Environment variable (WEBFLOW_API_TOKEN) added
- [ ] HTML updated with production API_BASE URL
- [ ] HTML deployed to Netlify
- [ ] Tested on desktop browser
- [ ] Tested on mobile device
- [ ] Shared URL with team
- [ ] Created QR code for easy access

---

**Need Help?**
- Vercel Docs: https://vercel.com/docs
- Netlify Docs: https://docs.netlify.com
- Check browser console for errors
