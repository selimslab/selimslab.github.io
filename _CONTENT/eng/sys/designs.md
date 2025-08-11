---
---
## payments

## search engine

## imessage

## find my

## news

## crawler

## trader


## maps
s2
spatial indexes, r-tree
geohash
vectors

## docs
metadata in rds, content in object storage
cdn + cache
last write wins or CRDTs
rest api
/documents/{id}
get post put delete
ws for real-time colab
delta-based version snapshots
message queue for edits
db replication to scale reads
partition to scale writes

## topk
redis sorted set `ZSET` `ZREVRANGE`
batch updates
shard by id in a redis cluster
new key per day
it's not real time and uses more memory than streaming
streaming can make sense for sub-minute latency or complex event processing. eg. flink, kafka-streams

## streaming
music
video
movie

## notif.
mq
workers
templates
layered caching
load spikes?
websockets? notif. are one-sided?
SSE, webhooks
