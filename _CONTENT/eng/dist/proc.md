---
---
## batch 
immutable inputs
atomic ops

partition
compose

data locality
sequential i/o
vectorize
columnar

pre-compute expensive ops
checkpoints

declerative apis = better optimization

spark
df
Delta lake: parquet + transaction log + metadata


## stream 

immutable events
side effects

event time
delivery time

grace period
watermark

checkpoint
log compaction

consumer lag
e2e latency

backpressure
circuit breaker

exactly once
idempotence + atomic commits

probabilistic dsa like bloomfilter, hyperloglog

windows
- fixed
- overlapping
- sliding
- session

stream + stream : window
stream + table : enrichment
table + table : materialized view