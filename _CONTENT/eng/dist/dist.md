---
---
network
time/order
partial failures

## consistency
preserve invariants
1. linear: single copy illusion. single leader + election consensus
2. causal: vector clocks + causal dep. tracking
3. eventual

session models
- read after write: route writes to same leader
- monotonic reads
- consistent prefix reads: causal

## consensus
= total-order broadcast
clients see a linear system
single copy illusion
raft
- majority ack
- one leader per term

split brain: lease + fencing token

## availability
heartbeat pings with timeout
lease with ttl
gossip

phi accrual: adapt heartbeat to network conditions.
prob. dist. of arrivals in a sliding window


## time
- NTP: network latency
- GPS: satellite latency, normally lower than network
- vector clock: a list of counters for each node [c1 .. cn]


## idempotence 
id gen
- uuid not-sortable
- id server spof
- snowflake id: timestamp + data center id + machine id + sequence number
