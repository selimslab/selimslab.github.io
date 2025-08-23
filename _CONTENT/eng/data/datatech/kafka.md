---
---
```
cluster
node

broker

topic
partition
    leader
    replica
    ISR
log segment

producer

consumer group
consumer

epoch
acknowledgment level (0, 1, all replicas)
```

## optimized
zero-copy
custom wire protocol

sequential i/o
batch
compress
pagecache
fsync

sendfile: pagecache to netbuffer

## idempotence
each msg has (ProducerID, PartitionID, SequenceNumber)
broker dedups

## exactly-once
idempotence
read committed consumers

if multi-topic: atomic writes by 2PC
