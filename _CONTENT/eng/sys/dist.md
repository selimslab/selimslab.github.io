---
---
## dist troubles 

network  
time/order  
partial failures


## time 

NTP - network latency 

GPS - satellite latency, normally lower than network 

vector clock: a list of counters for each node [c1, .. cn]

## replication:
- single leader: psql streaming replication, mysql master-slave 
- multi leader: multiple datacenters, offline clients, collab. editing
- leaderless: resolve conflicts by read-repair or background anti-entropy 

## partitioning
vertical: split columns to multiple tables in the same db

horizontal: split to different dbs. cross shard joins are expensive

or split by custom logic

## distributed tx 

2pc: coordinator asks all, commits if they all ack. blocked if leader fails

saga: commit or compensate(roll-back) 

the core problem is consensus. etcd or zk solves it, eg. for kafka or k8s


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


## coordination  

a fencing token is an increasing number. a lease has a token to prevent split-brain 


## Consistency Models

- Linearizability (Strong Consistency)
- Sequential
- Causal 
- Eventual 
- read your writes
- monotonic reads, once you see a value, don't see an older one
- bounded staleness 
- quorum (tunable)

## ID generation 

UUID not sortable 

ID server: SPOF

timestamp + data center id + machine id + sequence number 


## Cloud patterns 

[Source: Microsoft Azure Architecture Patterns](https://learn.microsoft.com/en-us/azure/architecture/patterns/)

[Patterns of Distributed Systems by Martin Fowler](https://martinfowler.com/articles/patterns-of-distributed-systems/) 

Consistency: WAL, Quorum, Versioned Values
Availability: Replication, Heartbeat, Lease
Partition tolerance: Gossip, Emergent Leader
Ordering: Lamport Clock, Vector Clock, Hybrid Clock
Performance: Pipelining, Batching, Follower Reads
Coordination: Leader/Followers, Consensus, Consistent Core

## detect failures 

heartbeats, pings  
- phi accrual: adapt to network conditions. prob. dist. of heartbeat arrivals in a sliding window

lease: timeout 

gossip 


## replication 


consistency models
- causal: vector clocks 
- sequential: operation appear consistent with process execution order
- linearizable: needs consensus 

session models
- read own writes 
- monotonic reads
- monotonic writes 
- write-after-read



