---
layout: none
---

importScripts('/assets/js/workbox.js');

const { registerRoute } = workbox.routing;
const { CacheFirst, NetworkFirst, StaleWhileRevalidate } = workbox.strategies;
const { CacheableResponse } = workbox.cacheableResponse;
const {warmStrategyCache, pageCache, imageCache, staticResourceCache, googleFontsCache, offlineFallback} =  workbox.recipes;

const prefix = 'delta';
const suffix = "t"

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
  new RegExp('\/assets\/static\/.+'),
  new CacheFirst()
);

registerRoute(
  new RegExp('\/.+'),
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

const urls = [
  {% for page in site.pages -%}
  '{{ page.url }}',
  {% endfor -%}
  {% for doc in site.documents -%}
  '{{ doc.url }}',
  {% endfor -%}
  '/'
];

const strategy = new NetworkFirst();
warmStrategyCache({urls, strategy});

pageCache();

googleFontsCache();

staticResourceCache();

imageCache();

offlineFallback();


