---
---
what to rep?
- wal: low-level, version dependent
- logical: higher-level, version indep. CDC possible
- statement: compact but non-det.

types
single leader: eg. psql streaming rep, mysql. at least one sync replica
multi leader: multi-datacenter, offline apps, docs
leaderless

## conflicts
route to same leader to avoid conf.

or resolve by
- read repair: compare replica responses
- background anti-entropy: detect and fix: check hashes of data parts, check vector clocks
- last-write-wins: safe with immutable keys only
- crdts
- app-logic

## ops
monitor replica lag
auto failover can cause cascades. manual for critical sys.
tune quorum params
