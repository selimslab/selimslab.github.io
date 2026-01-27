---
---
## uniq ids
uuid: not-sortable
id-server: spof
snowflake id: timestamp + data center id + machine id + sequence number

## rate limiter 
```
token bucket 
leaky bucket 
sliding window with weight 

redis incr 
k8s ingress controller 
```

## file system
metadata vs data
levels

inode
block

tree

## maps
s2
geohash
tiles

point vs vector
static vs dynamic

## docs
metadata in rds
content in object storage

cdn
cache

ws
CRDTs
edit q
delta-based version snapshots

## topk
redis sorted set, sharded in cluster
`ZSET` `ZREVRANGE`

batch updates

## notif.
mq
workers
templates

SSE
webhooks


## next 
```
streaming
payments
search engine
chat
maps 
news
trader
```