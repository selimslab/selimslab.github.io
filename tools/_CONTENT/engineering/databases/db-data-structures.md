---
title: Internal Data Structures of DBs
tags: ds
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


