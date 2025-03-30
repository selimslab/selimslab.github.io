---
layout: none
---

importScripts('/assets/js/workbox.js');

const { registerRoute } = workbox.routing;
const { CacheFirst, NetworkFirst, StaleWhileRevalidate } = workbox.strategies;
const { CacheableResponse } = workbox.cacheableResponse;
const {warmStrategyCache} =  workbox.recipes;

const prefix = 'delta';
const suffix = "t"

workbox.core.setCacheNameDetails({
  prefix,
  suffix
});

const staticStrategy =   new CacheFirst({
  cacheName: 'delta-static-assets',
  plugins: [
    new CacheableResponse({statuses: [0, 200]})
  ],
})

registerRoute(
  ({request}) => 
    request.destination === 'image' || 
    request.url.includes('/assets/static/'),
    staticStrategy
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

const strategy = new StaleWhileRevalidate();
warmStrategyCache({urls, strategy});




