---
---
## Log structured merge tree
- crash recovery log
- a balanced tree in memory like AVL, red-black, or skip-list
- SS(sorted string) tables, periodic merge

write -> wal -> mem-table(skip-list) -> flush to sstable

- 10x write throughput vs b-tree, 0.5x read/s
- flat files, better compression
- local data, seq. io, better disk life

- compaction overhead
- less stable response times in higher percentiles

## lsm indexing

index while flushing memtable to sstable
1. sparse index: only first key of each block
2. index for each block
3. bloom filter for entire sstable

data blocks - sparse index - block indexes - bloom filter
