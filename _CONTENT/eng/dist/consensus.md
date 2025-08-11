---
---
core props: agreement, integrity, validity, termination
practical: raft, paxos
needs majority quorum

## total order broadcast
apps: state machine rep, dist. locks with fencing tokens
most cons. algos provide this
tob = consensus = linearizable compare-and-set

## coord. services
zk/etcd model: small consensus cluster, e.g k8s, kafka
use cases: leader election, config. management, service discovery, work allocation
used for coord. metadata, not app data
