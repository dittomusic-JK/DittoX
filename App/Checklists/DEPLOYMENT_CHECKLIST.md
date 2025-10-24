# 🚀 Deployment Checklist

## Pre-Deployment
- [ ] Have Webflow API token ready
- [ ] Tested app locally (proxy + HTML working)
- [ ] All files ready:
  - [ ] ditto-x-cms-connected.html
  - [ ] webflow-proxy.js
  - [ ] package.json
  - [ ] vercel.json
  - [ ] .env.example

## Deploy Proxy Server (5 minutes)

### Option A: Vercel (Recommended)
- [ ] Install Vercel CLI: `npm install -g vercel`
- [ ] Navigate to proxy folder: `cd your-proxy-folder`
- [ ] Run: `vercel --prod`
- [ ] Follow prompts (create account if needed)
- [ ] Note your deployment URL: `https://____________.vercel.app`
- [ ] Add environment variable:
  - [ ] Go to Vercel dashboard
  - [ ] Settings > Environment Variables
  - [ ] Add: `WEBFLOW_API_TOKEN` = your token
  - [ ] Redeploy if needed

### Test Proxy
- [ ] Visit: `https://your-url.vercel.app/api/health`
- [ ] Should see: `{"status":"ok",...}`
- [ ] Visit: `https://your-url.vercel.app/api/all-data`
- [ ] Should see JSON with speakers, schedule, etc.

## Update HTML File
- [ ] Open `ditto-x-cms-connected.html`
- [ ] Find line ~681: `const API_BASE = 'http://localhost:3000/api';`
- [ ] Change to: `const API_BASE = 'https://your-url.vercel.app/api';`
- [ ] Save file
- [ ] Rename to: `index.html`

## Deploy HTML (3 minutes)

### Option A: Netlify Drop (Easiest)
- [ ] Go to: https://app.netlify.com/drop
- [ ] Drag `index.html` onto the page
- [ ] Wait for upload
- [ ] Note your URL: `https://____________.netlify.app`

### Option B: Netlify CLI
- [ ] Install: `npm install -g netlify-cli`
- [ ] Run: `netlify deploy --prod`
- [ ] Follow prompts

### Option C: Vercel Static
- [ ] In HTML folder: `vercel --prod`

## Test Live App
- [ ] Visit your deployed URL
- [ ] Should see animated loading spinner
- [ ] Data should load (not stuck on loading)
- [ ] Test on desktop:
  - [ ] Schedule loads
  - [ ] Map zoom/drag works
  - [ ] Search/filters work
  - [ ] Clicking map areas navigates to schedule
  - [ ] My Agenda saves favorites
- [ ] Test on mobile:
  - [ ] Responsive design looks good
  - [ ] Touch zoom/drag works
  - [ ] All interactions smooth

## Post-Deployment

### Optional: Custom Domain
- [ ] Buy domain (Namecheap, Google Domains, etc.)
- [ ] Add to Netlify/Vercel (Settings > Domains)
- [ ] Update DNS records
- [ ] Wait for SSL certificate (automatic)

### Optional: QR Code
- [ ] Generate QR at: qr-code-generator.com
- [ ] Use your deployed URL
- [ ] Print for event signage

### Share with Team
- [ ] Share URL: `_________________________________`
- [ ] Test link on multiple devices
- [ ] Add to event communications

## Monitoring (Optional)
- [ ] Set up Vercel analytics (Settings > Analytics)
- [ ] Set up Netlify analytics (Settings > Analytics)
- [ ] Check logs regularly before event

## Day Before Event
- [ ] Test app still works
- [ ] Check Webflow CMS has all latest data
- [ ] Verify exhibitor information is current
- [ ] Test on multiple devices/browsers
- [ ] Share final URL with all staff

## Event Day
- [ ] Monitor proxy logs for errors
- [ ] Have backup plan (PDF schedule)
- [ ] Share QR code/URL at registration

---

## Quick Links

**Documentation:**
- Full guide: [DEPLOYMENT_GUIDE.md](DEPLOYMENT_GUIDE.md)
- Project info: [README.md](README.md)

**Helpful Resources:**
- Vercel Docs: https://vercel.com/docs
- Netlify Docs: https://docs.netlify.com
- Webflow API: https://developers.webflow.com

**Need Help?**
- Check browser console (F12)
- Check proxy logs in Vercel dashboard
- Verify API token is correct

---

## Success! 🎉

Once all boxes are checked, your app is LIVE!

**Your URLs:**
- Proxy: `https://____________.vercel.app`
- App: `https://____________.netlify.app`

Share with the world! 🚀
