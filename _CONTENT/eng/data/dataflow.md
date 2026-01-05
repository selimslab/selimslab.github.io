---
---
## ipc
db
api
msg passing

push: pubsub, ws, sse, webhook
pull: query, poll

stream: events
batch: cron

req-resp
q

MPI: message passing interface
no central coordinator
nodes communicate directly


## batch 

immutable inputs
atomic ops

batch 
partition
compose

data locality
sequential i/o
vectorize
columnar

pre-compute expensive ops
checkpoints

declerative apis = better optimization

spark df
Delta lake: parquet + transaction log + metadata

## stream 

immutable events
side effects

log compaction

event time
delivery time
e2e latency

consumer lag
checkpoint

grace period
watermark

backpressure
circuit breaker

exactly once
idempotence + atomic commits

probabilistic dsa like bloomfilter, hyperloglog

windows
fixed
overlapping
sliding
session

stream + stream : window
stream + table : enrich
table + table : materialized view of join