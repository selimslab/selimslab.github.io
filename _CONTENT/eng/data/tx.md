---
---
group ops. to atomic units
no partial failure
consistency
fk integrity
data sync


## dist tx
10x perf penalty
coordinator spof

saga: commit or compensate
raft: replicate entire tx log via raft. higher latency

2PC: ask all, commit if they all ack, like marriage 
pbft: O(n2)
