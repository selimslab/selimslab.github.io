---
---
wal: low-level, version dependent
logical: version free. CDC
statement: compact but non-det.

single leader: eg. psql streaming
multi leader: multi-datacenter, offline apps, docs
leaderless

## conflicts
avoid by routing to same leader or crdts

or resolve by read repair, anti-entropy, or app logic

read repair: compare replica responses
background anti-entropy: detect using hashes of data parts and vector clocks
last-write-wins

## concerns
replication lag
auto failover cascades
