---
layout: post
title: Dijkstra's Shortest Path Algorithm
tags: algorithms
category: tech/code-snippets

---

The Algorithm has 3 main steps:

1. Find the nearest neighbor.
2. Check whether there’s a cheaper path to neighbors of this node. If so, update costs.
3. Repeat until you’ve done this for every node.

Instead of a direct route, the shortest path is over different cities.

Dijkstra’s Algorithm works with bidirected or undirected graphs.

It works with positive weights.

If you have negative weights, use Bellman-Ford Algorithm.

<script src="https://gist.github.com/selimslab/f6dd5419513ea7b00be8d8b5fdb823b7.js"></script>
