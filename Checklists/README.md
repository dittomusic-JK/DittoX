# Ditto X 2025 Schedule App 🎵

A beautiful, interactive schedule and venue map app for the Ditto X 2025 event at Indigo at The O2.

## ✨ Features

- **📅 Full Event Schedule** - Browse all sessions, talks, and performances
- **🗺️ Interactive Venue Maps** - Zoomable, draggable maps of all 3 floors
- **⭐ Personal Agenda** - Save your favorite sessions (persists in browser)
- **🏢 Industry Market** - View exhibitors and their table locations
- **🎁 Extras** - Win £250 Instagram competition, merch store, discount codes
- **🔍 Smart Search** - Filter by stage, type, or search sessions
- **📱 Mobile-First Design** - Beautiful UI optimized for phones
- **🎨 Animated Loading** - Cool spinning X logo with fun messages

## 🚀 Quick Start

### Development

1. **Install dependencies:**
   ```bash
   npm install
   ```

2. **Create `.env` file:**
   ```bash
   cp .env.example .env
   # Add your Webflow API token
   ```

3. **Start proxy server:**
   ```bash
   npm start
   ```

4. **Open HTML file:**
   - Open `ditto-x-cms-connected.html` in your browser
   - Should auto-connect to proxy at `http://localhost:3000`

### Production Deployment

See [DEPLOYMENT_GUIDE.md](DEPLOYMENT_GUIDE.md) for detailed instructions.

**TL;DR:**
1. Deploy proxy to Vercel: `vercel`
2. Update `API_BASE` in HTML to your Vercel URL
3. Deploy HTML to Netlify Drop

## 📁 Files

- `ditto-x-cms-connected.html` - Main app (frontend)
- `webflow-proxy.js` - Proxy server (backend)
- `package.json` - Node.js dependencies
- `vercel.json` - Vercel deployment config
- `.env.example` - Environment variables template
- `DEPLOYMENT_GUIDE.md` - Full deployment instructions

## 🎯 Tech Stack

**Frontend:**
- Pure HTML/CSS/JavaScript (no frameworks!)
- Webflow CDN for images
- LocalStorage for favorites

**Backend:**
- Node.js + Express
- Webflow CMS API v2
- CORS enabled
- Rate limiting (100 req/hour)

## 🔧 Configuration

### Webflow Collections

Update collection IDs in `webflow-proxy.js`:

```javascript
const COLLECTION_IDS = {
    speakers: '655e0fa544c67c1ee5ce01cb',
    schedule: '655e0fa544c67c1ee5ce01c9',
    sponsors: '655e0fa544c67c1ee5ce01d2',
    stages: '655e0fa544c67c1ee5ce01c8',
    exhibitors: '686d0e5c8b5fa9db95a0e47e'
};
```

### API Endpoints

- `GET /api/health` - Health check
- `GET /api/all-data` - All collections (recommended)
- `GET /api/speakers` - Speakers only
- `GET /api/schedule` - Schedule with relationships
- `GET /api/sponsors` - Sponsors only
- `GET /api/stages` - Stages only
- `GET /api/exhibitors` - Exhibitors only

## 🎨 Customization

### Loading Messages

Edit fun loading messages in HTML (line ~696):

```javascript
const loadingMessages = [
    'Connecting to the vibe',
    'Sorting your schedule',
    'Tuning the frequencies',
    // Add your own!
];
```

### Colors

Main brand colors used:
- Teal: `#00ff99`
- Purple: `#7e00e9`
- Orange: `#ff7201`
- Dark: `#070707`

### Maps

Maps are real venue images with SVG overlays for clickable areas. Update image URLs in HTML (search for `.webp`).

## 📱 Browser Support

- ✅ Chrome/Edge (recommended)
- ✅ Safari (iOS/macOS)
- ✅ Firefox
- ✅ Mobile browsers

## 🔒 Security

- API token stored in environment variables (never in code)
- Rate limiting prevents abuse
- CORS configured for your domain only (in production)
- No sensitive data in localStorage

## 📊 Performance

- Single HTML file (~2.2k lines, ~110KB)
- All images on Webflow CDN
- Data cached in memory after first load
- Works offline after initial load (favorites persist)

## 🐛 Known Issues

None currently! 🎉

## 📞 Support

For issues or questions:
1. Check browser console for errors
2. Verify proxy is running: visit `/api/health`
3. Check Webflow API token is valid
4. Review [DEPLOYMENT_GUIDE.md](DEPLOYMENT_GUIDE.md)

## 📝 License

© 2025 Ditto Music. All rights reserved.

---

**Built with ❤️ for Ditto X 2025**

🎤 Thursday 20th November • Indigo at The O2
