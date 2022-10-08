---
tags: dist
---

The two most common data structures to build a db are B-Trees vs LSM Trees

B-Trees mostly used in relational dbs and stood the test of time 

LSM Trees used mostly for enabling high write throughput 

---

The simplest db could be just appending to a file, 

Writes would be very fast since its pretty hard to beat an append 

Reads O(n)  

---

If you use a hash map instead, reads would reduce to 0(1)

But your hash map must fit into the memory 

And no range queries are possible, eg. selecting a date range 

---

Now maybe we can do beter with the file-append

Only if there is a way to keep it sorted 

you can sort after every entry but its highly ineficient 


## Log structured merge tree (LSM) 


What if we have an in-memory balanced tree like an AVL tree, or red-black tree, 

append write to the tree first, then periodically flush the tree to a file, 

there will be multiple files, all sorted, periodically merge them in backgrund

These sorted string tables are called SS Tables, and a sorted file can be compressed better, leading to smaller files 

There is also a crash recovery log in case of a crash before the tree is flushed 

---

a balanced tree + SS Tables + periodical merging -> LSM tree 

1. add incoming data to the balanced tree and to the crash recovery log 
2. after a certain size, flush the tree to an SS table and delete the discard the recovery log  
3. periodically merge the SS Tables in the background 

### Advantages 

Lower write amplification, better disk life 

Higher thoughput 

Localized data, less unused disk space 

Better compression, smaller files 


### Disadvantages 

Less stable response times in higher percentiles 

Compaction costs 

If compaction is not configured well, 
it may get behind the writes, leading to disk full, 

and slower writes due to checking more segments 

So monitor well   


## B-Tree 


### Advantages 

More compact, a key is stored once 

Strong transactions via locks

Consistently good performance for many loads 

### Disadvantages 

hard to handle high write thoughput








