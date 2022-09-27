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
  '/essais/',
  '/tech/',
  '/algorithms/',
  '/projects/',
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
  '/essais/type-faster/',
  '/essais/work/',
  '/essais/write-better/',
  '/tech/beginner/',
    '/tech/books/',
    '/tech/code-review/',
    '/tech/container/',
    '/tech/crypt/',
    '/tech/design-patterns/',
    '/tech/go/',
    '/tech/heuristics/',
    '/tech/keyboard-shortcuts/',
    '/tech/links/',
    '/tech/makers/',
    '/tech/natural-tech/',
    '/tech/network-layers/',
    '/tech/sec-general/',
    '/tech/sec-web/',
    '/tech/solid/',
    '/tech/sre/',
    '/tech/stx/',
    '/tech/tools/',
    '/algorithms/arr/',
    '/algorithms/backtrack/',
    '/algorithms/bits/',
    '/algorithms/bst/',
    '/algorithms/dijkstra/',
    '/algorithms/dynamic/',
    '/algorithms/graph/',
    '/algorithms/greedy/',
    '/algorithms/linked-list/',
    '/algorithms/pc/',
    '/algorithms/q/',
    '/algorithms/search/',
    '/algorithms/sliding/',
    '/algorithms/sort/',
    '/algorithms/str/',
    '/algorithms/tree-traveerse/',
    '/algorithms/tree/',
    '/projects/block/',
    '/projects/gc/',
    '/projects/genres/',
    '/projects/hashmap/',
    '/projects/os/',
    '/projects/pascal/',
    '/projects/pca/',
    '/projects/search/',
    '/'
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
  new RegExp('\/static\/.+'),
  new CacheFirst()
);



registerRoute(
  new RegExp('\/.+\/.+'),
  strategy
);

