importScripts('https://storage.googleapis.com/workbox-cdn/releases/6.4.1/workbox-sw.js');

const { registerRoute } = workbox.routing;
const { CacheFirst, NetworkFirst, StaleWhileRevalidate } = workbox.strategies;
const { CacheableResponse } = workbox.cacheableResponse;

workbox.core.setCacheNameDetails({
  prefix: 'selimslab',
  suffix: '2022-09'
});

registerRoute(
  '/',
  new NetworkFirst()
);



workbox.precaching.precacheAndRoute([
  { url: '/essais/a-good-life/', revision: '2022-09-25 01:13:38 +0300' },
  { url: '/essais/art/', revision: '2022-09-25 15:55:50 +0300' },
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
  { url: '/essais/movies/', revision: '2022-09-23 23:34:11 +0300' },
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
  { url: '/tech/starter/', revision: '2022-09-25 02:23:26 +0300' },
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
  { url: '/', revision: '20220925163507' }
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
  /assets\//,
  new StaleWhileRevalidate()
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

registerRoute(
  /links\//,
  new NetworkFirst()
);

registerRoute(
  /projects\//,
  new NetworkFirst()
);
