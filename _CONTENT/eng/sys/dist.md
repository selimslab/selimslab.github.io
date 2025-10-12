---
---
## partial failures
let it fail
idempotent retry
2PC
consensus

## consistency
preserve invariants

linear: single leader + election consensus
causal: vector clocks + dependency tracking
eventual: event sourcing or local + outbox table

### session models
read after write: route writes to same leader

monotonic reads: read from same server

consistent prefix reads: causality

## consensus
total-order broadcast

raft: majority ack, one leader per term

split brain: solve by lease + fencing token


## time
NTP
GPS
vector clocks

## idempotence
uniq id + dedup + atomic commit + fencing

## ids
uuid: not-sortable

id-server: spof

snowflake id: timestamp + data center id + machine id + sequence number

## availability
heartbeat pings with timeout
lease with ttl
gossip

phi accrual
adapt heartbeat to network conditions
prob. dist. of arrivals in a sliding window


## dist tx
10x perf penalty
coordinator spof

2PC: ask all, commit if they all ack.
blocks if coord. fails after prepare.
use timeouts and detect failures

saga: commit or compensate

raft: replicate entire tx log via raft. higher latency

pbft: O(n2)
