---
title: Log structured merge tree (LSM tree)
tags: ds algo 
---

a balanced tree + SS(sorted string) tables + periodical merging + crash recovery log -> LSM tree 

0. Create an in-memory balanced tree like an AVL tree; or red-black tree
1. Append write to the tree and crash recovery log 
2. Periodically flush the tree to a file and discard crash-log. There will be multiple files, all sorted. 
3. These sorted string tables are called SS Tables. Periodically merge them in the background


## Pro 

Lower write amplification, better disk life 

Higher throughput 

Localized data, less unused disk space 

Better compression, smaller files 


## Con

Less stable response times in higher percentiles 

Compaction costs 

If compaction is not configured well, 
it may get behind the writes, leading to a disk full, 

and slower writes due to checking more segments 

So monitor well   