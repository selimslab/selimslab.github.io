---
---
## engine
lsm

b-tree: fixed-size pages, wal for recovery, balanced r/w

hash indexes: in-mem k-v map, poor for ranges, best for lookups


lsm for write heavy, b-tree for balanced, column for analytics

## idx
secondary indexes: enables multiple access patterns

multi-col. idx: concat cols. for multi-col qs

special: r-tree, full-text etc.

## perf
write amp: lsm lower than b-tree, critical for ssd life
memory: in-mem avoid encoding overhead, consider mmap
compression: run-length encoding, bitmap idx for low-cardinality data


oltp: row, conc. writes, fast reads

olap: cols, compress, large seq. scans

warehouse: etl, star/snowflake schemas
