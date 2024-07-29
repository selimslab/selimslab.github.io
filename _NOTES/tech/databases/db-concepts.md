---
title: Database Concepts
---


#### 1. **Normalization and Denormalization**
   - **Normalization:** Process of organizing data to reduce redundancy. Steps involve normal forms (1NF, 2NF, 3NF, BCNF).
   - **Denormalization:** Introducing redundancy to optimize read performance. Used to reduce the complexity of queries.

#### 2. **Indexing**
   - **Purpose:** Speeds up retrieval operations. 
   - **Types:** B-tree, Hash, Bitmap, Full-text.
   - **Trade-offs:** Increased write times and storage usage.

#### 3. **Transaction Management**
   - **ACID Properties:**
     - **Atomicity:** All operations in a transaction complete or none do.
     - **Consistency:** Database remains in a valid state before and after the transaction.
     - **Isolation:** Transactions do not affect each other’s execution.
     - **Durability:** Changes are permanent once committed.
   - **Isolation Levels:** Read Uncommitted, Read Committed, Repeatable Read, Serializable.

#### 4. **Concurrency Control**
   - **Locking Mechanisms:** Pessimistic (Explicit locking) vs. Optimistic (Versioning).
   - **Two-Phase Locking (2PL):** Ensures conflict-serializability.
   - **Timestamp Ordering:** Ensures serializability by assigning timestamps to transactions.

#### 5. **Replication and Sharding**
   - **Replication:** Copying data across multiple servers for fault tolerance and load balancing.
     - **Types:** Master-slave, Peer-to-peer.
   - **Sharding:** Splitting data across multiple servers to handle large datasets and high throughput.

#### 6. **Data Warehousing and OLAP**
   - **Data Warehousing:** Centralized repository for integrated data from multiple sources.
   - **Online Analytical Processing (OLAP):** Supports complex queries and analysis.
     - **Star Schema:** Central fact table linked to dimension tables.
     - **Snowflake Schema:** Star schema with normalized dimension tables.

#### 7. **NoSQL Databases**
   - **Types:** Document, Key-Value, Column-Family, Graph.
   - **Use Cases:** High scalability, unstructured or semi-structured data.

#### 8. **Query Optimization**
   - **Execution Plans:** Understanding how queries are executed and optimized.
   - **Cost-Based Optimization:** Choosing the most efficient query execution path.

#### 9. **Consistency Models**
   - **Strong Consistency:** Guarantees immediate consistency after a write.
   - **Eventual Consistency:** Guarantees eventual consistency without immediate guarantees.

#### 10. **CAP Theorem**
   - **Consistency:** All nodes see the same data at the same time.
   - **Availability:** Every request receives a response, success or failure.
   - **Partition Tolerance:** The system continues to function despite network partitions.

#### 11. **Database Security**
   - **Authentication and Authorization:** Controlling access to data.
   - **Encryption:** Protecting data at rest and in transit.
   - **Auditing:** Tracking access and changes to data.

#### 12. **Advanced Data Models**
   - **Graph Databases:** Represent data as nodes and edges.
   - **Temporal Databases:** Manage data involving time dimensions.

#### 13. **Distributed Databases**
   - **Coordination:** Mechanisms for ensuring consistency across distributed nodes.
   - **Challenges:** Network latency, consistency, fault tolerance.

