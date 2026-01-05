---
---
## replication
wal: low-level, version dependent
logical: version free. CDC
statement: compact but non-det.

single leader: eg. psql streaming
multi leader: multi-datacenter, offline apps, docs
leaderless

replication lag
conflicts

avoid
same leader
crdt 

resolve
read repair: compare replica responses
background anti-entropy: detect using hashes of data parts and vector clocks
app logic, eg. last-write-wins

auto failover cascades


## sharding 
key range
hash
hybrid (hashkey, sortkey)

choose partition keys well
hot keys: random prefix/suffix

rebalancing
fixed: many more parts upfront
dynamic: split large, merge small. good for key-range
hybrid

secondary indexes: local or global
keep related data together to prevent scatter/gather

