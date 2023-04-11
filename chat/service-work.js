const CACHE_NAME = 'my-pwa-cache-v1';
const urlsToCache = [
  '/',
];

self.addEventListener('install', function(event) {
  event.waitUntil(
    caches.open(CACHE_NAME)
      .then(function(cache) {
        console.log('Opened cache');
        return cache.addAll(urlsToCache);
      })
  );
});

self.addEventListener('fetch', function(event) {
  event.respondWith(
    caches.match(event.request)
      .then(function(response) {
        if (response) {
          return response;
        }

        return fetch(event.request)
          .then(function(response) {
            // Clone the response to be able to modify headers
            const responseToCache = response.clone();

            // Add the Access-Control-Allow-Origin header to the response
            const headers = new Headers(response.headers);
            headers.set('Access-Control-Allow-Origin', '*');

            // Create a new response with modified headers
            const modifiedResponse = new Response(responseToCache.body, {
              status: response.status,
              statusText: response.statusText,
              headers: headers
            });

            // Cache the modified response
            caches.open(CACHE_NAME)
              .then(function(cache) {
                cache.put(event.request, modifiedResponse);
              });

            // Return the original response to the page
            return response;
          });
      })
  );
});
