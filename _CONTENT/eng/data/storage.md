---
---
## B-tree

```
blocks or pages 
one node = one disk page (4kb)

branch factor, 100-500 children per node

WAL
each key in exactly one place 
page frag
index-only query possible 

tables: a bag of tuples 

concat. index 2d 3d 
    gist r-tree 
    gin search 

all data in leaves
leaves are linked for range queries
write amplification from splitting/rebalancing
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

write -> wal -> mem-table(skip-list) -> flush to sstable

immutable
single writer 

periodic merge
compaction by levels 
delete by tombstones 

disk snapshots
checksums

local data, seq. io, flat files
better compression and disk life

less stable response times in higher percentiles
```

## kafka 
```
cluster 
    brokers 

node
    broker
        topics 

topic
    partition
        log segments 
            messages

msg 
    producer id 
    partition id 
    seq # 

partition
    leader 
    replicas 
    in-sync replicas, ISR

consumer group
    consumers
    offsets 

write
    binary procotol, zero-copy
    seq. io, batch, compress
    pagecache, fsync, sendfile

exactly-once
    idempotence, retry, dedup 
    read-committed consumers
    if multi-topic: atomic writes by 2PC
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
    parquet

```