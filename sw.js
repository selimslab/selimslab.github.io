---
layout: none
---

let urls = [
  {% for doc in site.documents -%}
  '{{ doc.url }}',
  {% endfor -%}
  '/'
];

urls = urls.filter(url => url !== '');

importScripts('/assets/js/workbox.js');

const { registerRoute } = workbox.routing;
const { CacheFirst, NetworkFirst, StaleWhileRevalidate } = workbox.strategies;
const { CacheableResponse } = workbox.cacheableResponse;

const prefix = 'delta';
const suffix = "t"

workbox.core.setCacheNameDetails({
  prefix,
  suffix
});

registerRoute(
  new RegExp('\/.+'),
  new StaleWhileRevalidate()
);

const staticStrategy =  new CacheFirst({
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

workbox.precaching.precacheAndRoute(
  urls.map(url => ({url, revision: '{{ site.time | date: "%s" }}'}))
);


self.addEventListener('install', (event) => {
  console.log('Service worker installing...');
  self.skipWaiting();
});

self.addEventListener('activate', (event) => {
  console.log('Service worker activating...');
  self.clients.claim();
});