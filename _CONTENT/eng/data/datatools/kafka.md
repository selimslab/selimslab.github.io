---
---
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
