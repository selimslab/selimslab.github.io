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
const {warmStrategyCache} =  workbox.recipes;

const prefix = 'delta';
const suffix = "t"

workbox.core.setCacheNameDetails({
  prefix,
  suffix
});

const strategy = new StaleWhileRevalidate();

registerRoute(
  new RegExp('\/.+'),
  strategy
);

registerRoute(
  '/player',
  new NetworkFirst()
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

warmStrategyCache({urls, strategy});

// Handle messages from the client
self.addEventListener('message', event => {
  if (event.data && event.data.type === 'download_tracks') {
    downloadAllTracks(event.data.tracks, event.source);
  }
});

// Function to download and cache all tracks
async function downloadAllTracks(trackPaths, client) {
  const cache = await caches.open('delta-music-cache');
  let completed = 0;
  const total = trackPaths.length;
  
  // Report initial progress
  client.postMessage({
    type: 'download_progress',
    completed: 0,
    total: total
  });
  
  // Download each track and add to cache
  for (const path of trackPaths) {
    try {
      const response = await fetch(path);
      if (response.ok) {
        await cache.put(path, response);
      }
      completed++;
      
      // Report progress after each download and include the path
      client.postMessage({
        type: 'download_progress',
        completed: completed,
        total: total,
        path: path
      });
      
    } catch (error) {
      console.error('Error downloading track:', path, error);
      completed++;
      
      // Report progress even if there was an error
      client.postMessage({
        type: 'download_progress',
        completed: completed,
        total: total
      });
    }
  }
}


