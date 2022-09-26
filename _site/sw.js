importScripts('https://storage.googleapis.com/workbox-cdn/releases/6.4.1/workbox-sw.js');

const { registerRoute } = workbox.routing;
const { CacheFirst, NetworkFirst, StaleWhileRevalidate } = workbox.strategies;
const { CacheableResponse } = workbox.cacheableResponse;
const {warmStrategyCache} =  workbox.recipes;

workbox.core.setCacheNameDetails({
  prefix: 'notes',
  suffix: '2022-09'
});


const urls = [
  '/essais/a-good-life/',
  '/essais/art/',
  '/essais/books/',
  '/essais/chaos/',
  '/essais/children/',
  '/essais/cognitive%20biases/',
  '/essais/communication/',
  '/essais/critical-thinking/',
  '/essais/decisions/',
  '/essais/design/',
  '/essais/entrepreneurship/',
  '/essais/get-things-done/',
  '/essais/habits/',
  '/essais/happiness/',
  '/essais/last-million/',
  '/essais/leadership/',
  '/essais/learning/',
  '/essais/links/',
  '/essais/mental-models/',
  '/essais/movies/',
  '/essais/poems/',
  '/essais/poemtr/',
  '/essais/problem-solving/',
  '/essais/public-speaking/',
  '/essais/questions/',
  '/essais/stupidity/',
  '/essais/teamwork-in-art-of-war/',
  '/essais/write-better/',
  '/tech/algo/',
    '/tech/books/',
    '/tech/code-review/',
    '/tech/keyboard-shortcuts/',
    '/tech/natural-tech/',
    '/tech/network-layers/',
    '/tech/principles/',
    '/tech/projects/',
    '/tech/software-security/',
    '/tech/solid/',
    '/tech/starter/',
    '/tech/websec/',
    '/algo/arr/',
    '/algo/backtrack/',
    '/algo/bits/',
    '/algo/bst/',
    '/algo/dijkstra/',
    '/algo/dynamic/',
    '/algo/graph/',
    '/algo/greedy/',
    '/algo/linked-list/',
    '/algo/q/',
    '/algo/search/',
    '/algo/sliding/',
    '/algo/sort/',
    '/algo/str/',
    '/algo/tree-traveerse/',
    '/algo/tree/',
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
  new RegExp('\/links\/.+'),
  new StaleWhileRevalidate()
);

registerRoute(
  new RegExp('\/projects\/.+'),
  new StaleWhileRevalidate()
);

registerRoute(
  new RegExp('\/assets\/.+'),
  new StaleWhileRevalidate()
);

registerRoute(
  new RegExp('/static/.+'),
  new CacheFirst()
);
