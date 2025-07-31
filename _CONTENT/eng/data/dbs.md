---
---



The simplest DB could be just appending to a file, O(1) write, O(n) read  

If you use a hash map instead, reads would reduce to 0(1) but it's just in memory 

## B-tree

Pro
- Compact, a key is stored once 
- Transactions via locks 
- Consistently good performance for many loads 

Con
- Hard to handle high write thoughput

## B+ trees 

all data in leaves. 

one node = one disk page (4kb)

leaves are linked for range queries 

b for file sys
b+ for dbs


## Log structured merge tree (LSM tree)

a balanced tree + SS(sorted string) tables + periodical merging + crash recovery log -> LSM tree 
0. Create an in-memory balanced tree like an AVL tree; or red-black tree
1. Append write to the tree and crash recovery log 
2. Periodically flush the tree to a file and discard crash-log. There will be multiple files, all sorted. 
3. These sorted string tables are called SS Tables. Periodically merge them in the background


Pros
- Higher write throughput 
- Better compression, flat files
- Localized data, better disk life

Cons
- Compaction costs and risks. If compaction gets behind writes, disk will get full 
- Less stable response times in higher percentiles 

## lsm-indexing

write -> wal -> mem-table(skip-list) -> flush to sstable 

flush by blocks, index while writing 
1. in-memory sparse index: only first key of each block 
2. a block index for each
3. a bloom filter for entire sstable 

data blocks - sparse index - block indexes - bloom filter 


## lsm vs b-tree r/w 

b: 50k wps, 100k rps
lsm: 10x w, 0.5x r 


## Nosql 

### wide-column stores 

column families 

Cassandra, HBase, BigTable, DynamoDB



## Cost 

cloud vs on-prem for dbs: cloud is 2-3x costlier yet starts to make sense after 50-100TB


## key concepts 
PK
FK
indexes 
idempotence 
NF

## Indexes 

...



## links 
- [Database Architecture Notes](https://architecturenotes.co/p/things-you-should-know-about-databases)
- [SQLforDevs.com - Database Tips & Tricks](https://sqlfordevs.com/tips)
- [Common DB schema change mistakes - Postgres.AI](https://postgres.ai/blog/20220525-common-db-schema-change-mistakes)
