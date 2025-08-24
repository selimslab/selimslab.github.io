---
---
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


## columnar vs wide column 

both lsm 

⏺ The key differences are in data layout and access patterns, not just the underlying LSM storage:

  Data Layout:
  - Wide-column (Cassandra): Row-oriented within LSM - stores row_key → {col1: val1, col2: val2}
  - Columnar (ClickHouse): Column-oriented within LSM - stores col1 → [val1, val2, val3...]

  LSM Implementation Details:
  - Cassandra: SSTables store rows, compaction merges by row key
  - ClickHouse: MergeTree parts store columns separately, merges entire column chunks
  - InfluxDB: TSM optimized for time-series compression patterns

  Query Optimization:
  - Wide-column: Efficient for SELECT * WHERE row_key = X
  - Columnar: Efficient for SELECT col1, col2 WHERE condition (column pruning)

  Compression:
  - Wide-column: Compresses mixed data types within rows
  - Columnar: Much better compression on homogeneous column data

  Example:
  Wide-column LSM: user123 → {name: "John", age: 30, city: "NYC"}
  Columnar LSM:    name_col → ["John", "Jane", "Bob"]
                   age_col  → [30, 25, 40]

  Same LSM merge/compaction strategy, completely different data organization for different workloads.