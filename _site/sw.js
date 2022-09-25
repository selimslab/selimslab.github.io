importScripts('https://storage.googleapis.com/workbox-cdn/releases/6.4.1/workbox-sw.js');

const { registerRoute } = workbox.routing;
const { CacheFirst, NetworkFirst, StaleWhileRevalidate } = workbox.strategies;
const { CacheableResponse } = workbox.cacheableResponse;

workbox.core.setCacheNameDetails({
  prefix: 'selimslab',
  suffix: '2022-09'
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
  { url: '/essais/a-good-life/', revision: '2022-09-25 01:13:38 +0300' },
  { url: '/essais/art/', revision: '2022-09-25 16:51:40 +0300' },
  { url: '/essais/books/', revision: '2022-09-23 13:41:53 +0300' },
  { url: '/essais/chaos/', revision: '2022-09-22 01:36:16 +0300' },
  { url: '/essais/children/', revision: '2022-09-21 19:13:22 +0300' },
  { url: '/essais/cognitive%20biases/', revision: '2022-09-21 19:13:22 +0300' },
  { url: '/essais/communication/', revision: '2022-09-23 15:49:28 +0300' },
  { url: '/essais/critical-thinking/', revision: '2022-09-21 19:13:22 +0300' },
  { url: '/essais/decisions/', revision: '2022-09-21 19:13:22 +0300' },
  { url: '/essais/design/', revision: '2022-09-21 19:13:22 +0300' },
  { url: '/essais/entrepreneurship/', revision: '2022-09-21 19:13:22 +0300' },
  { url: '/essais/get-things-done/', revision: '2022-09-21 19:13:22 +0300' },
  { url: '/essais/habits/', revision: '2022-09-21 22:50:29 +0300' },
  { url: '/essais/happiness/', revision: '2022-09-21 19:13:22 +0300' },
  { url: '/essais/last-million/', revision: '2022-09-21 19:13:22 +0300' },
  { url: '/essais/leadership/', revision: '2022-09-23 00:41:02 +0300' },
  { url: '/essais/learning/', revision: '2022-09-21 19:13:22 +0300' },
  { url: '/essais/links/', revision: '2022-09-23 13:23:05 +0300' },
  { url: '/essais/mental-models/', revision: '2022-09-21 19:13:22 +0300' },
  { url: '/essais/movies/', revision: '2022-09-25 18:05:57 +0300' },
  { url: '/essais/poems/', revision: '2022-09-22 01:41:04 +0300' },
  { url: '/essais/poemtr/', revision: '2022-09-23 13:41:53 +0300' },
  { url: '/essais/problem-solving/', revision: '2022-09-23 13:41:53 +0300' },
  { url: '/essais/public-speaking/', revision: '2022-09-21 19:13:22 +0300' },
  { url: '/essais/questions/', revision: '2022-09-21 22:50:29 +0300' },
  { url: '/essais/stupidity/', revision: '2022-09-21 19:13:22 +0300' },
  { url: '/essais/teamwork-in-art-of-war/', revision: '2022-09-22 01:36:16 +0300' },
  { url: '/essais/write-better/', revision: '2022-09-21 19:13:22 +0300' },
  { url: '/tech/algo/', revision: '2022-09-22 01:36:16 +0300' },
  { url: '/tech/books/', revision: '2022-09-23 15:32:47 +0300' },
  { url: '/tech/code-review/', revision: '2022-09-22 01:41:04 +0300' },
  { url: '/tech/keyboard-shortcuts/', revision: '2022-09-23 22:53:47 +0300' },
  { url: '/tech/natural-tech/', revision: '2022-09-21 19:13:22 +0300' },
  { url: '/tech/network-layers/', revision: '2022-09-23 13:23:05 +0300' },
  { url: '/tech/principles/', revision: '2022-09-23 13:23:05 +0300' },
  { url: '/tech/projects/', revision: '2022-09-23 13:23:05 +0300' },
  { url: '/tech/software-security/', revision: '2022-09-21 19:13:22 +0300' },
  { url: '/tech/solid/', revision: '2022-09-21 22:50:29 +0300' },
  { url: '/tech/starter/', revision: '2022-09-25 18:11:12 +0300' },
  { url: '/tech/websec/', revision: '2022-09-21 19:13:22 +0300' },
  { url: '/algo/arr/', revision: '2022-09-23 13:23:05 +0300' },
  { url: '/algo/backtrack/', revision: '2022-09-23 15:31:06 +0300' },
  { url: '/algo/bits/', revision: '2022-09-21 22:50:29 +0300' },
  { url: '/algo/bst/', revision: '2022-09-21 19:13:22 +0300' },
  { url: '/algo/dijkstra/', revision: '2022-09-21 19:13:22 +0300' },
  { url: '/algo/dynamic/', revision: '2022-09-21 19:13:22 +0300' },
  { url: '/algo/graph/', revision: '2022-09-21 19:13:22 +0300' },
  { url: '/algo/greedy/', revision: '2022-09-21 19:13:22 +0300' },
  { url: '/algo/linked-list/', revision: '2022-09-22 00:28:18 +0300' },
  { url: '/algo/q/', revision: '2022-09-25 01:13:38 +0300' },
  { url: '/algo/search/', revision: '2022-09-21 19:13:22 +0300' },
  { url: '/algo/sliding/', revision: '2022-09-21 19:13:22 +0300' },
  { url: '/algo/sort/', revision: '2022-09-21 19:13:22 +0300' },
  { url: '/algo/str/', revision: '2022-09-22 00:28:18 +0300' },
  { url: '/algo/tree-traveerse/', revision: '2022-09-21 19:13:22 +0300' },
  { url: '/algo/tree/', revision: '2022-09-21 19:13:22 +0300' },
  { url: '/', revision: '20220925191909' }
]);

self.addEventListener('install', (event) => {
  let urls = []
  urls.push('/essais/a-good-life/')
  urls.push('/essais/art/')
  urls.push('/essais/books/')
  urls.push('/essais/chaos/')
  urls.push('/essais/children/')
  urls.push('/essais/cognitive%20biases/')
  urls.push('/essais/communication/')
  urls.push('/essais/critical-thinking/')
  urls.push('/essais/decisions/')
  urls.push('/essais/design/')
  urls.push('/essais/entrepreneurship/')
  urls.push('/essais/get-things-done/')
  urls.push('/essais/habits/')
  urls.push('/essais/happiness/')
  urls.push('/essais/last-million/')
  urls.push('/essais/leadership/')
  urls.push('/essais/learning/')
  urls.push('/essais/links/')
  urls.push('/essais/mental-models/')
  urls.push('/essais/movies/')
  urls.push('/essais/poems/')
  urls.push('/essais/poemtr/')
  urls.push('/essais/problem-solving/')
  urls.push('/essais/public-speaking/')
  urls.push('/essais/questions/')
  urls.push('/essais/stupidity/')
  urls.push('/essais/teamwork-in-art-of-war/')
  urls.push('/essais/write-better/')
  urls.push('/tech/algo/')
  urls.push('/tech/books/')
  urls.push('/tech/code-review/')
  urls.push('/tech/keyboard-shortcuts/')
  urls.push('/tech/natural-tech/')
  urls.push('/tech/network-layers/')
  urls.push('/tech/principles/')
  urls.push('/tech/projects/')
  urls.push('/tech/software-security/')
  urls.push('/tech/solid/')
  urls.push('/tech/starter/')
  urls.push('/tech/websec/')
  urls.push('/algo/arr/')
  urls.push('/algo/backtrack/')
  urls.push('/algo/bits/')
  urls.push('/algo/bst/')
  urls.push('/algo/dijkstra/')
  urls.push('/algo/dynamic/')
  urls.push('/algo/graph/')
  urls.push('/algo/greedy/')
  urls.push('/algo/linked-list/')
  urls.push('/algo/q/')
  urls.push('/algo/search/')
  urls.push('/algo/sliding/')
  urls.push('/algo/sort/')
  urls.push('/algo/str/')
  urls.push('/algo/tree-traveerse/')
  urls.push('/algo/tree/')
  event.waitUntil(caches.open('HTML-CACHE').then((cache) => cache.addAll(urls)));
});