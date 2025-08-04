---
---
## ACID

Atomicity: All or nothing, abort-retry, impl. by txs 

Consistency: a property of data. db can't guarantee, can only help, eg. with txs, isolation, pk, fk, constraints, ..

Isolation: of concurrent txs, a spectrum 

Durability: impl. by WAL, backups, replication, UPS, .. 


## isolation levels (postgres)

SET TRANSACTION ISOLATION LEVEL 

READ COMMITTED: default, only see committed rows, allows non-repeatable reads during tx 

REPEATABLE READ: snapshot isolation, only see data committed before tx began. impl. by MVCC
- MVCC: each tx gets a snapshot, a set of tx ids, xmin, xmax, xid_list (list of active txs) 
eg. 12340:12350:12342,12345,12347

SERIALIZABLE: impl. by MVCC+SSI, ~20% perf cost
- SSI: serializable snapshot isolation: impl. by predicate locks + deps. cycles
