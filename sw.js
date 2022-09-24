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
  '/',
  new NetworkFirst()
);


registerRoute(
  new RegExp('/\\d{4}/\\d{2}/\\d{2}/.+'),
  new StaleWhileRevalidate()
)

workbox.precaching.precacheAndRoute([
  {% for post in site.essais -%}
    { url: '{{ post.url }}', revision: '{{ post.date | date: "%Y-%m-%d"}}' },
  {% endfor -%}
  {% for post in site.tech -%}
    { url: '{{ post.url }}', revision: '{{ post.date | date: "%Y-%m-%d"}}' },
  {% endfor -%}
  {% for post in site.algo -%}
    { url: '{{ post.url }}', revision: '{{ post.date | date: "%Y-%m-%d"}}' },
  {% endfor -%}
  { url: '/', revision: '{{ site.time | date: "%Y%m%d%H%M" }}' }
])

registerRoute(
  ({request}) => request.destination === 'image' ,
  new CacheFirst({
    plugins: [
      new CacheableResponse({statuses: [0, 200]})
    ],
  })
);


// registerRoute(
//   /assets\/(images|icons|css)/,
//   new CacheFirst()
// );

registerRoute(
  /assets\//,
  new CacheFirst()
);


registerRoute(
  /essais\//,
  new NetworkFirst()
);

registerRoute(
  /tech\//,
  new NetworkFirst()
);

registerRoute(
  /algo\//,
  new NetworkFirst()
);