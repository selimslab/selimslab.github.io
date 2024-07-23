---
title: ACID 
---

## Consistency 

Consistent data makes sense logically. It's not a property of a db. 
An app can leverage db features to achieve consistency. Like atomicity, isolation, foreign keys, referential integrity, validation, etc. 

So a database can't make your data magically consistent but it can help you with this  

## Atomicity
All or nothing. It reduces a long list of possible problems when running a transaction to a abort-and-retry 

## Isolation 

When there are more than one active transaction, there is a risk that they will affect each other. Databases try to prevent this. Yet, isolation has multiple levels and there is a long list of possible concurrency bugs. Some of the key ideas are, 

Making a change visible to other transactions only when it's fully committed 

Using multiple versions of db objects. This enables a transaction to operate on an unchanging, consistent dataset. Called MVCC, multi-version concurrency control 


## Durability

Maybe it's so obvious but it's the topmost expectation from a db. A db shouldn't lose the data. In practice, there is no perfect durability. Disks can fail or get full, processes crash, fsync might fail, etc. Some key ideas to tackle this are, 

1. Write-ahead log: a db can log the intended change before acknowledging the write, so it can recover in case of a power loss or restart 
2. Periodic backups: enables going back to a snapshot but the remaining data will still be lost 
3. Replication: A db can write the data to multiple disks(possibly in multiple datacenters or availability zones)
