---
---

Keeping the same data on multiple nodes 

Why distribute data?
- fault tolerance 
- lower latency, eg. multiple AZs, closer to users 
- scale 

Sync or Async?
1. sync -> wait for a write to be replicated on all nodes 
2. async -> write to the leader and async write followers  
3. semi-sync -> write to the leader and some of the followers and async write others 

What to replicate?
- SQL statements: indeterministic, eg. now() 
- WAL (write ahead log): depends on internal memory layout of a specific db version so upgrades bring downtime 
- Rows: higher level, easier on external systems, nodes can be on different db versions 
- Trigger based: custom code, more flexible, more bug risk, more overhead 

How to replicate?

## Single leader 
- Postgres, MySQL, ..
- Usually requires extensions and helpers to setup 
- If a follower fails, it can get a snapshot from the leader 
- Leader failure is more tricky. You need to detect if the leader is down, elect a new one, and prevent a split brain 

## Leaderless
Since any node can accept writes, a mechanism is necessary to make them consistent 
1. Read repair, read from multiple nodes and accept the latest value 
2. Anti-entropy, run a background process watching for differences in data and update old values 

[[quorum]]

## Multi-leader
Makes more sense in a multiple datacenter setup 

Offline clients and collaborative editing are also similar to a multi leader setup 
