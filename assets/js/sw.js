---
layout: none
---

importScripts('/assets/js/workbox.js');

const { registerRoute } = workbox.routing;
const { CacheFirst, NetworkFirst, StaleWhileRevalidate } = workbox.strategies;
const { CacheableResponse } = workbox.cacheableResponse;
const {warmStrategyCache} =  workbox.recipes;

workbox.core.setCacheNameDetails({
  prefix: 'notes',
  suffix: '{{ site.time | date: "%Y-%m" }}'
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


const urls = [
  {% for page in site.pages -%}
  '{{ page.url }}',
  {% endfor -%}
  {% for doc in site.documents -%}
  '{{ doc.url }}',
  {% endfor -%}
  '/'
];

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


const clearCaches = async () => {
  const cacheNames = await caches.keys();
  await Promise.all(
    cacheNames.map((cacheName) => {
      if (cacheName.startsWith('notes') && cacheName !== workbox.core.cacheNames.current) {
        return caches.delete(cacheName);
      }
    })
  );
}

const warmCache = () => {
  clearCaches();
  const strategy = new NetworkFirst();
  warmStrategyCache({urls, strategy});
}

warmCache();



