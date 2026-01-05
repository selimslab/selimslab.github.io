---
---
## replication 
```
wal: low-level, version dependent
logical: version free. CDC
statement: compact but non-det.

leaderless
single leader: eg. psql streaming
multi leader: multi-datacenter, offline apps, docs

replication lag
    session models
        read after write: route reads to where you wrote or use timestamps 
        monotonic reads: read from same server, sticky session
        consistent prefix reads: read in causal order

    avoid conflicts 
        same leader
        crdt 

    resolve conflicts
        read repair: compare replica responses
        background anti-entropy: detect using hashes of data parts and version vectors
        app logic: eg. last-write-wins

version vector: each replica tracks versions of replicated data objects 
```

## sharding 
```
key range
hash
hybrid (hashkey, sortkey)

rebalancing
    fixed: many more parts upfront
    dynamic: split large, merge small. good for key-range
    hybrid

secondary indexes: local or global
keep related data together to prevent scatter/gather
hot keys: random prefix/suffix

```