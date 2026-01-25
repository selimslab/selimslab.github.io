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
    lsm 
        wal
        memtable 
        sorted string table
            data blocks 

            bloom filter
            sparse index: only first key of each block
            block index 

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

## log segments 
```
cluster 
    brokers 

node
    broker
        topics 

topic
    partition
        log segments 

        leader 
        in-sync replicas 

consumer group
    consumers
    offsets 

write
    binary procotol
    sendfile

    batch
    compress
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
    compression
    sorted 
    SIMD

    parquet
    clickhouse
    influx

```

## encoding 
```
    text 
    binary 

    schema evolution
        avro 
        protobuf 

        keep unknown fields
        tags vs names: compact + rename later

        breaking
            deleting required fields
            changing field types

        old code -> new data 
        old data <- new code 
```





