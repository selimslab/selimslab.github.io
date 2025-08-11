---
---
vertical, horizontal, custom

logic
key range: sorted, risks hot spots
hash: even but no ordering
hybrid: compound key (hashkey, sortkey) eg. cassandra

hot spots
- monitor
- random prefix/suffix for hot keys
- avoid seq. partition keys, eg. timestamps, all writes go to todays

rebalancing
- fixed: many more parts. upfront
- dynamic: split large, merge small, good for key-range stg.
- hybrid: fixed parts. per node. when a new node comes, split existing parts

secondary indexes
- local: each part has its own index. prevent scatter/gather by keeping related data together
- global: single index, partitioned by indexed values. often avoid

request routing
- client knows mapping
- routing tier: load balancer
- random node: any node can recv and forward
- coordinator: like zk or gossip to track partition mapping

ops
- avoid modulo since most keys move when n changes
- pre-split: start with initial parts. on empty dbs
- consider rebalancing cost and potential cascades
