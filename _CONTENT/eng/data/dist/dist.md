---
---
network
time/order
partial failures

## consistency
preserve invariants

linearz: single copy illusion. single leader + election consensus
causal: vector clocks + causal dep. tracking
eventual

session models
read after write: route writes to same leader
monotonic reads
consistent prefix reads: causal

## consensus
= total-order broadcast

linearz

raft
majority ack
one leader per term

split brain: lease + fencing token

## availability
heartbeat pings with timeout
lease with ttl
gossip

phi accrual: adapt heartbeat to network conditions.
prob. dist. of arrivals in a sliding window

## time
NTP: network latency
GPS: satellite latency, normally lower than network
vector clock: a list of counters for each node [c1 .. cn]

## idempotence 
uniq id + dedup + atomic

## id gen
uuid: not-sortable
id-server: spof
snowflake id: timestamp + data center id + machine id + sequence number
