---
---

- **Replicated Log**
- Keep distributed state machines synchronized
- Replicate an ordered log of operations to all nodes
  - Append all state changes to a log and replicate in order; apply the same operations on each node
- Kafka maintains a partitioned, replicated commit log across brokers

- **High-Water Mark**
- Track which data has been safely replicated
- Maintain an index in the log showing the last successfully replicated entry
  - Track acknowledgments from followers and advance the mark when sufficient replicas confirm
- Kafka consumers can only see messages up to the high watermark to prevent reading uncommitted data

- **Low-Water Mark**
- Clean up old log entries safely without losing needed data
- Track the oldest log entry still needed by any part of the system
  - Monitor consumer progress and retention policies to determine which log portions are no longer needed
- Kafka uses low watermarks to determine which log segments can be deleted

- **Follower Reads**
- Scale read throughput without overloading the leader
- Serve read requests directly from follower nodes
  - Direct clients to read from followers, accepting potentially stale data for better performance
- MongoDB allows configuring reads from secondary nodes for better read scaling

- **Versioned Value**
- Handle concurrent updates and enable time-travel queries
- Store every update with a new version instead of overwriting
  - Create a new version with timestamp for each write; specify version or get the latest for reads
- Cassandra stores multiple timestamped versions of each cell


- [Patterns of Distributed Systems by Martin Fowler](https://martinfowler.com/articles/patterns-of-distributed-systems/) 