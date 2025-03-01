---
title: Patterns of Distributed Systems
---

## Consensus and Coordination

- **Leader and Followers**
  - **Problem**: Coordinating writes across nodes while maintaining consistency
  - **Solution**: One leader sequences writes and replicates to followers
  - **Example**: Kafka leader handles producer requests, followers replicate data
  - **How**: Leader orders all writes and replicates to followers, ensuring consistency

- **Majority Quorum**
  - **Problem**: Preventing split-brain during network partitions
  - **Solution**: Require majority (>50%) agreement for decisions
  - **Example**: etcd requires majority consensus for writes
  - **How**: Operations succeed only when (N/2)+1 nodes acknowledge, ensuring single partition progress

- **Paxos**
  - **Problem**: Reaching consensus despite node failures or message loss
  - **Solution**: Two-phase consensus protocol (prepare/promise, accept/accepted)
  - **Example**: Google's Chubby uses Paxos for consistent state
  - **How**: First phase establishes leadership with proposal number, second commits values

- **Consistent Core**
  - **Problem**: Coordinating large clusters without complex consensus everywhere
  - **Solution**: Small consistent cluster coordinates larger processing cluster
  - **Example**: Hadoop NameNode coordinates DataNodes
  - **How**: Core cluster uses consensus for metadata and coordination state

- **Emergent Leader**
  - **Problem**: Selecting leaders without complex election protocols
  - **Solution**: Order nodes by ID/age, highest becomes leader
  - **Example**: ZooKeeper uses server IDs for leadership succession
  - **How**: Nodes follow predetermined order; next in line becomes leader when predecessors fail

## Time and Ordering

- **Lamport Clock**
  - **Problem**: Establishing event order without synchronized clocks
  - **Solution**: Logical counters increment on events and message receipt
  - **Example**: Cassandra uses logical timestamps for conflict resolution
  - **How**: Operations get counter values; nodes update counters to maximum seen during communication

- **Hybrid Clock**
  - **Problem**: Combining wall-clock time with logical ordering guarantees
  - **Solution**: Pair physical timestamps with logical counters to handle clock skew
  - **Example**: CockroachDB uses hybrid logical clocks to order transactions with meaningful timestamps
  - **How**: Uses physical time when clocks agree, falls back to logical increments when clock skew detected

- **Version Vector**
  - **Problem**: Detecting concurrent updates in multi-master systems
  - **Solution**: Maintain per-node counters tracking the latest version seen from each node
  - **Example**: Riak uses version vectors to identify and resolve conflicts during read operations
  - **How**: Each update increments the local counter; comparing vectors reveals causal relationships or concurrency

- **Generation Clock**
  - **Problem**: Detecting when a node has been disconnected and reconnected
  - **Solution**: Use a monotonically increasing number indicating server generation/epoch
  - **Example**: Cassandra uses generation numbers to detect node restarts and prevent zombie nodes
  - **How**: Increment generation on restart; higher generations supersede lower ones

- **Clock-Bound Wait**
  - **Problem**: Handling clock uncertainty in systems relying on physical timestamps
  - **Solution**: Wait for the maximum clock skew period before certain operations
  - **Example**: Google Spanner waits for the "uncertainty bound" before committing transactions
  - **How**: Calculates maximum possible clock skew and waits that duration to ensure time ordering

## Replication and Consistency

- **Replicated Log**
  - **Problem**: Keeping distributed state machines synchronized
  - **Solution**: Replicate an ordered log of operations to all nodes
  - **Example**: Kafka maintains a partitioned, replicated commit log across brokers
  - **How**: All state changes are appended to a log and replicated in order; each node applies the same operations

- **High-Water Mark**
  - **Problem**: Tracking which data has been safely replicated
  - **Solution**: Maintain an index in the log showing the last successfully replicated entry
  - **Example**: Kafka consumers can only see messages up to the high watermark to prevent reading uncommitted data
  - **How**: Leader tracks acknowledgments from followers and advances the mark when sufficient replicas confirm

- **Low-Water Mark**
  - **Problem**: Safely cleaning up old log entries without losing needed data
  - **Solution**: Track the oldest log entry still needed by any part of the system
  - **Example**: Kafka uses low watermarks to determine which log segments can be deleted
  - **How**: Tracks consumer progress and retention policies to determine which log portions are no longer needed

- **Follower Reads**
  - **Problem**: Scaling read throughput without overloading the leader
  - **Solution**: Allow read requests to be served directly from follower nodes
  - **Example**: MongoDB allows configuring reads from secondary nodes for better read scaling
  - **How**: Clients can choose to read from followers, accepting potentially stale data for better performance

- **Versioned Value**
  - **Problem**: Handling concurrent updates and enabling time-travel queries
  - **Solution**: Store every update with a new version instead of overwriting
  - **Example**: Cassandra stores multiple timestamped versions of each cell
  - **How**: Each write creates a new version with timestamp; reads can specify version or get the latest

## Durability and Recovery

- **Write-Ahead Log**
  - **Problem**: Ensuring durability and crash recovery
  - **Solution**: Persist operations to an append-only log before applying to in-memory state
  - **Example**: PostgreSQL writes all changes to WAL before modifying data pages
  - **How**: Writes are considered committed only after safely persisted to log; after crashes, log is replayed

- **Segmented Log**
  - **Problem**: Managing large logs efficiently
  - **Solution**: Split log into multiple smaller files instead of one large file
  - **Example**: Kafka stores each partition as a series of segment files
  - **How**: Creates new segments when size thresholds are reached; enables parallel I/O and easier cleanup

- **Idempotent Receiver**
  - **Problem**: Handling duplicate requests when clients retry
  - **Solution**: Assign unique IDs to requests and track which have been processed
  - **Example**: Kafka producers include a ProducerID and sequence number with each message
  - **How**: Server remembers recently processed request IDs and ignores duplicates

## Communication and Networking

- **Request Batch**
  - **Problem**: Reducing network overhead for many small operations
  - **Solution**: Combine multiple requests into a single network transmission
  - **Example**: Kafka producers batch multiple records into a single request
  - **How**: Client accumulates requests until batch size or timeout, then sends all at once

- **Request Pipeline**
  - **Problem**: Reducing latency impact of network round-trips
  - **Solution**: Send multiple requests without waiting for previous responses
  - **Example**: Redis clients can pipeline commands to improve throughput
  - **How**: Client sends multiple requests back-to-back; server processes in order and returns responses in same order

- **Single-Socket Channel**
  - **Problem**: Ensuring FIFO operation ordering between client and server
  - **Solution**: Single TCP connection for all communication
  - **Example**: ZooKeeper clients maintain one connection for operation ordering
  - **How**: TCP guarantees in-order delivery on a single connection

- **Gossip Dissemination**
  - **Problem**: Spreading information without central coordination
  - **Solution**: Nodes exchange state with random peers periodically
  - **Example**: Cassandra uses gossip for cluster membership
  - **How**: Random peer exchanges propagate information to all nodes eventually

- **HeartBeat**
  - **Problem**: Detecting node failures
  - **Solution**: Periodic "I'm alive" messages
  - **Example**: Elasticsearch nodes send heartbeats to master
  - **How**: Node considered failed if heartbeats stop for configured period

## Data Partitioning and Distribution

- **Fixed Partitions**
  - **Problem**: Maintaining stable data placement when cluster size changes
  - **Solution**: Fixed partition count regardless of cluster size
  - **Example**: Kafka maintains fixed partition count per topic
  - **How**: Partitions redistribute among nodes without changing boundaries

- **Key-Range Partitions**
  - **Problem**: Supporting efficient range queries across partitioned data
  - **Solution**: Partition by contiguous key ranges
  - **Example**: HBase organizes by row key ranges
  - **How**: Similar keys stored together, enabling efficient scans

## Coordination and Synchronization

- **Lease**
  - **Problem**: Granting exclusive access without permanent blocking after node failure
  - **Solution**: Time-bound access grants with automatic expiration
  - **Example**: Google's Chubby uses leases for distributed locking
  - **How**: Node gets exclusive access for limited time, must renew before expiration

- **State Watch**
  - **Problem**: Notifying clients of server-side changes
  - **Solution**: Clients register interest in specific state changes
  - **Example**: ZooKeeper watches notify when znodes change
  - **How**: Client registers watch on path; server notifies on changes

- **Request Waiting List**
  - **Problem**: Handling requests dependent on future conditions
  - **Solution**: Queue requests for processing when conditions met
  - **Example**: Distributed transaction managers queue participant responses
  - **How**: Maintains pending request list with completion criteria

- **Singular Update Queue**
  - **Problem**: Processing updates in order without blocking clients
  - **Solution**: Queue updates for asynchronous processing by a single thread
  - **Example**: Kafka controller uses a single-threaded event processor
  - **How**: All updates go through a queue processed by one thread, ensuring ordering

- **Two-Phase Commit**
  - **Problem**: Updating multiple resources atomically
  - **Solution**: First prepare all resources, then commit if all are ready
  - **Example**: Distributed databases use 2PC for cross-node transactions
  - **How**: Coordinator asks all participants to prepare; if all agree, sends commit; otherwise, sends abort

## Reference

- [Patterns of Distributed Systems by Martin Fowler](https://martinfowler.com/articles/patterns-of-distributed-systems/) 