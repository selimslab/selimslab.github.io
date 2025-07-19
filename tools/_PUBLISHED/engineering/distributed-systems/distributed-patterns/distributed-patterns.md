---
title: Patterns
---


### 1. **Node Communication Patterns**
**Goal:** Efficient, reliable communication between distributed nodes

**Key Patterns:**
- **Request Batch** - Combine multiple requests to reduce network overhead (Kafka producers)
- **Request Pipeline** - Send multiple requests without waiting for responses (Redis pipelining)
- **Single-Socket Channel** - Use one TCP connection for FIFO ordering (ZooKeeper)
- **Gateway Aggregation** - Aggregate multiple backend requests into single request
- **Asynchronous Request-Reply** - Decouple backend processing from frontend hosts

### 2. **Data Consistency & Replication**
**Goal:** Keep distributed data synchronized and queryable

**Key Patterns:**
- **Replicated Log** - Append-only log replicated across nodes (Kafka commit log)
- **High-Water Mark** - Track safely replicated data boundaries
- **Event Sourcing** - Store full event series in append-only store
- **CQRS** - Separate read/write operations with different interfaces
- **Versioned Value** - Store multiple timestamped versions (Cassandra)

### 3. **Coordination & Leadership**
**Goal:** Coordinate actions across distributed nodes

**Key Patterns:**
- **Leader and Followers** - Single leader sequences writes, followers replicate
- **Majority Quorum** - Require >50% agreement to prevent split-brain (etcd)
- **Paxos** - Two-phase consensus protocol for fault tolerance
- **Lease** - Time-bound exclusive access with automatic expiration (Chubby)
- **Consistent Core** - Small consensus cluster coordinates larger cluster (Hadoop NameNode)

### 4. **Failure Detection & Recovery**
**Goal:** Detect failures and recover system state

**Key Patterns:**
- **HeartBeat** - Periodic "I'm alive" messages for failure detection
- **Write-Ahead Log** - Persist operations before applying to enable crash recovery (PostgreSQL WAL)
- **Circuit Breaker** - Handle faults that take variable time to fix
- **Compensating Transaction** - Undo work when distributed transaction fails
- **Gossip Dissemination** - Spread information through random peer exchanges (Cassandra)

### 5. **Scalability & Performance**
**Goal:** Scale throughput and optimize resource usage

**Key Patterns:**
- **Sharding** - Divide data stores into horizontal partitions
- **Cache-Aside** - Load data on demand into cache
- **Competing Consumers** - Multiple consumers process messages on same channel
- **Queue-Based Load Leveling** - Use queues to smooth intermittent loads
- **Follower Reads** - Serve reads from followers to scale read throughput

### 6. **Security & Resilience**
**Goal:** Protect system integrity and isolate failures

**Key Patterns:**
- **Bulkhead** - Isolate application elements to prevent cascading failures
- **Gatekeeper** - Dedicated broker validates all requests
- **Rate Limit Pattern** - Control request rates to avoid throttling
- **Anti-Corruption Layer** - Façade between modern and legacy systems

## Most Critical Patterns for Distributed Systems

1. **Replicated Log + Leader/Followers** - Foundation for most distributed databases
2. **Majority Quorum** - Essential for avoiding split-brain scenarios  
3. **Write-Ahead Log** - Critical for durability and recovery
4. **Circuit Breaker** - Essential resilience pattern for service interactions
5. **Request Batch/Pipeline** - Core optimization for network efficiency

The patterns work together - for example, a typical distributed database uses Leader/Followers for coordination, Replicated Log for consistency, Majority Quorum for availability, and Write-Ahead Log for durability.