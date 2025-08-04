---
---
# replication

## impl. 
wal: low-level, version dependent 
logical: higher-level, version indep. CDC possible 
statement: compact but non-det. 


## single leader
- psql streaming replication, mysql master-slave 
- async: risks data loss
- semi-sync: one sync replica, others async

can have lin. consty. but needs consensus for leader election to prevent split-brain: lease + fencing token 

## multi leader
- multi-datacenter
- offline clients
- collab. editing

better avail. 
gives up linear. due to conc. writes.

## leaderless
- quorums w+r>n
- eventual cons. 
- not linearizable even with strict quorum due to network timing races 
- resolve conflicts by read repair and background anti-entropy 

read repair: compare replica responses 

anti-entropy 
- digest-reads: compare hash digests, full read only when mismatch 
- hash-tree: merkle tree to find differing parts of data 
- hints: store failed rights as hints on neighbors 
- vector clocks: detect concurrent writes 


## session models
- read after write: route writes to same leader
- monotonic reads: route reads to same replica to avoid going back in time 
- consistent prefix reads: vector clocks to track causality, eg. question before reply


## conflict resolution 

avoid: route to same leader 
last-write-wins: safe with immutable keys only
app-logic
crdts 

## ops 
monitor replica lag 
auto failover has many edge cases. can cause cascading fails. manual for critical sys.  
tune quorum params 

