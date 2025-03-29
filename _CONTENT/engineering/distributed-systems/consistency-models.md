---
title: Consistency Models in Distributed Systems
---

# Consistency Models: Practical Examples

## 1. Linearizability (Strong Consistency)
**Banking Example:** You withdraw $200 from an ATM. Your spouse checks the balance at another ATM immediately after and sees the updated amount.
- **When needed:** Financial transactions, inventory systems
- **Systems:** Google Spanner, traditional RDBMS with synchronous replication

## 2. Sequential Consistency
**Document Editing Example:** Alice adds paragraph A, Bob adds paragraph B. All users see both paragraphs in the same order (either A→B or B→A), but not necessarily matching real-time order.
- **When needed:** When operation order matters but real-time guarantees don't
- **Systems:** Many distributed databases with strong consistency settings

## 3. Causal Consistency
**Social Media Example:** Post → Comment → Reply always appear in that order to all users, but unrelated posts may appear in different orders.
- **When needed:** Conversation threads, event dependencies
- **Systems:** ZooKeeper, COPS (Clusters of Order-Preserving Servers)

## 4. Session Guarantees
- **Read Your Writes:** Update your profile picture and immediately see the change yourself
- **Monotonic Reads:** Once you see posts 1-10, you'll never see only posts 1-8 later
- **Consistent Prefix:** If you see "How are you?", you'll always see the preceding "Hi" message
- **When needed:** User-focused applications where personal consistency matters
- **Systems:** MongoDB, Redis, most modern databases

## 5. Eventual Consistency
**DNS Example:** Change your website's IP address. Some users get the new address immediately, others temporarily get the old one, but eventually all see the new address.
- **When needed:** High availability requirements, geographically distributed systems
- **Systems:** Amazon DynamoDB, Cassandra, Riak

## 6. Conflict Resolution Approaches
**Calendar Example:** You and a colleague both schedule different meetings at 2 PM while offline. When reconnecting, the system must resolve this conflict.
- **Last-write-wins:** Most recent change prevails (based on timestamps)
- **CRDTs:** Mathematical structures that automatically merge (used in collaborative editors)
- **Application-specific:** Custom logic (e.g., meeting with more attendees wins)
- **Systems:** CouchDB, Figma, Google Docs

The right consistency model depends on your application's requirements around correctness, availability, and performance. Stronger consistency typically means higher latency and reduced availability during network partitions. 



