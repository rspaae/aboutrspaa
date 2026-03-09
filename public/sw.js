const CACHE_NAME = 'rspaa-portfolio-v1';

// Assets to pre-cache on install
const PRECACHE_ASSETS = [
    '/',
    '/manifest.json',
    '/icons/icon-192.png',
    '/icons/icon-512.png',
    '/profile.jpg',
];

// Install: pre-cache essential assets
self.addEventListener('install', (event) => {
    event.waitUntil(
        caches.open(CACHE_NAME).then((cache) => {
            return cache.addAll(PRECACHE_ASSETS);
        })
    );
    // Activate immediately
    self.skipWaiting();
});

// Activate: clean up old caches
self.addEventListener('activate', (event) => {
    event.waitUntil(
        caches.keys().then((cacheNames) => {
            return Promise.all(
                cacheNames
                    .filter((name) => name !== CACHE_NAME)
                    .map((name) => caches.delete(name))
            );
        })
    );
    // Take control of all clients immediately
    self.clients.claim();
});

// Fetch: network-first for navigation, cache-first for assets
self.addEventListener('fetch', (event) => {
    const { request } = event;

    // Skip non-GET requests
    if (request.method !== 'GET') return;

    // Skip chrome-extension and other non-http(s) requests
    if (!request.url.startsWith('http')) return;

    // Navigation requests: network-first
    if (request.mode === 'navigate') {
        event.respondWith(
            fetch(request)
                .then((response) => {
                    // Cache successful navigation responses
                    const responseClone = response.clone();
                    caches.open(CACHE_NAME).then((cache) => {
                        cache.put(request, responseClone);
                    });
                    return response;
                })
                .catch(() => {
                    // Fallback to cache
                    return caches.match(request).then((cached) => {
                        return cached || caches.match('/');
                    });
                })
        );
        return;
    }

    // Static assets: cache-first
    if (
        request.url.match(/\.(js|css|png|jpg|jpeg|svg|webp|woff2?|ttf|ico)$/) ||
        request.url.includes('fonts.googleapis.com') ||
        request.url.includes('fonts.gstatic.com')
    ) {
        event.respondWith(
            caches.match(request).then((cached) => {
                if (cached) return cached;

                return fetch(request).then((response) => {
                    // Only cache successful responses
                    if (response.ok) {
                        const responseClone = response.clone();
                        caches.open(CACHE_NAME).then((cache) => {
                            cache.put(request, responseClone);
                        });
                    }
                    return response;
                }).catch(() => {
                    // Return nothing for failed asset requests
                    return new Response('', { status: 408, statusText: 'Offline' });
                });
            })
        );
        return;
    }

    // API requests: network-only (no caching for dynamic data like GitHub/Spotify)
    event.respondWith(
        fetch(request).catch(() => {
            return new Response(JSON.stringify({ error: 'Offline' }), {
                status: 503,
                headers: { 'Content-Type': 'application/json' },
            });
        })
    );
});
