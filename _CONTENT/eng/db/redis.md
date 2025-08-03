---
---
## sorted sets

skip list + map 

zadd zrem

zrank zrevrank: skip list pointers have spans (count of nodes it skips)

## sharding
redis shards by hash slots, clients route 

CRC16(key) % 16384

hash tags user:{123}:profile -> {123} is tag, tags go to same shard 


## redlock

get a lock in a dist. multi-master redis cluster 

lock is valid only if you can lock majority of masters 

prevents deadlock by expiration 



