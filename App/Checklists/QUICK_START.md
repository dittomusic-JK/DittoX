# ⚡ Quick Start - GitHub + Vercel (5 Minutes)

## 📦 Step 1: Download & Setup (1 min)

Download all files from Claude and put them in a folder called `dittox-schedule-app`

Run the setup script:
```bash
cd dittox-schedule-app
chmod +x setup.sh
./setup.sh
```

This organizes files into:
```
dittox-schedule-app/
├── api/
│   └── all-data.js       ← Backend
├── public/
│   └── index.html        ← Frontend
├── package.json
├── vercel.json
└── .gitignore
```

---

## 🐙 Step 2: Push to GitHub (2 min)

### Create GitHub Repo
1. Go to: https://github.com/new
2. Name: `dittox-schedule-app`
3. Don't add README or .gitignore
4. Click "Create repository"

### Push Code
```bash
git add .
git commit -m "Initial commit"
git remote add origin https://github.com/YOUR_USERNAME/dittox-schedule-app.git
git branch -M main
git push -u origin main
```

✅ **Done!** Your code is on GitHub

---

## ☁️ Step 3: Deploy to Vercel (2 min)

### Connect GitHub
1. Go to: https://vercel.com/new
2. Click "Import Git Repository"
3. Select `dittox-schedule-app`
4. Click "Import"

### Configure (leave defaults):
- **Framework Preset:** Other
- **Root Directory:** (leave blank)
- **Build Command:** (leave blank)
- **Output Directory:** public

Click **"Deploy"**

### Add API Token
1. While deploying, click "Environment Variables"
2. Add:
   - **Name:** `WEBFLOW_API_TOKEN`
   - **Value:** `paste_your_token_here`
   - Check all environments
3. Save

✅ **Done!** Your app is deploying

---

## 🎉 Step 4: Test Your App

Vercel gives you a URL like:
```
https://dittox-schedule-app.vercel.app
```

Visit it and:
- ✅ See animated loading spinner
- ✅ Data loads from Webflow
- ✅ Maps zoom/drag work
- ✅ Schedule filters work

---

## 🔄 Future Updates

**Just push to GitHub - it auto-deploys!**

```bash
# Make changes to files
git add .
git commit -m "Updated schedule"
git push

# Vercel automatically deploys! 🚀
```

---

## 🌐 Add Custom Domain (Optional)

In Vercel dashboard:
1. Go to Settings > Domains
2. Add: `schedule.dittomusic.com`
3. Update DNS (Vercel tells you how)
4. SSL is automatic ✅

---

## 📊 Monitor Your App

Vercel dashboard shows:
- Live logs
- Visitor analytics
- Function calls
- Errors

---

## ❓ Troubleshooting

**Can't see data?**
- Check Vercel logs: Functions tab
- Verify WEBFLOW_API_TOKEN is set
- Redeploy if you just added the token

**GitHub push failed?**
```bash
git remote -v  # Check remote URL is correct
git pull origin main --rebase  # Sync first
git push
```

**Need help?**
- Check: GITHUB_VERCEL_DEPLOY.md (full guide)
- Vercel Docs: https://vercel.com/docs

---

## ✅ Checklist

- [ ] Files organized (ran setup.sh)
- [ ] Pushed to GitHub
- [ ] Deployed to Vercel
- [ ] Added WEBFLOW_API_TOKEN
- [ ] Tested the live URL
- [ ] Shared URL with team

---

## 🎯 Your URLs

**Production:** `https://dittox-schedule-app.vercel.app`
**GitHub:** `https://github.com/YOUR_USERNAME/dittox-schedule-app`

Share at your event! 🎵
