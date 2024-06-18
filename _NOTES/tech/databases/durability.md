---
---
Maybe it's so obvious but it's the topmost expectation from a db. A db shouldn't lose the data. In practice, there is no perfect durability. Disks can fail or get full, processes crash, fsync might fail, etc. Some key ideas to tackle this are, 

1. Write-ahead log: a db can log the intended change before acknowledging the write, so it can recover in case of a power loss or restart 
2. Periodic backups: enables going back to a snapshot but the remaining data will still be lost 
3. Replication: A db can write the data to multiple disks(possibly in multiple datacenters or availability zones)
