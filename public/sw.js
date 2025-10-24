// Ditto X 25 - Service Worker
// Version 1.0.0

const CACHE_VERSION = 'dittox25-v1.0.0';
const API_CACHE = 'dittox25-api-v1.0.0';
const IMAGE_CACHE = 'dittox25-images-v1.0.0';

// Files to cache immediately on install
const STATIC_ASSETS = [
    '/',
    '/index.html',
    '/manifest.json',
    '/fonts/Neusa-Bold.otf',
    '/fonts/Neusa-Medium.otf',
    '/fonts/Satoshi-Regular.woff',
    '/fonts/Satoshi-Medium.woff',
    '/fonts/Satoshi-Bold.woff',
    // Venue maps
    'https://cdn.prod.website-files.com/655e0fa544c67c1ee5ce01a4/68fb46ee67d4cdc1e9e7c1fd_DX25_Ground%20Floor.webp',
    'https://cdn.prod.website-files.com/655e0fa544c67c1ee5ce01a4/68fb46ee6ccb844ca97ce83f_DX25_Upstairs.webp',
    'https://cdn.prod.website-files.com/655e0fa544c67c1ee5ce01a4/68fb46ee3743b02cea6fcf70_DX25_O2%20Lounge.webp',
    // Navigation icons
    'https://cdn.prod.website-files.com/655e0fa544c67c1ee5ce01a4/68fb7fe2c713ccd9ee11fdcc_home_DX.svg',
    'https://cdn.prod.website-files.com/655e0fa544c67c1ee5ce01a4/68fb7fe2a1ffd936855f4f04_schedule_DX.svg',
    'https://cdn.prod.website-files.com/655e0fa544c67c1ee5ce01a4/68fb7fe26572868589be04a6_Agenda_DX.svg',
    'https://cdn.prod.website-files.com/655e0fa544c67c1ee5ce01a4/68fb7fe2beea8175785e1af0_Map_DX.svg',
    'https://cdn.prod.website-files.com/655e0fa544c67c1ee5ce01a4/68fb7fe24ce680144a604a8d_Extras_DX.svg',
    // Loading icon
    'https://cdn.prod.website-files.com/655e0fa544c67c1ee5ce01a4/655e0fa544c67c1ee5ce040f_dittoxicon-white.svg'
];

// Install event - cache static assets
self.addEventListener('install', (event) => {
    console.log('🔧 Service Worker: Installing...');
    
    event.waitUntil(
        caches.open(CACHE_VERSION)
            .then((cache) => {
                console.log('📦 Service Worker: Caching static assets...');
                return cache.addAll(STATIC_ASSETS);
            })
            .then(() => {
                console.log('✅ Service Worker: Installation complete');
                return self.skipWaiting(); // Activate immediately
            })
            .catch((error) => {
                console.error('❌ Service Worker: Installation failed:', error);
            })
    );
});

// Activate event - clean up old caches
self.addEventListener('activate', (event) => {
    console.log('🚀 Service Worker: Activating...');
    
    event.waitUntil(
        caches.keys()
            .then((cacheNames) => {
                return Promise.all(
                    cacheNames.map((cacheName) => {
                        // Delete old caches
                        if (cacheName !== CACHE_VERSION && 
                            cacheName !== API_CACHE && 
                            cacheName !== IMAGE_CACHE) {
                            console.log('🗑️ Service Worker: Deleting old cache:', cacheName);
                            return caches.delete(cacheName);
                        }
                    })
                );
            })
            .then(() => {
                console.log('✅ Service Worker: Activation complete');
                return self.clients.claim(); // Take control immediately
            })
    );
});

// Fetch event - serve from cache, fallback to network
self.addEventListener('fetch', (event) => {
    const { request } = event;
    const url = new URL(request.url);
    
    // Handle API requests differently
    if (url.pathname.startsWith('/api/')) {
        event.respondWith(handleApiRequest(request));
        return;
    }
    
    // Handle image requests
    if (request.destination === 'image' || 
        url.hostname === 'cdn.prod.website-files.com') {
        event.respondWith(handleImageRequest(request));
        return;
    }
    
    // Handle all other requests (HTML, CSS, JS, fonts)
    event.respondWith(handleStaticRequest(request));
});

// Strategy: Cache First, fallback to Network
async function handleStaticRequest(request) {
    try {
        // Try cache first
        const cachedResponse = await caches.match(request);
        if (cachedResponse) {
            console.log('📦 Serving from cache:', request.url);
            return cachedResponse;
        }
        
        // If not in cache, fetch from network
        console.log('🌐 Fetching from network:', request.url);
        const networkResponse = await fetch(request);
        
        // Cache the response for next time
        if (networkResponse && networkResponse.status === 200) {
            const cache = await caches.open(CACHE_VERSION);
            cache.put(request, networkResponse.clone());
        }
        
        return networkResponse;
        
    } catch (error) {
        console.error('❌ Fetch failed:', error);
        // Return offline page or error
        return new Response('Offline - Please check your connection', {
            status: 503,
            statusText: 'Service Unavailable'
        });
    }
}

// Strategy: Network First, fallback to Cache (for fresh data)
async function handleApiRequest(request) {
    try {
        console.log('🌐 Fetching API data from network:', request.url);
        
        // Try network first (we want fresh data)
        const networkResponse = await fetch(request);
        
        if (networkResponse && networkResponse.status === 200) {
            // Cache the fresh response
            const cache = await caches.open(API_CACHE);
            cache.put(request, networkResponse.clone());
            console.log('✅ API data cached');
            return networkResponse;
        }
        
        throw new Error('Network response not ok');
        
    } catch (error) {
        // Network failed, try cache
        console.log('📦 Network failed, trying cache for:', request.url);
        const cachedResponse = await caches.match(request);
        
        if (cachedResponse) {
            console.log('✅ Serving stale API data from cache');
            return cachedResponse;
        }
        
        // No cache either, return error
        console.error('❌ No cached API data available');
        return new Response(JSON.stringify({
            error: 'Offline and no cached data available',
            offline: true
        }), {
            status: 503,
            headers: { 'Content-Type': 'application/json' }
        });
    }
}

// Strategy: Cache First for images (they don't change often)
async function handleImageRequest(request) {
    try {
        // Check cache first
        const cachedResponse = await caches.match(request);
        if (cachedResponse) {
            return cachedResponse;
        }
        
        // Not in cache, fetch from network
        const networkResponse = await fetch(request);
        
        if (networkResponse && networkResponse.status === 200) {
            // Cache the image
            const cache = await caches.open(IMAGE_CACHE);
            cache.put(request, networkResponse.clone());
        }
        
        return networkResponse;
        
    } catch (error) {
        console.error('❌ Image fetch failed:', error);
        // Could return a placeholder image here
        return new Response('', { status: 404 });
    }
}

// Listen for messages from the app
self.addEventListener('message', (event) => {
    if (event.data && event.data.type === 'SKIP_WAITING') {
        self.skipWaiting();
    }
    
    if (event.data && event.data.type === 'CLEAR_CACHE') {
        event.waitUntil(
            caches.keys().then((cacheNames) => {
                return Promise.all(
                    cacheNames.map((cacheName) => caches.delete(cacheName))
                );
            })
        );
    }
});

console.log('🎉 Service Worker: Loaded and ready!');
