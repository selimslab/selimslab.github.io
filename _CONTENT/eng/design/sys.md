---
---
## file system
metadata vs data
levels

inode
block

tree

## maps
s2
geohash
tiles

point vs vector
static vs dynamic

## docs
metadata in rds
content in object storage

cdn
cache

ws
CRDTs
edit q
delta-based version snapshots

## topk
redis sorted set, sharded in cluster
`ZSET` `ZREVRANGE`

batch updates

## notif.
mq
workers
templates

SSE
webhooks

---

streaming
music
video
movie
kafka

payments

crawler
search engine

chat
imessage

yelp
find my

news

trader



⏺ YouTube System Design: Core Practical Ideas

Architecture Components

- Upload Flow: Pre-signed URLs → multi-part upload → S3 → message queue → transcoding pipeline
- View Flow: CDN check → S3 fallback → multiple format support (720p, HD)
- Metadata Store: DynamoDB with consistent hashing, video hash as partition key

Scale Requirements

- Daily Active Users: 800M users, 5 videos/day average
- Traffic: 40K views/second, 200 uploads/second
- Storage: 6 petabytes upload/day, 2-40 exabytes total
- Bandwidth: 3TB/second download, 60GB/second upload

Key Technical Decisions

- Message Queue: Kafka/Kinesis for 200 TPS upload notifications
- Database: DynamoDB for metadata (read-heavy: 40K reads, 200 writes/second)
- Storage: S3 buckets with network-attached storage for massive capacity
- Transcoding: Separate pipelines per format using pub/sub pattern

Optimization Strategies

- CDN Strategy: Nightly batch jobs identify popular videos for CDN caching
- Partitioning: Consistent hashing to avoid celebrity/hot partition issues
- Eventually Consistent: Upload→view delay acceptable for high availability
- Multi-format: Automatic quality selection based on connection speed

Infrastructure Scaling

- Upload Servers: 60 machines (1GB/second bandwidth limit)
- Download Servers: 3K machines (bandwidth-bound at 10-20 TPS each)
- Storage per Machine: 6-33TB (download) vs 600PB+ (upload - requires NAS)
- Global Distribution: Read replicas and CDN nodes worldwide
- 
⏺ YouTube System Design Summary

Scale

- 800M daily users, 40K views/sec, 200 uploads/sec
- 6PB upload/day, 3TB/sec download bandwidth
- 2-40 exabytes total storage needed

Architecture

- Upload: Pre-signed URLs → S3 → Kafka → transcoding pipelines
- View: CDN → S3 fallback, multiple formats (720p/HD)
- Data: DynamoDB metadata store, consistent hashing

Key Infrastructure

- 3K download servers (bandwidth-bound)
- 60 upload servers (network-attached storage)
- CDN with nightly batch jobs for popular content
- Eventually consistent for high availability

Critical Design Patterns

- Pub/sub transcoding per format
- Avoid hot partitions with consistent hashing
- Multi-part uploads for large files
- Quality auto-selection by connection speed

---

cron 

Architecture Patterns

- Fault-tolerant sharding: Split cron files across multiple replicas to prevent single points of failure
- Replica-based redundancy: Use multiple copies of each shard for high availability
- Event-driven capture: Separate event ingestion from scheduling execution

Deduplication Strategies

- Linearizable database approach: Use Spanner/similar DB with uniqueness constraints and atomic transactions
- Stream-based deduplication: Leverage Kafka's total order broadcast for natural dedup capabilities
- UUID-based identification: Each event gets unique identifier for consistent dedup across replicas

Data Management

- Change data capture: Use DB triggers or message queues to sync cron configurations
- Asynchronous replication: Decouple API response from replica updates for better performance
- Event metadata storage: Store scheduling info separately from execution tracking

Implementation Considerations

- Crash-fail model: Design for permanent node failures rather than recovery scenarios
- AWS Lambda triggers: Handle Kafka message pulling and processing automatically
- Semantics choice: At-most-once vs at-least-once execution guarantees based on use case
- Partitioning strategy: Route related events to same database instances for simpler dedup

Scalability Techniques

- Horizontal scaling: Multiple machines handle different shards of the cron workload
- Stream processing: Use Kafka for high-throughput event processing
- Database sharding: Partition event storage across multiple linearizable database instances

Essential Summary

Core concept: Replace single-machine cron with distributed system using replicated shards, stream-based deduplication, and
separate event capture/execution phases. Key trade-offs involve choosing between database-based vs stream-based
deduplication, synchronous vs asynchronous replication, and at-most-once vs at-least-once semantics based on business
requirements.

> sum

⏺ Distributed Cron Core Ideas

Architecture: Replicated shards + event capture service + deduplication layer + notification service

Deduplication:
- Spanner/linearizable DB with uniqueness constraints
- Kafka streams with total order broadcast

Data Flow: API → Event DB → Change capture → Cron replicas → Dedup → Notifications

Key Patterns:
- Crash-fail model (no recovery assumptions)
- Async replication for performance
- UUID-based event identification
- At-most-once vs at-least-once semantics

Scale: Horizontal sharding, stream processing, Lambda triggers for Kafka consumption

Essential: Replace single cron with fault-tolerant distributed system that handles millions of scheduled events through
replica redundancy and stream-based deduplication.


job

Core Architecture Components

- User Interface: Browser/terminal/FTP for job submission and status viewing
- Task Services: Task capture service, task status viewing service (can merge into CRUD service)
- Storage: Task metadata store, machine metadata store, input/output object stores (S3)
- Execution: Scheduler, 100K worker machines, message broker (Kafka)
- Monitoring: Heartbeat watcher service

Scale Requirements

- Throughput: 1B jobs/day = 10K jobs/second
- Compute: 100K machines needed (jobs take 5 minutes, 30 threads/machine)
- Storage: 10 petabytes total (5MB input + 5MB output per job)
- Database Load: 1-2K TPS for heartbeats

Key Design Patterns

- Decoupling: Message brokers prevent direct database sharing between teams
- Push vs Pull: Scheduler pushes tasks to workers (avoids 50K idle machines polling)
- Team Boundaries: Task team owns metadata, execution team owns workers/scheduling
- Fault Tolerance: Heartbeat monitoring with configurable staleness thresholds

Technology Choices

- Databases: DynamoDB for scale (PostgreSQL sufficient at smaller scale)
- Messaging: Kafka for 10K msg/sec throughput
- Object Storage: S3 with pre-signed URLs for direct file access
- Monitoring: Lambda functions for periodic heartbeat checking

Critical Failure Modes

- Scheduler SPOF: Mitigated by message broker buffering
- Worker Failures: Heartbeat monitoring reassigns failed tasks
- File Handling: Direct S3 access avoids bandwidth-bound intermediaries

The Essence

A distributed job scheduler succeeds through careful separation of concerns: decouple teams via message brokers, push work
to avoid polling storms, monitor health asynchronously, and let storage scale independently of compute. The real
complexity lies in handling failures gracefully while maintaining team autonomy.

> sum

⏺ Distributed Job Scheduler Summary

Scale

- 1B jobs/day → 10K jobs/second
- 100K worker machines (5min jobs, 30 threads each)
- 10 petabytes storage

Architecture

- Services: Task CRUD, Scheduler, Workers
- Storage: DynamoDB (metadata), S3 (files), Kafka (queues)
- Flow: Submit → Queue → Schedule → Execute → Complete

Key Patterns

- Push scheduling (not pull polling)
- Message brokers decouple teams
- Direct S3 access avoids bottlenecks
- Heartbeat monitoring for failures


⏺ Distributed Linked List - Complete Summary

Problem: 1B nodes, 100K QPS reads/writes, won't fit single machine

Key Constraint: Celebrity problem - are writes concentrated at ends or evenly distributed?

Winning Solution: Redis sorted sets with range sharding
- Shard by ranges (1M nodes each)
- Skip-list maintains O(log n) ordered access
- Proven, operationally simple

Runner-up: Hybrid clocks + even distribution
- Monotonic clock + Lamport timestamps
- Scales writes, but scatter-gather reads

Critical Math: 1B nodes ÷ 100K writes = 5K seconds between same-record conflicts (manageable)

Rejected: CRDT (requires full replication), leader-follower (storage limits), blockchain (too slow)

Core Insight: Scale forces choosing between ordered access OR conflict-free writes - can't have both efficiently.



⏺ Distributed Database Design - Essential Summary

Three Patterns:
- Single Leader: Best for most cases (read-heavy), eliminates write conflicts
- Leaderless: For write-heavy loads, needs conflict resolution
- Sharded Leaders: For extreme scale (Ticketmaster), partition aggressively

Key Choices:
- Storage: B-trees (reads) vs LSM trees (writes)
- Consistency: Sequential (practical) vs Linearizable (expensive) vs Eventual (cheap)
- Replication: Always need ≥1 synchronous replica for durability

Core Trade-off: Consistency vs Performance vs Availability - pick two.

Default Recipe: Single leader + B-trees + sequential consistency + synchronous backup = handles 90% of real systems.


⏺ Distributed Counter System Design - Complete Summary

Core Problem

Multiple clients incrementing shared counters simultaneously across distributed systems - fundamentally a coordination under 
contention challenge.

12 Approaches by Scale & Requirements

Single Machine (1-3)

1. Basic Counter - Simple table, non-idempotent
2. + Request Deduplication - Add request_id for idempotency
3. Event Sourcing Only - Store requests, full table scan for counts

Multi-Machine, No Hot Keys (4-5)

4. Shard by Item ID - Hash partition across PostgreSQL nodes
5. OLAP Pipeline - Kafka → data warehouse for high write/low read

Hot Key Solutions (6-9)

6. Redis CRDTs - Grow-only counters, eventual consistency
7. Forgetful Bloom Filters - Custom CRDT with idempotency
8. Sharded Counters - Split hot keys across multiple shards
9. + Idempotency - Add request table to sharded approach

Specialized Cases (10-12)

10. Cassandra MapReduce - Built-in aggregation queries
11. DynamoDB Hack - Denormalized requests with cleanup workers
12. Hybrid Caching - Periodic aggregation + real-time sketches

Key Decision Matrix

- Scale: Single machine → Sharding → OLAP
- Accuracy: Exact counts → Approximate (CRDTs/sketches)
- Hot Keys: None → Moderate → Extreme (sharded counters)
- Consistency: Strong → Eventual → Best effort

Technology Mapping

- PostgreSQL: Low-medium scale, ACID
- DynamoDB/Cassandra: High scale, eventual consistency
- Redis: Fast access, CRDTs
- Kafka + Trino: Data pipeline, analytics
- Custom: Bloom filters, conflict resolution


⏺ Distributed Tracing - Complete Summary

- Trace = complete request flow
- Span = individual service call with timing

How It Works

1. Instrument services to emit span data
2. Sample 0.1% (too expensive to trace everything)
3. Collect via agents, push to collector
4. Store in scalable database
5. Query via web UI to debug issues

Real Systems

- Jaeger (most popular) + OpenTelemetry (standard instrumentation)
- Zipkin (simpler, older)
- Cloud: AWS X-Ray, Google Cloud Trace

Storage Strategy

- Hot data (days): Cassandra for fast operational queries
- Cold data (months): Object storage (S3) for cheap analytics
- Why object storage: 20x+ cheaper than running database clusters

Key Design Choices

- Push model (services send data, handle retries)
- Root sampling (decision propagates down entire call chain)
- Write-heavy workload (10K+ writes/sec, few reads)

Scale Reality

Big tech companies: 300B+ spans/year, petabytes of data, but only sample tiny fraction to keep costs reasonable.


---

⏺ Read(.ytt/system_design_payment_gateway.md)
⎿  Read 6 lines (ctrl+r to expand)

⏺ Based on the payment gateway system design document, here are the core practical ideas and principles distilled into a
concise categorized shortlist:

Auth-Capture Workflow

- Two-phase commits: Separate authorization (reserve funds) from capture (charge funds)
- Idempotency keys: Prevent double charges through unique transaction identifiers
- Hold mechanism: Auth step places temporary hold on customer funds before actual charge
- Retry safety: Failed responses don't result in duplicate charges when using proper keys

Failure Handling

- Three failure scenarios: Request failure (safe retry), response failure (double charge risk), success with network drop
- Network partition tolerance: Handle cases where external service succeeds but response is lost
- Compensating transactions: Rollback inventory decrements if payment fails
- Status tracking: Store transaction states (pending, charged, failed) for retry logic

Database Design

- Charge ID storage: Link internal reservations to external payment service charges
- Strong consistency: Use DynamoDB with strong reads or manually sharded PostgreSQL
- UUID generation: Dedicated service for unique transaction identifiers
- Status fields: Track payment lifecycle states in reservation records

Scalability Patterns

- Async processing: Use orchestration (AWS Step Functions) for multi-step workflows
- Quick response: Return 200 immediately, process payment via websocket/SSE
- Manual sharding: PostgreSQL with custom sharding for billions of transactions
- NoSQL options: DynamoDB for high-volume payment processing

Integration Architecture

- External service trust: Payment providers generate idempotency keys vs client-provided
- Orchestration layer: Coordinate booking, inventory, payment services with retry logic
- Stateful connections: WebSocket/SSE for async payment status updates
- Service boundaries: Clear separation between booking logic and payment processing

Security & Safety

- Key validation: External providers prevent client mistakes with key generation
- Fund holding: Gas station model - hold more than final charge amount
- Network call safety: Visa/Mastercard integration with proper retry mechanisms
- Client protection: Payment providers handle idempotency to prevent merchant errors


---


Consistent Hashing
- Hash ring, virtual nodes, key remapping, data distribution, scaling
- Alternatives: Rendezvous hashing, jump consistent hashing

Quadtrees
- Spatial indexing, 2D subdivision, quadrants, radius search, branch pruning
- Alternatives: R-trees, KD-trees, multi-dimensional

Leaky Bucket
- Rate limiting, burst capacity, leak rate, overflow rejection, traffic smoothing
- Alternatives: Token bucket, sliding window counter
- Trade-offs: Accuracy vs performance vs memory

Tries
- Prefix trees, character nodes, autocomplete, O(m) lookup, memory overhead
- Optimizations: Radix tries, suffix tries, compressed nodes

Bloom Filters
- Probabilistic, set membership, bit array, hash functions, false positives
- Limitations: No deletions, no item retrieval
- Tuning: Size vs accuracy, multiple hash functions

Raft
- Consensus, leader election, log replication, majority vote, distributed state
- Alternative: Paxos (complex), Byzantine fault tolerance
- Components: Safety guarantees, failure handling


---


⏺ Core Uber System Design Principles

  Interview Framework

  - Structure: Requirements → API → High-level → Deep Dives (15min + remaining time)
  - Focus: 3 core features max, scope everything else out
  - Skip: Back-of-envelope unless results affect design

  Architecture

  - Services: Separate ride/matching/location services for independent scaling
  - Databases: Redis+geohashing for location (600K TPS), DynamoDB for rides
  - API Gateway: Routing, load balancing, auth

  Key Technical Decisions

  - Geospatial: Geohashing > quad trees for high-frequency updates
  - Consistency: Distributed locks with TTL > cron jobs for matching
  - Scale: Regional queues + horizontal scaling for surges

  Non-Functional Requirements

  - Latency: <1min matching with real-time driver locations
  - Consistency: 1:1 ride-driver matching (no double-booking)
  - Availability: High uptime except during matching operations
  - Throughput: Handle surge events (100K+ concurrent requests)

  Level Expectations

  - Mid-level: Complete high-level design + answer probes
  - Senior: 2+ deep dives with trade-offs
  - Staff: 3+ deep dives + teach something new

