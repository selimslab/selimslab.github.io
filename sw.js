---
layout: none
---
importScripts('https://storage.googleapis.com/workbox-cdn/releases/6.4.1/workbox-sw.js');

const { registerRoute } = workbox.routing;
const { CacheFirst, NetworkFirst, StaleWhileRevalidate } = workbox.strategies;
const { CacheableResponse } = workbox.cacheableResponse;
const {warmStrategyCache} =  workbox.recipes;

workbox.core.setCacheNameDetails({
  prefix: 'notes',
  suffix: '{{ site.time | date: "%Y-%m" }}'
});


const urls = [
  {% for post in site.essais -%}
  '{{ post.url }}',
  {% endfor -%}
  {% for post in site.tech -%}
  '{{ post.url }}',
    {% endfor -%}
  {% for post in site.algorithms -%}
  '{{ post.url }}',
    {% endfor -%}
  {% for post in site.projects -%}
  '{{ post.url }}',
    {% endfor -%}
  "/"
];

const strategy = new StaleWhileRevalidate();
warmStrategyCache({urls, strategy});

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
  new RegExp('\/essais\/.+'),
  strategy
);

registerRoute(
  new RegExp('\/tech\/.+'),
  strategy
);

registerRoute(
  new RegExp('\/algorithms\/.+'),
  strategy
);

registerRoute(
  new RegExp('\/projects\/.+'),
  strategy
);


registerRoute(
  new RegExp('\/assets\/.+'),
  strategy
);

registerRoute(
  new RegExp('/static/.+'),
  new CacheFirst()
);
