---
title: Data Structures to Build a DB
---


The simplest DB could be just appending to a file, O(1) write, O(n) read  

---

If you use a hash map instead, reads would reduce to 0(1)

But your hash map must fit into the memory 

And no range queries are possible, eg. selecting a date range 

---



[[lsm-trees]]

[[b-trees]]
