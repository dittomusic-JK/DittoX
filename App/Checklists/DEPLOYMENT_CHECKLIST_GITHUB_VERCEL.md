# 🚀 Deployment Checklist - GitHub + Vercel

Print this and check off each step!

---

## ✅ STEP 1: ORGANIZE FILES (1 minute)

```
□ Downloaded all files from Claude
□ Put files in folder: dittox-schedule-app
□ Ran: chmod +x setup.sh
□ Ran: ./setup.sh
□ Confirmed folder structure looks like:
    dittox-schedule-app/
    ├── api/
    │   └── all-data.js
    ├── public/
    │   └── index.html
    ├── package.json
    ├── vercel.json
    └── .gitignore
```

---

## ✅ STEP 2: CREATE GITHUB REPO (1 minute)

```
□ Opened: https://github.com/new
□ Repo name: dittox-schedule-app
□ Left "Add README" UNCHECKED
□ Left "Add .gitignore" UNCHECKED
□ Clicked "Create repository"
□ Copied the repo URL (for next step)
```

---

## ✅ STEP 3: PUSH TO GITHUB (1 minute)

In terminal, in your project folder:

```bash
□ Ran: git add .
□ Ran: git commit -m "Initial commit"
□ Ran: git remote add origin https://github.com/YOUR_USERNAME/dittox-schedule-app.git
□ Ran: git branch -M main
□ Ran: git push -u origin main
□ Confirmed files are on GitHub (refresh your repo page)
```

---

## ✅ STEP 4: DEPLOY TO VERCEL (2 minutes)

```
□ Opened: https://vercel.com/new
□ Clicked "Import Git Repository"
□ Found and selected: dittox-schedule-app
□ Clicked "Import"
□ Framework Preset: Left as "Other"
□ Root Directory: Left blank
□ Build Command: Left blank  
□ Output Directory: Entered "public"
□ Clicked "Deploy" button
```

---

## ✅ STEP 5: ADD API TOKEN (1 minute)

While it's deploying OR after deployment:

```
□ Clicked "Environment Variables" (or went to Settings tab)
□ Added variable:
    Name: WEBFLOW_API_TOKEN
    Value: [pasted your Webflow token]
□ Selected ALL environments (Production, Preview, Development)
□ Clicked "Save"
□ Went to "Deployments" tab
□ Clicked "..." menu on latest deployment
□ Clicked "Redeploy"
□ Waited for redeployment to complete
```

---

## ✅ STEP 6: TEST YOUR APP (2 minutes)

```
□ Copied your Vercel URL: https://__________________.vercel.app
□ Opened URL in browser
□ Saw animated X loading spinner ✓
□ Data loaded (not stuck on loading) ✓
□ Tested on DESKTOP:
    □ Schedule page loads
    □ Map page loads
    □ Zoom controls work
    □ Drag map works when zoomed
    □ Search/filters work
    □ Clicking map areas navigates to schedule
    □ Can save favorites to My Agenda
□ Tested on MOBILE:
    □ Opened URL on phone
    □ All pages responsive
    □ Touch zoom/drag works
    □ All interactions smooth
```

---

## ✅ STEP 7: SHARE WITH TEAM

```
□ Production URL: https://__________________.vercel.app
□ Shared with team via email/Slack
□ Created QR code (optional): qr-code-generator.com
□ Added to event materials
```

---

## 🎯 Optional: CUSTOM DOMAIN

```
□ Bought domain or have existing one
□ In Vercel: Settings > Domains
□ Added domain: schedule.dittomusic.com (or your domain)
□ Updated DNS records (Vercel shows exact records)
□ Waited for SSL (automatic, ~1 min)
□ Tested custom domain works
```

---

## 📊 MONITORING SETUP

```
□ Bookmarked Vercel dashboard
□ Checked "Functions" tab for API logs
□ Set up Vercel Analytics (optional)
□ Scheduled pre-event test (day before)
```

---

## 🐛 IF SOMETHING GOES WRONG

**Data not loading?**
```
□ Checked Vercel > Functions tab for errors
□ Verified WEBFLOW_API_TOKEN is set correctly
□ Tried: Deployments > Redeploy
```

**GitHub push failed?**
```
□ Ran: git remote -v (check URL is correct)
□ Ran: git pull origin main --rebase
□ Ran: git push
```

**Can't find project on Vercel?**
```
□ Made sure I'm logged into correct Vercel account
□ Checked GitHub account is connected to Vercel
□ Tried re-importing from GitHub
```

---

## ✨ SUCCESS CRITERIA

Your deployment is COMPLETE when:

```
✅ Code is on GitHub
✅ App is deployed on Vercel
✅ Environment variable is set
✅ App loads data from Webflow
✅ All features work on desktop
✅ All features work on mobile
✅ URL shared with team
✅ Monitoring dashboard accessible
```

---

## 📞 NEED HELP?

- 📖 Full Guide: GITHUB_VERCEL_DEPLOY.md
- ⚡ Quick Start: QUICK_START.md
- 🔧 Vercel Docs: https://vercel.com/docs
- 💬 Vercel Support: vercel.com/support

---

## 🎉 CONGRATULATIONS!

Your Ditto X Schedule App is now LIVE! 🎵

**Share this URL at your event:**

https://__________________.vercel.app

---

**Deployment completed by:** __________________

**Date:** __________________

**Production URL:** __________________

**GitHub Repo:** __________________
