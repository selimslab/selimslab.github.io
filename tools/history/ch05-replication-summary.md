# Chapter 5 Summary: Replication

## Overview

**Replication** = keeping copies of the same data on multiple machines connected via network.

**Purposes:**
- Reduce latency (geographically close to users)
- Increase availability (system continues despite failures) 
- Scale read throughput (multiple machines serve reads)

**Core challenge:** Handling changes to replicated data. Three main approaches:
1. **Single-leader** replication
2. **Multi-leader** replication  
3. **Leaderless** replication

## Single-Leader Replication

### Architecture
- One replica designated as **leader** (master/primary)
- Other replicas are **followers** (read replicas/slaves/secondaries)
- **Write flow:** Clients → Leader → Followers via replication log
- **Read flow:** Clients can read from any replica

### Synchronous vs Asynchronous Replication

**Synchronous:**
- Leader waits for follower confirmation before reporting success
- Guarantees up-to-date copy on follower
- Risk: Any follower failure blocks all writes

**Asynchronous:**
- Leader sends data but doesn't wait for follower response
- Allows continued processing if followers lag
- Risk: Data loss if leader fails before replication

**Semi-synchronous:** One synchronous follower + others asynchronous (practical compromise)

### Setting Up New Followers
1. Take consistent snapshot of leader (without locking database)
2. Copy snapshot to new follower
3. Follower requests all changes since snapshot (using log sequence number/binlog coordinates)
4. Process backlog until "caught up"
5. Continue processing real-time changes

### Node Outages

**Follower failure (Catch-up recovery):**
- Follower keeps local log of received changes
- After restart, requests missing changes from last processed transaction
- Applies changes to catch up with leader

**Leader failure (Failover):**
Process:
1. **Detect failure:** Timeout-based (e.g., 30 seconds)
2. **Choose new leader:** Election or controller appointment (consensus problem)
3. **Reconfigure system:** Redirect client writes to new leader

**Failover problems:**
- Data loss from unreplicated writes
- Split-brain scenarios (two leaders)
- Timeout tuning trade-offs
- External system consistency issues

### Replication Log Implementation

**Statement-based:**
- Replicate SQL statements (INSERT, UPDATE, DELETE)
- Problems: Non-deterministic functions, execution order dependencies

**Write-ahead log (WAL) shipping:**
- Replicate storage engine's append-only log
- Very low-level (disk block changes)
- Tight coupling to storage engine

**Logical (row-based):**
- Sequence of records describing row-level changes
- Decoupled from storage engine
- Easier external parsing (change data capture)

**Trigger-based:**
- Application-level replication using database triggers
- Higher overhead but maximum flexibility

## Replication Lag Problems

### Read-After-Write Consistency
**Problem:** User writes data but subsequent read shows stale data

**Solutions:**
- Read user's own data from leader
- Track last update timestamp, read from leader for time period
- Remember write timestamp, ensure replica is sufficiently up-to-date
- Route user's devices to same datacenter

### Monotonic Reads  
**Problem:** User sees data "go backward in time" when reading from different replicas

**Solution:** Ensure each user always reads from same replica (e.g., hash user ID)

### Consistent Prefix Reads
**Problem:** Seeing effects before causes (e.g., answer before question)

**Solution:** Ensure causally-related writes go to same partition, or track causal dependencies

## Multi-Leader Replication

### Use Cases

**Multi-datacenter operation:**
- Leader in each datacenter
- Benefits: Better performance, datacenter outage tolerance, network problem tolerance
- Drawback: Conflict resolution complexity

**Offline operation:**
- Each device acts as leader (extreme multi-datacenter)
- Sync when connectivity available

**Collaborative editing:**
- Multiple users edit simultaneously
- Small change units (keystrokes) without locking

### Write Conflicts

**Conflict detection:**
- Synchronous: Loses multi-leader advantage
- Asynchronous: Conflict detected after successful writes

**Conflict avoidance:**
- Route user's writes to same datacenter/leader
- Breaks down during failover or user movement

**Conflict resolution approaches:**
- **Last write wins (LWW):** Timestamp-based, prone to data loss
- **Replica precedence:** Higher-numbered replica wins
- **Value merging:** Concatenate, order alphabetically
- **Application-level:** Store all versions, resolve later

**Custom conflict resolution:**
- On write: Background process, no user interaction
- On read: Return multiple versions, application resolves

**Automatic conflict resolution:**
- **CRDTs (Conflict-free Replicated Data Types):** Automatically merge concurrent edits
- **Mergeable persistent data structures:** Git-like three-way merge
- **Operational transformation:** For ordered lists (collaborative editors)

### Replication Topologies
- **All-to-all:** Every leader sends to every other (fault-tolerant but causality issues)
- **Circular:** Each node forwards to one other (single point of failure)
- **Star:** Central node forwards to all others (single point of failure)

**Causality problem:** Updates may arrive out of order, needs version vectors for correct ordering.

## Leaderless Replication

### Architecture
- No leader designation
- Clients write to multiple replicas in parallel
- Popularized by Amazon Dynamo, implemented in Riak, Cassandra, Voldemort

### Handling Node Failures

**Write process:**
- Send to all n replicas in parallel
- Consider successful if w replicas acknowledge
- Ignore failed replicas

**Read process:**
- Query r replicas in parallel
- Use version numbers to identify newest value

### Repair Mechanisms

**Read repair:**
- Detect stale responses during read
- Write newer value back to stale replicas
- Works well for frequently read data

**Anti-entropy process:**
- Background process copies missing data between replicas
- No particular order, significant delays possible
- Not all systems implement this

### Quorums

**Quorum condition:** w + r > n
- n = total replicas
- w = write quorum (minimum successful writes)
- r = read quorum (minimum reads)

**Common configuration:**
- n = 3 or 5 (odd numbers)
- w = r = (n+1)/2

**Fault tolerance:**
- w < n: Can process writes if nodes unavailable
- r < n: Can process reads if nodes unavailable
- n=3, w=2, r=2: Tolerate 1 unavailable node
- n=5, w=3, r=3: Tolerate 2 unavailable nodes

### Quorum Limitations

**Even with w + r > n, stale reads possible due to:**
- Sloppy quorums (different nodes for reads/writes)
- Concurrent writes (unclear ordering)
- Concurrent read/write operations
- Partial write failures
- Failed nodes with data loss
- Timing edge cases

### Sloppy Quorums and Hinted Handoff

**Sloppy quorum:**
- During network partition, accept writes to reachable nodes outside designated n nodes
- **Hinted handoff:** Send data to correct nodes when network heals
- Increases write availability but reduces read consistency guarantees

### Detecting Concurrent Writes

**Last Write Wins (LWW):**
- Use timestamps to determine "most recent"
- Achieves convergence but loses data
- Safe only for immutable keys (e.g., UUIDs)

**Happens-before relationship:**
- Operation A happens before B if B knows about/depends on A
- Operations are concurrent if neither knows about the other
- Algorithm tracks version numbers to detect concurrency

**Version vectors:**
- Multiple replicas need version number per replica
- Collection called version vector (or dotted version vector)
- Allows detection of concurrent vs. sequential writes

**Sibling merging:**
- Application must merge concurrent values
- Union for shopping carts
- Tombstones for deletions
- CRDTs can automate sensible merging

## Key Insights

**Replication fundamentals:**
- Simple goal (copy data) with complex implementation
- Must handle concurrency, failures, network issues
- Trade-offs between consistency, availability, performance

**Consistency models:**
- **Strong consistency:** Synchronous replication, transactions
- **Eventual consistency:** Asynchronous replication, conflicts possible
- **Intermediate guarantees:** Read-after-write, monotonic reads, consistent prefix

**Algorithm families:**
- **Single-leader:** Simple, no conflicts, single point of failure
- **Multi-leader:** More robust, complex conflict resolution
- **Leaderless:** Highly available, weak consistency guarantees

**Practical considerations:**
- Monitor replication lag
- Design for failure scenarios
- Choose appropriate consistency model for application needs
- Understand conflict resolution implications 