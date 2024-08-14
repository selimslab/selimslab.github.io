---
title: Log structured merge tree (LSM tree)
tags: ds algo 
---

Now maybe we can do better with the file-append

Only if there is a way to keep it sorted 

you can sort after every entry but its highly inefficient 

---

What if we have an in-memory balanced tree like an AVL tree; or red-black tree, 

append write to the tree first, then periodically flush the tree to a file, 

there will be multiple files, all sorted, and periodically merged in the background

These sorted string tables are called SS Tables, and a sorted file can be compressed better, leading to smaller files 

There is also a crash recovery log in case of a crash before the tree is flushed 

---

a balanced tree + SS Tables + periodical merging -> LSM tree 

1. add incoming data to the balanced tree and to the crash recovery log 
2. after a certain size, flush the tree to an SS table and delete the discard the recovery log  
3. periodically merge the SS Tables in the background 

### Advantages 

Lower write amplification, better disk life 

Higher throughput 

Localized data, less unused disk space 

Better compression, smaller files 


### Disadvantages 

Less stable response times in higher percentiles 

Compaction costs 

If compaction is not configured well, 
it may get behind the writes, leading to a disk full, 

and slower writes due to checking more segments 

So monitor well   