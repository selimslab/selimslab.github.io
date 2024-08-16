---
title: SQL Tips
---


[SQLforDevs.com - Database Tips & Tricks](https://sqlfordevs.com/tips)

Think about your data and how it will be used

consider different angles, there is often an easier way to look at a problem, like using a helper table, or relaxing the real-time constraint, or preparing ahead like pre-sorting 

**presorted tables for sequential access** 

MySQL auto-sorts by primary key. Reads will be fast, writes will be log time but this can be solved by using a temporary append-only table. First append then move to the sorted table. Query them both. 

In PG, writes are always append. CLUSTER command sorts the table but its locking. there's an extension to prevent locking but it keeps the data twice for some time. Bad for large tables. Partition to smaller tables. 

## Indexes 

without an index, db has to check all rows 

db has to update an index for new rows, so only keep the necessary indexes 

mysql can make an index invisible, deactivates it. so you can make sure before deleting it. 

## Normalization

Reduce duplication, increate referential integrity. 1NF to 6NF 

## ORMs

Sometimes helpful yet sometimes slower and more convoluted than SQL 

