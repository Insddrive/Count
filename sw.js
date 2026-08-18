const CACHE_NAME = 'count-app-v2';
const urlsToCache = [
    './',
    './index.html',
    './manifest.json'
];

self.addEventListener('install', event => {
    event.waitUntil(
        caches.open(CACHE_NAME)
            .then(cache => {
                return cache.addAll(urlsToCache);
            })
    );
    self.skipWaiting(); // ਨਵੇਂ ਸਰਵਿਸ ਵਰਕਰ ਨੂੰ ਤੁਰੰਤ ਐਕਟਿਵ ਕਰਨ ਲਈ
});

self.addEventListener('activate', event => {
    event.waitUntil(
        caches.keys().then(cacheNames => {
            return Promise.all(
                cacheNames.map(cacheName => {
                    if (cacheName !== CACHE_NAME) {
                        return caches.delete(cacheName); // ਪੁਰਾਣੀ ਕੈਸ਼ ਕਲੀਅਰ ਕਰਨਾ
                    }
                })
            );
        })
    );
});

self.addEventListener('fetch', event => {
    event.respondWith(
        caches.match(event.request)
            .then(response => {
                return response || fetch(event.request);
            })
    );
});
