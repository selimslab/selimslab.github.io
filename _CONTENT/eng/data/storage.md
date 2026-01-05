---
---
## log segments
kafka

## columnar
parquet
clickhouse
influx

compression
skip ranges
only needed cols

## B+ trees
all data in leaves
100-500 children per node (fanout)
leaves are linked for range queries
write amplification from splitting/rebalancing

one node = one disk page (4kb)

limits
50k write/s, 100k read/s
100 tb vertical
10-50 replicas

cloud is 2-3x costlier
break even after 50-100TB


## Log structured merge tree

  wal
  memtable 
  sstable
    bloom
    sparse index
    block index 
  compaction 
    L0, L1, ..
  delete by tombstones 

balanced in-mem tree
crash log
SS(sorted string) tables

write -> wal -> mem-table(skip-list) -> flush to sstable

SSTable
data blocks
sparse index: only first key of each block
index for each block
bloom filter for entire sstable

periodic merge
local data, seq. io, flat files
better compression and disk life

less stable response times in higher percentiles

vs B-tree
slower point queries  
better sequential write throughput
multiple versions of same key until compaction
