---
---
## B-tree
Compact, store a key once
txs via locks
Balanced perf.

## B+ trees
all data in leaves.
leaves are linked for range queries

one node = one disk page (4kb)

b for file sys
b+ for dbs

50k write/s, 100k read/s
rdmbs limits: 100 tb vertical, 10-50 reps.
cloud vs on-prem for dbs: cloud is 2-3x costlier yet starts to make sense after 50-100TB
