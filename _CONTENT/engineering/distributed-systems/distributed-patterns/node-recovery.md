---
---

- **Write-Ahead Log**
  - Ensure durability and crash recovery
  - Persist operations to an append-only log before applying to in-memory state
    - Consider writes committed only after safely persisting to log; replay log after crashes
  - PostgreSQL writes all changes to WAL before modifying data pages

- **Segmented Log**
  - Manage large logs efficiently
  - Split log into multiple smaller files instead of one large file
    - Create new segments when reaching size thresholds; enable parallel I/O and easier cleanup
  - Kafka stores each partition as a series of segment files

- **Idempotent Receiver**
  - Handle duplicate requests when clients retry
  - Assign unique IDs to requests and track which have been processed
    - Remember recently processed request IDs and ignore duplicates
  - Kafka producers include a ProducerID and sequence number with each message

[Patterns of Distributed Systems by Martin Fowler](https://martinfowler.com/articles/patterns-of-distributed-systems/) 
