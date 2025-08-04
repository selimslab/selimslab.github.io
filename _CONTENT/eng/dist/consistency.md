---
---
# levels 

## linearizable
- single copy illusion
- costs perf & availability 

single leader + consensus 

often give up lin. for perf and fault tolerance 

## causal
- vector clocks + causal dep. tracking 

## eventual 

leaderless or multi-leader 

---

## cap 
mostly historical, not 2 choice but levels 


## consensus algos 
core props: agreement, integrity, validity, termination 

practical: raft, paxos

needs majority quorum


## total order broadcast

apps: state machine rep, dist. locks with fencing tokens 
most cons. algos provide this 

tob = consensus = linearizable compare-and-set

## coord. services 

zk/etcd model: small consensus cluster
use cases: leader election, config. management, service discovery, work allocation 

use for coord. metadata, not app data 

etcd, k8s
zk, kafka

minimize coord. 
question lin. needs: causal often enough 
