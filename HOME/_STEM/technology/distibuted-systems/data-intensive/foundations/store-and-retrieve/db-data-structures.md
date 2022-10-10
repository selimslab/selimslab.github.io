---
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


[[lsm-trees]]

[[b-trees]]
