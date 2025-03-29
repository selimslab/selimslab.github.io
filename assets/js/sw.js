---
layout: none
---

importScripts('/assets/js/workbox.js');

const { registerRoute } = workbox.routing;
const { CacheFirst, NetworkFirst, StaleWhileRevalidate } = workbox.strategies;
const { CacheableResponse } = workbox.cacheableResponse;
const {warmStrategyCache} =  workbox.recipes;

const prefix = 'delta';
const suffix = new Date().toISOString().split('T')[0]; // YYYY-MM-DD

workbox.core.setCacheNameDetails({
  prefix,
  suffix
});

registerRoute(
  ({request}) => request.destination === 'image' ,
  new CacheFirst({
    plugins: [
      new CacheableResponse({statuses: [0, 200]})
    ],
  })
);

registerRoute(
  '/',
  new NetworkFirst()
);

registerRoute(
  new RegExp('\/.+\/.+'),
  new NetworkFirst()
);


registerRoute(
  new RegExp('\/assets\/static\/.+'),
  new CacheFirst()
);

registerRoute(
  new RegExp('\/assets\/fav\/.+'),
  new NetworkFirst()
);


const clearOldCaches = async () => {
  const cacheNames = await caches.keys();
  await Promise.all(
    cacheNames.map((cacheName) => {
      if (cacheName.startsWith(prefix) && cacheName !== workbox.core.cacheNames.current) {
        return caches.delete(cacheName);
      }
    })
  );
}

let urls;

(async () => {
  urls = await fetch('/assets/data/urls.json').then(res => res.json());
})();

const strategy = new NetworkFirst();
warmStrategyCache({urls, strategy});
clearOldCaches();




