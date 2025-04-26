---
---


- **Leader and Followers**
- Coordinate writes across nodes while maintaining consistency
- Designate one leader to sequence writes and replicate to followers
  - Order all writes through the leader and replicate to followers to ensure consistency
- Kafka leader handles producer requests, followers replicate data

- **Majority Quorum**
- Prevent split-brain during network partitions
- Require majority (>50%) agreement for decisions
  - Succeed operations only when (N/2)+1 nodes acknowledge, ensuring single partition progress
- etcd requires majority consensus for writes

- **Paxos**
- Reach consensus despite node failures or message loss
- Implement two-phase consensus protocol (prepare/promise, accept/accepted)
  - Establish leadership with proposal number in first phase, commit values in second phase
- Google's Chubby uses Paxos for consistent state

- **Consistent Core**
- Coordinate large clusters without complex consensus everywhere
- Use small consistent cluster to coordinate larger processing cluster
  - Manage metadata and coordination state in core cluster using consensus
- Hadoop NameNode coordinates DataNodes

- **Emergent Leader**
- Select leaders without complex election protocols
- Order nodes by ID/age, highest becomes leader
  - Follow predetermined order; promote next in line when predecessors fail
- ZooKeeper uses server IDs for leadership succession

- **Lease**
- Grant exclusive access without permanent blocking after node failure
- Implement time-bound access grants with automatic expiration
  - Give node exclusive access for limited time, requiring renewal before expiration
- Google's Chubby uses leases for distributed locking

- **State Watch**
- Notify clients of server-side changes
- Let clients register interest in specific state changes
  - Register watch on path; notify on changes
- ZooKeeper watches notify when znodes change

- **Two-Phase Commit**
- Update multiple resources atomically
- First prepare all resources, then commit if all are ready
  - Ask all participants to prepare; send commit if all agree, otherwise send abort
- Distributed databases use 2PC for cross-node transactions