---
---
## consistency
```
linearizable: single copy illusion
    single leader
    election consensus
    sync replication or raft quorum

causal: vector clocks + dependency tracking

eventual: async replication + conflict resolution
```

## consensus
```
raft: majority ack, term number fencing 

atomic commit: 2PC + raft for coordinator failover  

2PC: ask all, commit if they all ack, coordinator spof 
```

## time and order 
```
lamport clock
    single counter per process
    can't detect concurrent
    can only tell if A happens-before B

vector clocks
    list of counters per process
    can detect concurrency conflicts 

version vectors
    each replica tracks versions of replicated data objects 

availability
    heartbeat pings with timeout
    adapt to network conditions
    lease with ttl
    gossip
```
