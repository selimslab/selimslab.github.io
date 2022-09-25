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

registerRoute(
  new RegExp('/\\d{4}/\\d{2}/\\d{2}/.+'),
  new StaleWhileRevalidate()
)

registerRoute(
  ({request}) => request.destination === 'image' ,
  new CacheFirst({
    plugins: [
      new CacheableResponse({statuses: [0, 200]})
    ],
  })
);

registerRoute(
  /static\//,
  new CacheFirst()
);


registerRoute(
  /essais\//,
  new StaleWhileRevalidate()
);

registerRoute(
  /tech\//,
  new StaleWhileRevalidate()
);

registerRoute(
  /algo\//,
  new StaleWhileRevalidate()
);

registerRoute(
  /links\//,
  new StaleWhileRevalidate()
);

registerRoute(
  /projects\//,
  new StaleWhileRevalidate()
);

// registerRoute(
//   /assets\/js/,
//   new StaleWhileRevalidate()
// );

registerRoute(
  new RegExp('/assets/.+/.+'),
  new StaleWhileRevalidate()
);

