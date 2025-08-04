---
---
data models and query langs 
• Choose data models by relationship patterns - documents for trees,
relational for many-to-many, graphs for complex interconnections

• Document locality beats joins when loading complete objects frequently

• Schema-on-read vs schema-on-write - documents for heterogeneous data,
relational for uniform structure

• Declarative queries enable optimization - SQL/Cypher outperform imperative
code for maintainability

• Plan schema evolution upfront - documents use app migration, relational uses
ALTER TABLE

• Polyglot persistence works - different models for different use cases in
same application

• Join performance matters - database joins often faster than
application-level joins

• Graph databases excel at traversals - variable-length paths impossible in
fixed SQL joins

• Document size impacts updates - small documents avoid rewrite penalties

• Impedance mismatch reduced with documents for object-oriented applications

• Convergence happening - JSON in SQL databases, joins in document stores

• Don't over-normalize when locality provides clear benefits


## replication 
  • Leader-based replication - Single writer node forwards changes to
  read replicas. Simple to implement, handles most use cases.

  • Asynchronous replication - Leader doesn't wait for follower
  acknowledgment. Faster but risks data loss on failures.

  • Semi-synchronous setup - One synchronous follower, others async.
  Balances performance with data safety.

  • Read-after-write consistency - Route user's own data reads to leader.
   Prevents seeing stale own updates.

  • Monotonic reads - Always read from same replica per user. Prevents
  time-going-backward anomalies.

  • Failover automation - Detect leader failures via timeouts. Promote
  follower with latest data. Reconfigure clients.

  • Multi-leader for geo-distribution - Leader per datacenter reduces
  cross-region latency. Handle write conflicts.

  • Conflict avoidance - Route user writes to same datacenter/leader.
  Simpler than conflict resolution.

  • Quorum reads/writes - Read from R nodes, write to W nodes where
  W+R>N. Ensures latest data overlap.

  • Version vectors - Track causality across replicas. Enables proper
  conflict detection and resolution.

  • Read repair - Fix stale replicas during reads. Anti-entropy processes
   catch rarely-read data.

  • Sloppy quorums - Accept writes to substitute nodes during outages.
  Improves availability.

  • Logical replication logs - Decouple from storage engine. Enable
  zero-downtime upgrades.

  • Monitor replication lag - Alert on excessive delays. Critical for
  maintaining data freshness.

## part. 

  • Scale by breaking data into partitions - Single machines can't handle
   massive datasets or query throughput

  • Avoid hot spots through even distribution - Skewed partitions create
  bottlenecks where one node handles disproportionate load

  • Key range partitioning enables efficient range queries - Sort keys
  and assign ranges to partitions, but risk hot spots with sequential
  writes

  • Hash partitioning distributes load evenly - Hash keys to scatter
  data, but lose range query capability

  • Use compound keys for hybrid approach - Hash first part for
  distribution, sort remaining parts for range scans (Cassandra model)

  • Handle hot keys with random suffixes - Split extremely popular keys
  across multiple partitions when needed

  • Secondary indexes require scatter/gather or global indexes - Local
  indexes need queries to all partitions; global indexes slow writes but
  fast reads

  • Fixed partitions work for predictable growth - Create many more
  partitions than nodes, move whole partitions when rebalancing

  • Dynamic partitioning adapts to data volume - Split large partitions,
  merge small ones, better for variable dataset sizes

  • Manual rebalancing prevents cascading failures - Automatic
  rebalancing during node overload can worsen problems

  • Use routing layers or gossip protocols for request routing - Clients
  need to find correct partition; coordinate through ZooKeeper or node
  gossip

  • Consider operational complexity vs performance - Global indexes
  faster for reads but complicate writes; local indexes simpler but
  slower queries

## txs 

  • ACID Reality Check - Consistency is app responsibility; isolation
  levels vary wildly between vendors despite "ACID" claims
  • Isolation Trade-offs - Read Committed for simple apps, Snapshot for
  analytics, Serializable only when business logic demands it
  • Race Condition Prevention - Lost updates need atomic ops; write skew
  needs serializable isolation or explicit locking
  • Concurrency Mechanisms - 2PL blocks everything; serial execution
  requires in-memory; SSI offers best balance
  • Implementation Strategy - Keep transactions short; prefer
  single-object atomics; implement retry with exponential backoff
  • Critical Anti-patterns - Don't trust marketing claims; avoid long
  interactive transactions; understand cross-partition costs
  • Selection Criteria - OLTP needs fast consistency; analytics wants
  snapshot isolation; financial systems require serializability
  • Error Handling - Distinguish permanent vs transient failures; build
  robust retry mechanisms with conflict detection

## trouble 

  • Network failures are inevitable - messages lost, delayed, duplicated,
   reordered
  • Use timeouts carefully - balance false failures vs delayed recovery•
  Never trust synchronized clocks - use logical counters for event
  ordering
  • Process pauses happen - GC, virtualization, OS scheduling cause
  unexpected delays
  • Build quorum-based decisions - single nodes cannot make critical
  choices alone
  • Implement fencing tokens - prevent split-brain in leader election
  • Design for crash-recovery - nodes fail and restart losing memory
  state
  • Monitor clock drift - remove nodes with excessive time deviation
  • Test network partitions - artificially simulate failures with chaos
  engineering
  • Assume partial failures - the defining characteristic of distributed
  systems
  • Safety properties must never be violated - even during total system
  failure
  • Use adaptive timeouts - adjust based on observed system behavior
  • Build suspicion into design - pessimism and paranoia are survival
  traits
  • Embrace uncertainty - think in confidence intervals not absolutes
  • Something is always broken - in large distributed systems this is
  normal