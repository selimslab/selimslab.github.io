---
---
## encoding
backward comp: old data, new code

breaking:
deleting required fields
changing field types

keep unknown fields
tags vs names: compact + rename later

## log segments
kafka

## columnar
parquet
clickhouse
influx

## B+ trees
all data in leaves
leaves are linked for range queries

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

10x write throughput vs b-tree, 0.5x read/s
less stable response times in higher percentiles

