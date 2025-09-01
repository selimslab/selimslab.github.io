---
---
10x perf. penalty
coordinator spof
often avoided

2PC: ask all, commit if they all ack.
blocks if coord. fails after prepare.
use timeouts and detect failures

raft: replicate entire tx log via raft. higher latency

pbft: O(n2)

saga: commit or compensate

eventual
event sourcing
outbox: write to local + outbox table
