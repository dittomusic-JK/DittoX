# 📦 File Manifest - Ditto X Schedule App

## Your Files Explained

Here's what each file does and where it goes:

---

## 🚀 DEPLOYMENT FILES (Copy to your project folder)

### **index.html** ⭐ IMPORTANT
- **What:** Your main app (schedule, maps, agenda)
- **Goes in:** `public/` folder
- **Size:** ~110KB
- **Status:** Production-ready with `/api` routing

### **api-all-data.js** ⭐ IMPORTANT
- **What:** Vercel serverless function (fetches Webflow data)
- **Goes in:** `api/` folder (rename to `all-data.js`)
- **Size:** ~4KB
- **Status:** Production-ready for Vercel

### **package.json** ⭐ IMPORTANT
- **What:** Node.js dependencies
- **Goes in:** Root of project
- **Note:** Only needs `axios` (no Express needed for Vercel)

### **vercel.json** ⭐ IMPORTANT
- **What:** Vercel deployment configuration
- **Goes in:** Root of project
- **Configures:** Static site (public/) + API routes (api/)

### **.gitignore** ⭐ IMPORTANT
- **What:** Prevents committing secrets/dependencies
- **Goes in:** Root of project
- **Protects:** .env, node_modules, etc.

---

## 📖 DOCUMENTATION FILES (Reference guides)

### **QUICK_START.md** 🎯 START HERE
- **What:** 5-minute deployment guide
- **Best for:** First-time deployment
- **Includes:** Step-by-step with commands

### **GITHUB_VERCEL_DEPLOY.md** 📚 COMPREHENSIVE
- **What:** Complete deployment guide
- **Best for:** Detailed instructions
- **Includes:** Troubleshooting, monitoring, updates

### **DEPLOYMENT_CHECKLIST_GITHUB_VERCEL.md** ✅ PRINTABLE
- **What:** Print-friendly checklist
- **Best for:** Following along step-by-step
- **Includes:** Every single step to check off

### **README.md** 📄 PROJECT INFO
- **What:** Project overview and features
- **Best for:** Understanding the app
- **Includes:** Tech stack, features, configuration

### **DEPLOYMENT_GUIDE.md** 📋 ALTERNATIVES
- **What:** Multiple deployment options
- **Best for:** If not using GitHub/Vercel
- **Includes:** Netlify, Render, Railway options

---

## 🛠️ UTILITY FILES (Optional helpers)

### **setup.sh** 🔧 AUTOMATED SETUP
- **What:** Bash script to organize files
- **Run:** `chmod +x setup.sh && ./setup.sh`
- **Does:** Creates api/ and public/ folders, moves files

### **deploy.sh** 🚀 DEPLOYMENT HELPER
- **What:** Bash script for deployment
- **Run:** `./deploy.sh`
- **Does:** Guides through Vercel deployment

### **.env.example** 🔒 TEMPLATE
- **What:** Environment variable template
- **Use:** Reference for what variables to add in Vercel
- **Don't commit:** Real .env with actual tokens

---

## 📁 FOLDER STRUCTURE

After running `setup.sh`, your project should look like:

```
dittox-schedule-app/
│
├── api/                          ← Backend (Serverless)
│   └── all-data.js              ← Vercel function
│
├── public/                       ← Frontend (Static)
│   └── index.html               ← Your app
│
├── .gitignore                   ← Git configuration
├── package.json                 ← Dependencies
├── vercel.json                  ← Vercel config
├── README.md                    ← Project info
│
└── docs/                        ← Documentation (optional folder)
    ├── QUICK_START.md
    ├── GITHUB_VERCEL_DEPLOY.md
    └── DEPLOYMENT_CHECKLIST_GITHUB_VERCEL.md
```

---

## 🎯 WHAT TO DO NOW

### Option 1: Automated Setup (Recommended)
```bash
1. Download all files to a folder
2. Run: ./setup.sh
3. Follow: QUICK_START.md
```

### Option 2: Manual Setup
```bash
1. Create folder structure:
   mkdir -p api public
   
2. Move files:
   mv api-all-data.js api/all-data.js
   mv index.html public/index.html
   
3. Keep in root:
   - package.json
   - vercel.json
   - .gitignore
   - README.md
   
4. Follow: QUICK_START.md
```

---

## 📋 FILES BY PRIORITY

### MUST HAVE (Required for deployment):
1. ✅ index.html (→ public/)
2. ✅ api-all-data.js (→ api/all-data.js)
3. ✅ package.json
4. ✅ vercel.json
5. ✅ .gitignore

### RECOMMENDED (Makes life easier):
6. 📖 QUICK_START.md
7. 📖 GITHUB_VERCEL_DEPLOY.md
8. 🔧 setup.sh

### OPTIONAL (Nice to have):
9. 📖 README.md
10. 📖 DEPLOYMENT_CHECKLIST_GITHUB_VERCEL.md
11. 🔧 deploy.sh
12. 🔒 .env.example

---

## ⚠️ IMPORTANT NOTES

### Don't Commit:
- ❌ .env (actual secrets)
- ❌ node_modules/
- ❌ .vercel/
**(All in .gitignore)**

### Don't Need:
- ❌ webflow-proxy.js (old version, use api-all-data.js instead)
- ❌ ditto-x-cms-connected.html (renamed to index.html)

### Remember:
- ✅ Add WEBFLOW_API_TOKEN in Vercel dashboard (not in code!)
- ✅ index.html uses `/api` (not `http://localhost:3000/api`)
- ✅ api-all-data.js must be renamed to all-data.js in api/ folder

---

## 🔄 UPDATE WORKFLOW

After initial deployment, to update:

```bash
1. Make changes to files
2. git add .
3. git commit -m "Updated feature X"
4. git push
5. Vercel auto-deploys! ✨
```

---

## 📞 HELP

**Can't find a file?**
- Check downloads folder
- Look for computer:/// links in Claude

**File seems wrong?**
- Check this manifest
- Compare to folder structure above
- Re-download if needed

**Need more help?**
- Read: QUICK_START.md (simplest)
- Read: GITHUB_VERCEL_DEPLOY.md (detailed)
- Check: Vercel docs

---

## ✨ QUICK LINKS

**Your App Features:**
- Interactive venue maps (3 floors)
- Full event schedule with filters
- Personal agenda (saves favorites)
- Exhibitor directory
- Instagram competition
- Merch store links

**Deployment Target:**
- Frontend: Vercel static hosting
- Backend: Vercel serverless functions
- Database: Webflow CMS (via API)
- Cost: FREE tier is plenty

---

**Questions?** Check the guides or Vercel docs!

**Ready?** Start with: QUICK_START.md 🚀
