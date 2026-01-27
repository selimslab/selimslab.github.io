---
---
## B-tree
```
blocks or pages 
one node = one disk page (4kb)
branch factor, 100-500 children per node

each key in exactly one place 
all data in leaves
leaves are linked for range queries

page frag
write amp. from splitting/rebalancing

index-only query possible 
concat. index 2d 3d 
    gist r-tree 
    gin search 
```

## Log structured merge tree
```
wal
memtable 
sorted string table
    bloom filter
    sparse index: only first key of each block
    block index 
    data blocks 

immutable
single writer 
periodic merge, compaction, tombstones
disk snapshots, checksums

local data, seq. io, flat files
better compression and disk life

less stable response times in higher percentiles
```

## analytics 
```
star vs snowflake 

fact table 
    dimension tables 
        sub-dims.

data cubes for materialized aggregates
slice n dice 

columnar
    compression, sort, SIMD
    parquet, delta 
```