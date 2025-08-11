---
---
troubles
- network
- time/order
- partial failures

consistency
- idempotency
- replicas
- logical clocks

consensus
- quorum + lease + fencing token
- paxos/raft

avail.
- heartbeat, ping, lease, ttl, timeout
- gossip
- phi accrual: adapt heartbeat to network conditions. prob. dist. of arrivals in a sliding window

id gen
- uuid but not-sortable
- id server but spof
- snowflake id: timestamp + data center id + machine id + sequence number

time
- NTP: network latency
- GPS: satellite latency, normally lower than network
- vector clock: a list of counters for each node [c1 .. cn]
