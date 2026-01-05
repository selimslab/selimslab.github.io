---
---
## consistency
linearizable
single copy illusion 
single leader
election consensus
sync replication or quorum

causal
vector clocks + dependency tracking

eventual
async replication
conflict resolution (LWW, CRDTs, version vectors)

## consensus
raft: majority ack, one leader per term
split brain: lease + fencing token
paxos
pbft: o(n2)

## time and order 
NTP
GPS 

lamport clock: single counter per process, can only tell if A happens-before B
vector clocks: list of counters per process, can detect concurrency, detects conflicts 
version vector: each replica tracks versions of replicated data objects 

## availability
heartbeat pings with timeout, adapt to network conditions
lease with ttl
gossip

## atomic commit
2PC: ask all, commit if they all ack, like marriage, coordinator spof 
practical: 2pc + raft for coordinator failover 
