importScripts('/assets/js/workbox.js');

const { registerRoute } = workbox.routing;
const { CacheFirst, StaleWhileRevalidate } = workbox.strategies;
const { CacheableResponse } = workbox.cacheableResponse;
const { warmStrategyCache } = workbox.recipes;

const staticStrategy =   new CacheFirst({
  cacheName: 'static-assets',
  plugins: [
    new CacheableResponse({statuses: [0, 200]})
  ],
})

const pageStrategy = new StaleWhileRevalidate({
  cacheName: 'pages',
  plugins: [
    new CacheableResponse({statuses: [0, 200]})
  ],
});


registerRoute(
  ({request}) => 
    request.destination === 'image' || 
    request.url.includes('/assets/static/'),
    staticStrategy
);


registerRoute(
  ({request}) => request.mode === 'navigate',
  pageStrategy
);

const fetchUrls = async () => {
  const urls = await fetch('/assets/data/urls.json').then(res => res.json());
  return urls;
}

self.addEventListener('install', event => {
  event.waitUntil(fetchUrls().then(urls => warmStrategyCache({urls, strategy: pageStrategy})));
});


