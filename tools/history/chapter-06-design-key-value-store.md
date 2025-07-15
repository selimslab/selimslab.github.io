# Chapter 6: Design a Key-Value Store

## Problem Definition and Requirements

### Key-Value Store Characteristics
- **Key-value pair**: Unique identifier (key) with associated value
- **Key types**: Plain text ("last_logged_in_at") or hashed (253DDEC4)
- **Value types**: Strings, lists, objects (treated as opaque)
- **Size constraint**: Key-value pairs < 10 KB

### System Requirements
- **Big data support**: Handle large datasets
- **High availability**: Quick response during failures
- **High scalability**: Support for large datasets
- **Automatic scaling**: Add/remove servers based on traffic
- **Tunable consistency**: Configurable consistency levels
- **Low latency**: Fast operations

### Core Operations
- `put(key, value)`: Insert value associated with key
- `get(key)`: Retrieve value associated with key

## Single Server Key-Value Store

### Basic Implementation
- **Hash table**: Store key-value pairs in memory
- **Limitation**: Memory space constraints
- **Optimizations**:
  - Data compression
  - Store frequently used data in memory, rest on disk

### Scaling Problem
- Single server reaches capacity quickly
- Need distributed solution for big data

## CAP Theorem

### Definition
"It is impossible for a distributed system to simultaneously provide more than two of these three guarantees: consistency, availability, and partition tolerance."

### Three Properties
1. **Consistency**: All clients see same data simultaneously
2. **Availability**: System responds despite node failures
3. **Partition Tolerance**: System operates despite network partitions

### CAP Classifications
- **CP Systems**: Consistency + Partition Tolerance (sacrifice availability)
- **AP Systems**: Availability + Partition Tolerance (sacrifice consistency)
- **CA Systems**: Consistency + Availability (sacrifice partition tolerance)

**Reality**: CA systems cannot exist in real-world distributed systems due to inevitable network partitions.

## CAP in Practice

### Ideal Situation
- No network partitions
- Data replicated across n1, n2, n3
- Both consistency and availability achieved

### Real-World Scenario
**Problem**: Node n3 goes down, cannot communicate with n1, n2

**CP Choice** (Consistency over Availability):
- Block write operations to n1, n2
- Prevents data inconsistency
- System becomes unavailable
- **Example**: Bank systems requiring exact balance info

**AP Choice** (Availability over Consistency):
- Continue accepting reads/writes
- May return stale data
- Sync when partition resolved
- **Example**: Social media feeds

## Data Partition

### Challenge
- Large datasets cannot fit on single server
- Need even distribution across servers
- Minimize data movement when nodes added/removed

### Solution: Consistent Hashing
1. **Server placement**: Hash servers onto ring
2. **Key placement**: Hash keys onto same ring
3. **Key lookup**: Go clockwise from key to find server

### Advantages
- **Automatic scaling**: Add/remove servers automatically
- **Heterogeneity**: More virtual nodes for higher capacity servers

## Data Replication

### Replication Strategy
- **N replicas**: Configurable parameter
- **Selection logic**: Walk clockwise from key position, choose first N servers
- **Virtual nodes**: Ensure N replicas on different physical servers

### Geographic Distribution
- **Problem**: Data center failures (power, network, disasters)
- **Solution**: Replicas in distinct data centers connected by high-speed networks

## Consistency Models

### Quorum Consensus
**Parameters**:
- **N**: Number of replicas
- **W**: Write quorum size (acknowledgments needed)
- **R**: Read quorum size (responses needed)

**Example**: N=3, W=1, R=1
- Write success: 1 acknowledgment from 3 replicas
- Read success: 1 response from 3 replicas

### Consistency Configurations
- **Fast read**: R=1, W=N
- **Fast write**: W=1, R=N
- **Strong consistency**: W+R > N (typically N=3, W=R=2)
- **Weak consistency**: W+R ≤ N

### Consistency Types
1. **Strong consistency**: Read returns most recent write
2. **Weak consistency**: May not see most recent write
3. **Eventual consistency**: All replicas converge given enough time

**Recommendation**: Eventual consistency (used by Dynamo, Cassandra)

## Inconsistency Resolution: Versioning

### Vector Clocks
**Definition**: [server, version] pair associated with data item
- **Format**: D([S1, v1], [S2, v2], ..., [Sn, vn])
- **Purpose**: Detect conflicts and determine version relationships

### Vector Clock Algorithm
**Write operation to server Si**:
1. If [Si, vi] exists: increment vi
2. Otherwise: create new entry [Si, 1]

### Conflict Detection
- **Ancestor relationship**: All counters in Y ≥ corresponding counters in X
- **Sibling relationship**: Any counter in Y < corresponding counter in X
- **Example conflict**: D([s0, 1], [s1, 2]) vs D([s0, 2], [s1, 1])

### Vector Clock Limitations
- **Client complexity**: Must implement conflict resolution
- **Size growth**: [server:version] pairs can grow rapidly
- **Solution**: Set threshold, remove oldest pairs when exceeded

## Failure Handling

### Failure Detection
**Gossip Protocol**:
1. Each node maintains membership list with heartbeat counters
2. Nodes periodically increment own heartbeat
3. Nodes send heartbeats to random nodes
4. If heartbeat not updated for predefined period, node marked offline

### Temporary Failures: Sloppy Quorum
- **Problem**: Strict quorum blocks operations when nodes fail
- **Solution**: Choose first W healthy servers for writes, R for reads
- **Hinted handoff**: Another server temporarily processes requests
- **Recovery**: When failed server returns, data pushed back

### Permanent Failures: Anti-Entropy
**Merkle Trees**:
- **Purpose**: Detect inconsistencies and minimize data transfer
- **Structure**: Hash tree where non-leaf nodes = hash of children
- **Comparison**: Compare root hashes, traverse to find differences

**Merkle Tree Construction**:
1. Divide key space into buckets
2. Hash each key in bucket
3. Create single hash per bucket
4. Build tree upward calculating hashes

**Synchronization**: Only sync buckets with different hashes

## System Architecture

### Core Components
- **Client APIs**: `get(key)` and `put(key, value)`
- **Coordinator**: Proxy between client and key-value store
- **Consistent hashing**: Distribute nodes on ring
- **Decentralized**: No single point of failure
- **Replication**: Data copied to multiple nodes

### Write Path
1. **Commit log**: Persist write request
2. **Memory cache**: Save data in memory
3. **SSTable**: Flush to disk when cache full/threshold reached

**SSTable**: Sorted-string table = sorted list of <key, value> pairs

### Read Path
1. **Memory check**: Return data if in cache
2. **Bloom filter**: Determine which SSTables might contain key
3. **SSTable lookup**: Retrieve data from disk
4. **Return result**: Send data to client

**Bloom filter**: Probabilistic data structure to test set membership

## Data Center Outage

### Problem
- Power outage, network outage, natural disasters
- Entire data center becomes unavailable

### Solution
- **Multi-data center replication**: Replicate data across multiple data centers
- **Failover capability**: Users access data from other data centers
- **Geographic distribution**: Reduce latency and increase availability

## Performance Optimization

### Memory Management
- **Commit log**: Sequential writes for durability
- **Memory cache**: Fast access to recent data
- **SSTable**: Efficient disk storage

### Read Optimization
- **Bloom filter**: Avoid unnecessary disk reads
- **Cache hierarchy**: Memory → disk lookup only if needed
- **Sorted storage**: Efficient range queries

## Summary Table

| Feature | Technique |
|---------|-----------|
| Partition | Consistent hashing |
| Replication | N replicas with geographic distribution |
| Consistency | Quorum consensus |
| Inconsistency resolution | Vector clocks |
| Failure detection | Gossip protocol |
| Temporary failure | Sloppy quorum + hinted handoff |
| Permanent failure | Merkle trees |
| Data center outage | Cross-data center replication |

## Key Design Decisions

### Consistency vs Availability Trade-off
- **Banking**: Choose consistency (CP)
- **Social media**: Choose availability (AP)
- **E-commerce**: Tunable based on operation type

### Replication Factor
- **N=3**: Common choice balancing durability and cost
- **Higher N**: More durability, higher cost
- **Lower N**: Lower cost, less durability

### Quorum Configuration
- **W=1, R=1**: Low latency, eventual consistency
- **W=2, R=2, N=3**: Strong consistency with fault tolerance
- **W=N, R=1**: Optimized for reads
- **W=1, R=N**: Optimized for writes

## Real-World Examples

### Systems Using These Techniques
- **Amazon Dynamo**: CP with eventual consistency
- **Apache Cassandra**: AP with tunable consistency
- **Google Bigtable**: CP with strong consistency
- **Redis**: Single-node with replication
- **Memcached**: Simple key-value caching

## Key Takeaways

1. **CAP theorem** forces trade-offs between consistency and availability
2. **Consistent hashing** enables effective data partitioning
3. **Quorum consensus** provides tunable consistency
4. **Vector clocks** resolve conflicts in distributed systems
5. **Gossip protocol** enables decentralized failure detection
6. **Merkle trees** minimize data transfer during synchronization
7. **Multi-data center replication** handles large-scale failures
8. **Eventual consistency** is practical for most applications