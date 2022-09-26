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
  '/essais',
  '/tech',
  '/algorithms',
  '/projects',
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

const staleWhileRevalidateStrategy = new StaleWhileRevalidate();
warmStrategyCache({urls, staleWhileRevalidateStrategy});

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
  new RegExp('\/.+\/'),
  staleWhileRevalidateStrategy
);

registerRoute(
  new RegExp('\/^(static)\/.+'),
  staleWhileRevalidateStrategy
);

registerRoute(
  new RegExp('/static/.+'),
  new CacheFirst()
);
