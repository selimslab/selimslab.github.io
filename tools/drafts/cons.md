I'll read and summarize the chapter on Consistency and Consensus for you.
Read file: tools/books/key/data-intensive/18-ch09.md

Read file: tools/books/key/data-intensive/18-ch09.md

Read file: tools/books/key/data-intensive/18-ch09.md

# Chapter 9 Summary: Consistency and Consensus

## Main Thesis
Distributed systems face fundamental challenges in keeping data consistent across replicas and achieving consensus among nodes. The chapter explores consistency models and consensus algorithms as general-purpose abstractions for building fault-tolerant distributed systems.

## Key Concepts

### Consistency Guarantees
- **Eventual consistency**: Weakest guarantee - replicas converge eventually but timing is unspecified
- **Linearizability**: Strongest consistency model - makes system appear as single copy of data with atomic operations
- **Causal consistency**: Middle ground between eventual and linearizable consistency

### Linearizability
**Definition**: System behaves as if there's only one copy of data, all operations atomic

**Examples**:
- Alice/Bob World Cup scenario - Bob sees stale data after Alice announces result
- Compare-and-set operations must respect ordering constraints
- Cross-channel timing dependencies (image resizer with message queue + file storage)

**Use cases requiring linearizability**:
- Leader election and distributed locking
- Uniqueness constraints (usernames, bank balances)
- Systems with multiple communication channels

**Implementation approaches**:
- Single-leader replication: potentially linearizable
- Consensus algorithms: linearizable (ZooKeeper, etcd)
- Multi-leader replication: not linearizable
- Leaderless replication: probably not linearizable (even with quorums)

**Cost**: Performance penalty - response time proportional to network delay uncertainty

### CAP Theorem
Better stated as Consistent or Available when Partitioned
- With network partitions, choose between linearizability or availability
- Linearizability requires coordination, reducing fault tolerance
- Multi-leader systems sacrifice consistency for availability

### Ordering and Causality
**Causality**: Natural ordering based on cause-and-effect relationships
- Question must come before answer
- Row creation before update
- Snapshot isolation maintains causal consistency

**Total vs Partial Order**:
- Linearizability provides total order (all operations comparable)
- Causality provides partial order (some operations concurrent/incomparable)

**Sequence Number Ordering**:
- **Lamport timestamps**: Consistent with causality using (counter, node_id) pairs
- **Non-causal generators**: Clock timestamps, block allocation, per-node counters
- **Limitation**: Timestamp ordering insufficient for real-time decisions (username uniqueness example)

### Total Order Broadcast
**Properties**:
- Reliable delivery: no message loss
- Totally ordered delivery: same order on all nodes

**Uses**:
- Database replication (state machine replication)
- Serializable transactions
- Fencing tokens for distributed locks

**Relationship to linearizability**: Can build linearizable storage on total order broadcast

## Distributed Transactions and Consensus

### Two-Phase Commit (2PC)
**Algorithm**:
1. Coordinator sends prepare requests
2. Participants vote yes/no
3. Coordinator decides and logs decision
4. Coordinator sends commit/abort to all

**Problems**:
- Coordinator failure leaves participants in doubt
- Transactions hold locks during uncertainty
- Blocking protocol - can get stuck waiting

**Performance**: MySQL distributed transactions 10x slower than single-node

### XA Transactions
Standard for heterogeneous distributed transactions across different systems (databases, message brokers)

**Limitations**:
- Coordinator as single point of failure
- Lowest common denominator approach
- Amplifies failures rather than tolerating them

### Fault-Tolerant Consensus
**Formal properties**:
- Uniform agreement: all nodes decide same value
- Integrity: no node decides twice
- Validity: decided value was proposed
- Termination: non-crashed nodes eventually decide

**Requirements**: Majority of nodes must be operational

**Algorithms**: Viewstamped Replication, Paxos, Raft, Zab

**Key insight**: Consensus equivalent to total order broadcast

**Epoch numbering**: Leaders identified by increasing epoch numbers with quorum-based validation

**Limitations**:
- Requires majority to operate (minimum 3 nodes for 1 failure)
- Sensitive to network delays
- Fixed membership in basic algorithms

### Consensus Equivalencies
Problems reducible to consensus:
- Linearizable compare-and-set registers  
- Atomic transaction commit
- Total order broadcast
- Distributed locks and leases
- Membership services
- Uniqueness constraints

## Coordination Services

### ZooKeeper/etcd Features
- Linearizable atomic operations
- Total ordering with monotonic transaction IDs
- Failure detection via session timeouts
- Change notifications for clients

**Use cases**:
- Leader election
- Work allocation across nodes
- Service discovery
- Membership services

**Design**: Small amount of slowly-changing data replicated across 3-5 nodes using consensus

## Key Trade-offs

1. **Consistency vs Performance**: Stronger guarantees come with performance costs
2. **Consensus vs Availability**: Consensus requires majority, reducing availability during partitions  
3. **Coordination overhead**: Linearizability slower than causal consistency
4. **Implementation complexity**: Building consensus algorithms is difficult - better to use existing services

## Practical Implications
- Not every system needs consensus - leaderless/multi-leader systems accept weaker consistency
- ZooKeeper provides outsourced consensus for applications
- CAP theorem has limited practical value - many other trade-offs matter
- Causal consistency offers sweet spot: stronger than eventual, faster than linearizable

The chapter concludes that while consensus is fundamental to many distributed system problems, the costs and complexity mean it should be used judiciously, with existing proven implementations preferred over custom solutions.
