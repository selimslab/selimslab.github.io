---
---
wal: low-level, version dependent
logical: version free. CDC
statement: compact but non-det.

single leader
eg. psql streaming rep

multi leader
multi-datacenter
offline apps
docs

leaderless

## conflicts
avoid 
route to same leader 
crdts

or resolve by
- read repair: compare replica responses
- background anti-entropy: detect using hashes of data parts and vector clocks
- last-write-wins
- app-logic

## ops
monitor replication lag

auto failover can cause cascades. 
manual for critical sys.
