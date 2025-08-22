---
---
topic 
partition 
log segment 

cg controller
consumer group
consumer 

broker 

producer 
epoch 
seqmap

cluster 
node 


zero-copy, custom wire protocol
batch + pagecache + fsync
sendfile: pagecache to netbuffer
compress
sequential i/o

ISR
acknowledgment level (0, 1, all replicas)

## idempotence
producers get uniq id from broker
each msg has (ProducerID, PartitionID, SequenceNumber)

broker tracks last seq. per (pid, partid) pair.
rejects dups, detects gaps, ensures order

## exactly-once
atomic multi-topic writes by 2PC
idempotence
read committed consumers
