---
---
## postgres 
```
select for update
update skip locked

indexes: b-tree, gin, gist, brin
```

## redis 
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

## nosql
```
kv: redis, etcd
doc: mongo, dynamo

blob: s3

wide-family: cassandra, bigtable, hbase 

columnar: bigquery, clickhouse
time-series: influx, timescale
        
graph: neo4j, cypher, variable paths * 

search: lucene, solr, elastic
    
multi modal: dynamo, cosmos
```

## kafka 
```
cluster 
    brokers 
        topics

topic
    partition
        log segments 
            messages

partition
    leader 
    replicas 
    in-sync replicas, ISR

msg 
    producer id 
    partition id 
    seq # 

consumer group
    consumers
    offsets 

write
    binary procotol, zero-copy
    seq. io, batch, compress
    pagecache, fsync, sendfile

exactly-once
    idempotence, retry, dedup 
    read-committed consumers
    if multi-topic: atomic writes by 2PC
```
