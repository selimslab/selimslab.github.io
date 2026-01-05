---
---
## uniq ids
uuid: not-sortable
id-server: spof
snowflake id: timestamp + data center id + machine id + sequence number

idempotence: uniq id + dedup + atomic commit + fencing

## partial failures
idempotent retry
consensus

## time
NTP GPS vector clocks

## availability
heartbeat pings with timeout, adapt to network conditions
lease with ttl
gossip

## consistency
linearizable: single leader + election consensus
causal: vector clocks + dependency tracking
eventual: event sourcing or local + outbox table

session models
read after write: route writes to same leader
monotonic reads: read from same server
consistent prefix reads: causality

## consensus
raft: majority ack, one leader per term
split brain: lease + fencing token