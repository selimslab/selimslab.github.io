---
---
## types
vertical: split columns to multiple tables in the same db
horizontal: split to different dbs. cross shard joins are expensive
custom logic

## stgs.
key range: sorted, risks hot spots
hash: even but no ordering
hybrid: compound key (hashkey, sortkey) eg. cassandra


## hot spots
monitor for hot spots
random prefix/suffix for hot keys
avoid seq. partition keys, eg. timestamps, all writes go to today's partition


## rebalancing

fixed: many more parts. upfront
dynamic: split large, merge small, good for key-range stg.
hybrid: fixed parts. per node. when a new node comes, split existing parts


## secondary index stg.
local: each part has its own sec. index, writes simple, reads need scatter/gather
global: single sec. index, partitioned by indexed values. reads simpler, writes harder


## request routing
client-aware: client knows mapping
routing tier: load balancer
random node: any node can recv and forward
coordinator: like zk or gossip to track part. mapping

## ops
avoid modulo since most keys move when n changes
pre-split: start with initial parts. on empty dbs
consider rebalancing cost and potential cascades
