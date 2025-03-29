---
title: Bloom Filters for Efficient Synchronization
---

Problem: Determine minimal set of commits to exchange between nodes

Sending all commit hashes becomes impractical as n increases. You can truncate hashes but they start to have a lot of false positives with even 1000 items 

Instead, nodes can send a bloom filter containing hashes of all commits known to them + hash of their head commit

So the receiving node will send only the missing commits 

Bloom filters scale linearly with set size 

[Source](https://martin.kleppmann.com/2020/12/02/bloom-filter-hash-graph-sync.html)