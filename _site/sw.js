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


workbox.precaching.precacheAndRoute([
  { url: '/essais/a-good-life/'},
  { url: '/essais/art/'},
  { url: '/essais/books/'},
  { url: '/essais/chaos/'},
  { url: '/essais/children/'},
  { url: '/essais/cognitive%20biases/'},
  { url: '/essais/communication/'},
  { url: '/essais/critical-thinking/'},
  { url: '/essais/decisions/'},
  { url: '/essais/design/'},
  { url: '/essais/entrepreneurship/'},
  { url: '/essais/get-things-done/'},
  { url: '/essais/habits/'},
  { url: '/essais/happiness/'},
  { url: '/essais/last-million/'},
  { url: '/essais/leadership/'},
  { url: '/essais/learning/'},
  { url: '/essais/links/'},
  { url: '/essais/mental-models/'},
  { url: '/essais/movies/'},
  { url: '/essais/poems/'},
  { url: '/essais/poemtr/'},
  { url: '/essais/problem-solving/'},
  { url: '/essais/public-speaking/'},
  { url: '/essais/questions/'},
  { url: '/essais/stupidity/'},
  { url: '/essais/teamwork-in-art-of-war/'},
  { url: '/essais/write-better/'},
  { url: '/tech/algo/' },
  { url: '/tech/books/' },
  { url: '/tech/code-review/' },
  { url: '/tech/keyboard-shortcuts/' },
  { url: '/tech/natural-tech/' },
  { url: '/tech/network-layers/' },
  { url: '/tech/principles/' },
  { url: '/tech/projects/' },
  { url: '/tech/software-security/' },
  { url: '/tech/solid/' },
  { url: '/tech/starter/' },
  { url: '/tech/websec/' },
  { url: '/algo/arr/'},
  { url: '/algo/backtrack/'},
  { url: '/algo/bits/'},
  { url: '/algo/bst/'},
  { url: '/algo/dijkstra/'},
  { url: '/algo/dynamic/'},
  { url: '/algo/graph/'},
  { url: '/algo/greedy/'},
  { url: '/algo/linked-list/'},
  { url: '/algo/q/'},
  { url: '/algo/search/'},
  { url: '/algo/sliding/'},
  { url: '/algo/sort/'},
  { url: '/algo/str/'},
  { url: '/algo/tree-traveerse/'},
  { url: '/algo/tree/'},
  {}
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

// registerRoute(
//   /assets\//,
//   new StaleWhileRevalidate()
// );

