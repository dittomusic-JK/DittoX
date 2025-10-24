# 🎯 START HERE - Deploy to GitHub + Vercel

## 🚀 Deploy Your Ditto X App in 5 Minutes

### Prerequisites
- GitHub account (free at github.com)
- Vercel account (free at vercel.com - sign in with GitHub)
- Your Webflow API token

---

## ⚡ Quick Deploy (Copy & Paste Commands)

### 1️⃣ Setup (1 minute)

Download all files and put them in a folder, then:

```bash
cd dittox-schedule-app
chmod +x setup.sh
./setup.sh
```

Your files are now organized! ✅

---

### 2️⃣ GitHub (2 minutes)

**Create repo:** https://github.com/new
- Name: `dittox-schedule-app`
- Don't add README or .gitignore
- Click "Create"

**Push code:**
```bash
git add .
git commit -m "Initial commit"
git remote add origin https://github.com/YOUR_USERNAME/dittox-schedule-app.git
git branch -M main
git push -u origin main
```

Replace `YOUR_USERNAME` with your GitHub username! ✅

---

### 3️⃣ Vercel (2 minutes)

**Deploy:**
1. Go to: https://vercel.com/new
2. Click "Import Git Repository"
3. Select your `dittox-schedule-app` repo
4. Click "Deploy" (leave everything as default)

**Add API token:**
1. While deploying (or after), go to "Settings" tab
2. Click "Environment Variables"
3. Add: 
   - Name: `WEBFLOW_API_TOKEN`
   - Value: [paste your token]
4. Click "Save"
5. Go to "Deployments", click "..." → "Redeploy"

Done! ✅

---

### 4️⃣ Test (1 minute)

Visit your URL: `https://dittox-schedule-app.vercel.app`

Should see:
- ✅ Spinning X animation
- ✅ Schedule loads
- ✅ Maps work
- ✅ All features functional

---

## 🎉 That's It!

Your app is **LIVE** and will **auto-deploy** whenever you push to GitHub!

---

## 📚 Need More Help?

**Start Here:** `QUICK_START.md` (5-minute guide)
**Detailed Guide:** `GITHUB_VERCEL_DEPLOY.md` (everything explained)
**Checklist:** `DEPLOYMENT_CHECKLIST_GITHUB_VERCEL.md` (print & follow)
**File Info:** `FILE_MANIFEST.md` (what each file does)

---

## 🔄 Make Updates

```bash
# Edit files
git add .
git commit -m "Your update message"
git push

# Vercel deploys automatically! 🚀
```

---

## 🌐 Your URLs

**Production:** `https://your-app.vercel.app`
**GitHub:** `https://github.com/your-username/dittox-schedule-app`

---

## ❓ Troubleshooting

**"Data not loading"**
→ Check you added WEBFLOW_API_TOKEN in Vercel
→ Go to Settings > Environment Variables
→ Redeploy after adding

**"git push failed"**
→ Make sure you replaced YOUR_USERNAME in the git remote command
→ Try: `git remote -v` to check it's correct

**"Can't find my project in Vercel"**
→ Make sure you're signed into Vercel with same GitHub account
→ Try importing the repo again

---

## 🎯 Success!

Once these 4 steps are done:
- ✅ Code is on GitHub
- ✅ App is deployed to Vercel
- ✅ API token is configured
- ✅ App is working and live

**Share your URL with the world!** 🎵

---

Built with ❤️ for Ditto X 2025
Thursday 20th November • Indigo at The O2
