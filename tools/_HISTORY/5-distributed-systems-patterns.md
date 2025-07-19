# Distributed Systems Patterns

From Martin Fowler's catalog: https://martinfowler.com/articles/patterns-of-distributed-systems/

## Core Coordination Patterns

### Leader and Followers
**What**: One server coordinates, others follow
**Why**: Prevents conflicts when multiple servers try to make decisions
**How**: Like a team lead - one person makes final decisions, others execute

**Example**: In Apache Kafka, one broker becomes the partition leader. All writes go through the leader, then replicate to followers. If you have 3 Kafka brokers, only the leader accepts writes for a partition, preventing conflicting updates.

### Majority Quorum  
**What**: Require majority agreement before making decisions
**Why**: Prevents split-brain scenarios where two groups operate independently
**How**: Need >50% of nodes to agree (3 out of 5, 2 out of 3)

**Example**: In MongoDB replica sets with 5 nodes, you need 3 nodes to agree before electing a new primary. If network splits into groups of 2 and 3, only the group of 3 can make decisions.

## Data Consistency Patterns

### Write-Ahead Log (WAL)
**What**: Write changes to a log before applying them to data
**Why**: Ensures durability - if server crashes, you can replay the log
**How**: Every change gets logged first, then applied

**Example**: PostgreSQL writes all changes to WAL files first. If the database crashes during a transaction, it replays the WAL on restart to recover the committed state.

### High-Water Mark
**What**: Track the last successfully replicated log entry
**Why**: Know which data is safely replicated across multiple nodes
**How**: Mark the highest log position that's been copied to majority of replicas

**Example**: In Apache Kafka, the high-water mark shows which messages are available for consumers. Messages below this mark are replicated to enough brokers to be considered "committed."

### Versioned Value
**What**: Store every update with a version number
**Why**: Handle concurrent updates and maintain history
**How**: Increment version on each update, keep old versions

**Example**: DynamoDB stores multiple versions of items. If two clients update the same item concurrently, you get two versions and can resolve conflicts later.

## Time and Ordering Patterns

### Lamport Clock
**What**: Logical timestamps that maintain ordering across nodes
**Why**: System clocks are unreliable in distributed systems
**How**: Increment counter on each event, synchronize with received messages

**Example**: In distributed event sourcing, each event gets a Lamport timestamp. Even if events happen on different servers with clock skew, you can still order them correctly.

### Vector Clock
**What**: Array of counters, one per node, to detect concurrent updates
**Why**: Determine if events are concurrent or causally related
**How**: Each node maintains counters for all nodes, increments own counter

**Example**: Amazon's DynamoDB uses vector clocks. If two clients update an item simultaneously, the vector clocks show the updates are concurrent, flagging a conflict for resolution.

### Hybrid Clock
**What**: Combine system timestamp and logical timestamp
**Why**: Get benefits of both wall-clock time and logical ordering
**How**: Use system time when possible, fall back to logical time for ordering

### Generation Clock
**What**: Monotonically increasing number indicating server generation
**Why**: Track server restarts and prevent stale data acceptance
**How**: Increment counter each time server starts up

## Performance and Reliability Patterns

### Request Pipeline
**What**: Send multiple requests without waiting for responses
**Why**: Reduce latency by avoiding round-trip delays
**How**: TCP pipelining - send request 2 before response 1 arrives

**Example**: Redis pipelining lets you send 100 commands at once instead of waiting for each response. Instead of 100 round-trips, you get near-1 round-trip performance.

### Request Batch
**What**: Combine multiple requests into one network call
**Why**: Reduce network overhead and improve throughput
**How**: Collect requests for a time window, send as one batch

**Example**: Elasticsearch bulk API lets you index 1000 documents in one request instead of 1000 separate requests, dramatically improving throughput.

### Gossip Dissemination
**What**: Spread information by randomly telling other nodes
**Why**: Ensure information reaches all nodes without flooding network
**How**: Each node tells a few random nodes, who tell a few more

**Example**: Cassandra uses gossip to share cluster membership. When a node joins, it tells a few random nodes, who spread the news. Eventually, all nodes know about the new member.

### Single-Socket Channel
**What**: Use one TCP connection per client-server pair
**Why**: Maintain request ordering without complex coordination
**How**: All requests from client go through same socket

### Singular Update Queue
**What**: Process all updates through single thread
**Why**: Maintain order without blocking callers
**How**: Queue updates, process asynchronously in order

## Fault Tolerance Patterns

### HeartBeat
**What**: Periodic "I'm alive" messages between nodes
**Why**: Detect failed nodes quickly
**How**: Send ping every X seconds, mark node dead if no response

**Example**: Kubernetes kubelet sends heartbeats to the control plane. If heartbeats stop, the control plane marks the node as unreachable and reschedules pods.

### Lease
**What**: Time-bound permission to perform actions
**Why**: Prevent multiple nodes from doing the same thing
**How**: Grant exclusive access for limited time, must renew

**Example**: In etcd, only one node can hold the lease to be the Kubernetes scheduler. If the scheduler node crashes, its lease expires and another node can take over.

### Emergent Leader
**What**: Select leader based on node age in cluster
**Why**: Avoid explicit election overhead
**How**: Oldest node in cluster becomes leader

### Idempotent Receiver
**What**: Handle duplicate requests safely
**Why**: Network can deliver messages multiple times
**How**: Track request IDs, ignore duplicates

## Consensus Patterns

### Paxos
**What**: Two-phase consensus algorithm
**Why**: Reach agreement even when nodes disconnect
**How**: Prepare phase + accept phase with majority votes

### Two-Phase Commit
**What**: Coordinate atomic updates across multiple resources
**Why**: Ensure all-or-nothing updates across systems
**How**: Prepare phase + commit phase with coordinator

## Partitioning Patterns

### Fixed Partitions
**What**: Keep number of partitions constant when cluster size changes
**Why**: Avoid expensive data reshuffling when adding/removing nodes
**How**: Create more partitions than nodes, redistribute partitions not data

**Example**: Kafka creates 50 partitions for a topic even with 3 brokers. When you add a 4th broker, you just move some partitions to it - no data reshuffling needed.

### Key-Range Partitions
**What**: Split data by sorted key ranges
**Why**: Enable efficient range queries
**How**: Partition 1: A-F, Partition 2: G-M, etc.

**Example**: Google Bigtable partitions by row key ranges. Query for all users with names "A*" to "C*" hits only one partition, not the entire cluster.

## Storage and Logging Patterns

### Segmented Log
**What**: Split logs into multiple smaller files
**Why**: Easier operations - deletion, compaction, archival
**How**: Create new segment when current reaches size/time limit

### Low-Water Mark
**What**: Track oldest log entry still needed
**Why**: Know which log segments can be deleted safely
**How**: Mark based on slowest consumer or backup requirements

### Replicated Log
**What**: Keep identical log copies on multiple nodes
**Why**: Ensure state synchronization across cluster
**How**: Leader accepts writes, replicates to followers

## Client Interaction Patterns

### Request Waiting List
**What**: Track requests that need responses after conditions are met
**Why**: Handle requests that depend on future state changes
**How**: Queue requests, trigger responses when conditions satisfied

### State Watch
**What**: Notify clients when specific values change
**Why**: Enable reactive programming and cache invalidation
**How**: Clients register watches, server sends notifications on changes

### Follower Reads
**What**: Serve read requests from follower replicas
**Why**: Improve read throughput and reduce leader load
**How**: Route reads to followers, handle eventual consistency

### Consistent Core
**What**: Small cluster with strong consistency for coordination
**Why**: Enable large clusters to coordinate without full consensus
**How**: Core cluster makes decisions, large cluster follows

### Clock-Bound Wait
**What**: Wait to account for clock uncertainty before operations
**Why**: Ensure correct ordering across nodes with clock skew
**How**: Wait for maximum possible clock drift before proceeding

## Key Takeaways

These patterns solve fundamental distributed systems challenges:
- **Consistency**: WAL, Quorum, Versioned Values
- **Availability**: Replication, Heartbeat, Lease
- **Partition tolerance**: Gossip, Emergent Leader
- **Ordering**: Lamport Clock, Vector Clock, Hybrid Clock
- **Performance**: Pipelining, Batching, Follower Reads
- **Coordination**: Leader/Followers, Consensus, Consistent Core

Each pattern involves tradeoffs. Understanding these tradeoffs helps you choose the right patterns for your system's specific requirements of consistency, availability, and performance. 