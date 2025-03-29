---
---

Timestamps are unreliable since nodes cannot agree on time 

Network Time Protocol (NTP)

Vector clocks 

Sequence numbers 


## Patterns

- **Lamport Clock**
  - Establish event order without synchronized clocks
  - Increment logical counters on events and message receipt
    - Assign counter values to operations; update counters to maximum seen during communication
  - Cassandra uses logical timestamps for conflict resolution

- **Hybrid Clock**
  - Combine wall-clock time with logical ordering guarantees
  - Pair physical timestamps with logical counters to handle clock skew
    - Use physical time when clocks agree, fall back to logical increments when detecting clock skew
  - CockroachDB uses hybrid logical clocks to order transactions with meaningful timestamps

- **Version Vector**
  - Detect concurrent updates in multi-master systems
  - Track per-node counters for the latest version seen from each node
    - Increment local counter with each update; compare vectors to reveal causal relationships or concurrency
  - Riak uses version vectors to identify and resolve conflicts during read operations

- **Generation Clock**
  - Detect when a node has disconnected and reconnected
  - Use monotonically increasing number to indicate server generation/epoch
    - Increment generation on restart; override lower generations with higher ones
  - Cassandra uses generation numbers to detect node restarts and prevent zombie nodes

- **Clock-Bound Wait**
  - Handle clock uncertainty in systems relying on physical timestamps
  - Wait for the maximum clock skew period before certain operations
    - Calculate maximum possible clock skew and wait that duration to ensure time ordering
  - Google Spanner waits for the "uncertainty bound" before committing transactions

[Patterns of Distributed Systems by Martin Fowler](https://martinfowler.com/articles/patterns-of-distributed-systems/) 