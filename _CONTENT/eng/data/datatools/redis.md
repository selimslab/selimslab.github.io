---
---
```
sorted set: skip list + map
    zadd zrem zrank

tags
    user:{123}:profile
    {123} is a tag
    tags go to the same shard

redlock
  multi-master cluster
  majority lock with ttl

scaling 
    Single 
    HA: read replicas
    Sentinel: auto failover
    Cluster: horizontal

sharding
    redis shards by hash slots, clients route
    CRC16(key) % 16384
```
