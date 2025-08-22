---
---
## sorted set
skip list + map
zadd zrem
zrank zrevrank: skip list pointers have spans (count of nodes it skips)

## sharding
redis shards by hash slots, clients route
CRC16(key) % 16384

tags
user:{123}:profile
{123} is a tag
tags go to the same shard

## redlock
multi-master cluster, majority lock with ttl
