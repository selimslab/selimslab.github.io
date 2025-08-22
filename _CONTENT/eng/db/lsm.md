---
---
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



