---
---
key range
hash
hybrid (hashkey, sortkey)

random prefix/suffix for hot keys

avoid seq. partition keys
eg. timestamp, all writes go to todays

## rebalancing
fixed: many more parts. upfront
dynamic: split large, merge small, good for key-range
hybrid: fixed num of parts. per node. split existing large parts as new nodes arrive

no modulo
pre-split: start with initial parts. on empty dbs

## secondary indexes
local: each partition has its own index.
global: single partitioned index

keep related data together to prevent scatter/gather

## request routing
client knows mapping
routing tier: load balancer
random node: any node can recv and forward
coordinator: like zk or gossip to track partition mapping

## concerns
auto failover can cause cascades. manual for critical sys.
