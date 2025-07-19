---
---

Imagine you have n total nodes. Quorum helps to keep them consistent, available, and fault-tolerant, without needing full coordination across all nodes

Quorum ensures that enough nodes agree on the value. 
- You wait for w nodes for a valid write, r nodes for a valid read
- quorum condition is w + r > n

If you require more than half of the nodes for a read and write to be valid, your system can handle up to n/2 node failures 
- For example n=5 w=3 r=3, you wait for 3 nodes to consider a write to be valid. 
- You can be sure that there's an up to date value in 3 of 5 nodes. If you read 3 nodes, at least 1 will have an up to date value. This setup can handle 2 node failures. 

Concurrent writes 
- Nodes should detect conflicting writes on read, using versioning (vector-clocks, timestamps, ..)  and run conflict resolution (e.g., last-write-wins, merge, manual reconciliation)

Network partition
- If you choose consistency in CAP, you can't read if a network partition leaves you with less than r nodes

Write fails before w nodes 
- Rollback is not practical because it's complex, slow, and can fail itself
- Nodes remain inconsistent until repaired later, eg. by a periodic anti-entropy process 
