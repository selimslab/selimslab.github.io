---
title: ACID 
---

Consistency 
- Not really a property of db but data itself. An app can leverage db properties for consistency, eg. atomicity, isolation, foreign keys, constraints, .. 

Atomicity
- All or nothing
- Abort-and-retry 

## Isolation 
Transactions can affect each other. Some ideas to prevent this:
- Make a change visible to other transactions only after it's fully committed
- Have multiple versions of db objects so a transaction can operate on a stable dataset. Called MVCC, multi-version concurrency control 

## Durability
There is no perfect durability. Disks fail, disks get full, processes crash, fsync might fail. Some ideas: 
- Write-ahead log: Log the change before the write so you can recover later
- Periodic backups 
- Write to multiple disks, maybe in multiple datacenters and zones  

