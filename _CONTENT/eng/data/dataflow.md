---
---
## encoding
backward comp: old data, new code

breaking:
deleting required fields
changing field types

keep unknown fields
tags vs names: compact + rename later

schema evolution
avro 
protobuf 

## ipc
db
api
msg passing

push: pubsub, ws, sse, webhook
pull: query, poll
q: decouple, buffer 

MPI
message passing interface
no central coordinator
nodes communicate directly

## delivery guarantees
at-most-once 
at-least-once: retries + idempotent receiver
exactly-once: at-least once + dedup 

producer: add uniq msg ids, retry, track sent msgs on outbox table 
consumer: store seen ids, dedup, process+ack in tx 

producer retry + consumer dedup 

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

exactly once: idempotence + tx commits

probabilistic dsa like bloomfilter, hyperloglog

windows: fixed, overlapping, sliding, session

stream + stream : window
stream + table : enrich
table + table : materialized view of join
