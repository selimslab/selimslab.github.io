---
---
tx are essential for 
consistency
fk integrity
data sync 

group ops. to atomic units, no partial failure 

ACID: 
all-or-nothing 
preserve invariants 
conc. safety 
persistence guarantee


## conc. problems 

lost updates

read skew: read values change during tx   

write skew: read same data to decide different writes. needs serial. isolation

phantom reads: the set of rows matching a query changes bw reads. needs predicate locks. can cause write skew 


## isolation levels 

read committed: read-skew possible, no dirty reads/writes

snapshot: mvcc, ideal for analytics and backups. solves read-only phantoms

serializable: prevent all race conds. 
impl.
1. serial, single thread
2. 2PL: traditional, bad perf 
3. SSI: optimistic, predicate locks + dep. cycles


## distributed tx 

10x perf. penalty, coordinator spof 

reality: often avoided 

2PC: blocks if coordinator fails after prepare. coor. asks all, commits if they all ack.

saga: commit or compensate(roll-back) 

