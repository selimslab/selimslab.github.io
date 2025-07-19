---
---

Heartbeats and timeouts

Gossip protocol 

- **Gossip Dissemination**
- Spread information without central coordination
- Exchange state with random peers periodically
  - Propagate information to all nodes eventually through random peer exchanges
- Cassandra uses gossip for cluster membership

- **HeartBeat**
- Detect node failures
- Send periodic "I'm alive" messages
  - Consider node failed if heartbeats stop for configured period
- Elasticsearch nodes send heartbeats to master
