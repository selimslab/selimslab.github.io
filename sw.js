---
layout: none
---
importScripts('https://storage.googleapis.com/workbox-cdn/releases/6.4.1/workbox-sw.js');

const { registerRoute } = workbox.routing;
const { CacheFirst, NetworkFirst, StaleWhileRevalidate } = workbox.strategies;
const { CacheableResponse } = workbox.cacheableResponse;

workbox.core.setCacheNameDetails({
  prefix: 'selimslab',
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




registerRoute(
  new RegExp('\/assets\/.+\/.+'),
  new StaleWhileRevalidate()
);

registerRoute(
  new RegExp('\/.+\/.+'),
  new StaleWhileRevalidate()
);

registerRoute(
  /static\//,
  new CacheFirst()
);

workbox.routing.registerRoute(
  /.*\.html/,
  workbox.strategies.staleWhileRevalidate({  
      cacheName: 'HTML-CACHE',
  })
);

workbox.precaching.precacheAndRoute([
  {% for post in site.essais -%}
    { url: '{{ post.url }}', revision: '{{ post.last_modified_at }}' },
  {% endfor -%}
  {% for post in site.tech -%}
    { url: '{{ post.url }}', revision: '{{ post.last_modified_at }}' },
  {% endfor -%}
  {% for post in site.algo -%}
    { url: '{{ post.url }}', revision: '{{ post.last_modified_at }}' },
  {% endfor -%}
  { url: '/', revision: '{{ site.time | date: "%Y%m%d%H%M%S" }}' }
]);

self.addEventListener('install', (event) => {
  let urls = []
  {% for post in site.essais -%}
    urls.push('{{ post.url }}')
  {% endfor -%}
  {% for post in site.tech -%}
    urls.push('{{ post.url }}')
  {% endfor -%}
  {% for post in site.algo -%}
  urls.push('{{ post.url }}')
  {% endfor -%}
  event.waitUntil(caches.open('HTML-CACHE').then((cache) => cache.addAll(urls)));
});