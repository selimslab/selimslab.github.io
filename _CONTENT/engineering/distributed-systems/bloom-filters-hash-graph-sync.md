---
title: Bloom Filters for Efficient Hash Graph Synchronization
---

## Problem
- Need to determine minimal set of commits to exchange between nodes
- Traditional approaches have limitations:
  - Git's basic protocol requires many round trips
  - Git's "skipping" algorithm reduces round trips but may send unnecessary commits

## Proposed Solution: Bloom Filter Approach
- Each node sends:
  1. Hashes of its head commits
  2. Bloom filter containing hashes of all known commits (using ~10 bits per commit)
- When receiving a Bloom filter:
  - Commits not in filter are immediately sent
  - Commits appearing in filter are likely known by other node (with small false positive probability)
- Almost all reconciliations complete in one round trip
- Never sends commits the other side already has

## Why Bloom Filters Work Better Than Truncated Hashes
- For 10 bits per item:
  - Bloom filter maintains ~0.8% false positive rate regardless of set size
  - Truncated hashes exceed 50% false positives with >1000 items
- Bloom filters scale linearly with set size while maintaining constant false positive rate

## Applications
- Local-first peer-to-peer applications
- Synchronizing state between devices without trusted servers
- Sybil-immune distributed systems

The paper also proves theoretical guarantees about which applications can be implemented in a Sybil-immune way without requiring proof-of-work or centralized control.

[Source: https://martin.kleppmann.com/2020/12/02/bloom-filter-hash-graph-sync.html] 