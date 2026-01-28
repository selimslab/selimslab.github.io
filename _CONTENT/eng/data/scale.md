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
