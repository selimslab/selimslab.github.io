---
---
## replication
```
(part x, rep y)
replicate WAL or rows 

leader 
    single 
    multi leader: cause write conflicts
    none: dynamo, cassandra, quorum, eventual 

    failover: detect, elect, fence 

lag
    read your writes 
    monotonic reads 
    consistent prefix reads 

    conflicts 
        avoid: same-writer, CRDT, OT 
        resolve: read-repair, anti-entropy, app logic 
```

## partitioning
```
types
    key range
    hash of key 
    (hashkey, sortkey)

hot spots: random prefix suffix

indexes
    local vs global 
    scatter-gatter: tail-latency amp. 

rebalancing is expensive 
    fixed # of parts
    dynamic, split large, merge small. good for key-range
    hybrid 

    service discovery, request routing 
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

atomic commit
    2PC
        ask all, commit if they all ack
        like marriage, coordinator spof 

    practical: 2pc + raft for coordinator failover 
```