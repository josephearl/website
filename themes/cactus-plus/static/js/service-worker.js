var version = 'v1';
var cacheName = 'josephearl.co.uk::' + version + '::static';

self.addEventListener('install', e => {
  e.waitUntil(
    caches.open(cacheName).then(function(cache) {
      return cache.addAll([
        // Assets
        '/',
        '/css/style.css',
        '/fonts/icons.woff',
        '/js/lunr.js',
        '/js/main.js',
        '/js/search.js',
        '/js/highlight.js'
      ]).then(function() {self.skipWaiting()});
    })
  );
});

self.addEventListener('activate', function(event) {
  event.waitUntil(
    caches.keys().then(function(keys) {
      return Promise.all(
        keys.filter(function(key) {
          return key.indexOf(version) !== 0;
        }).map(function(key) {
          return caches.delete(key);
        })
      );
    })
  );
});

self.addEventListener('fetch', function(event) {
  // Don't handle anything that's not a get
  var request = event.request;
  if (request.method !== 'GET') {
    event.respondWith(fetch(request));
    return;
  }
  event.respondWith(
    caches.open(cacheName).then(function(cache) {
      return cache.match(event.request).then(function(response) {
        return response || fetch(event.request).then(function(netresponse) {
          // Cache posts
          if (netresponse.url.match(/\/post\//)) {
            cache.put(request, netresponse);
          }
          return netresponse;
        });
      });
    })
  );
});
