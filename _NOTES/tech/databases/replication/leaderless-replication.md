---
---

Dynamo-style, Cassandra, Riak, .. 

Since any node can accept writes, a mechanism is necessary to make them consistent, eventually 

1. Read repair, read from multiple nodes and accept the latest value 
2. Anti-entropy, run a background process watching for differences in data and updates old values 


### Quorums

Imagine you have n total nodes, 

The system may not have to wait for all nodes to write or read, 

If you wait for, 

w votes for a valid write, 

r votes for a valid read 

It satisfies the quorum condition if w + r > n 

If you require more than half of the nodes for a read and write to be valid, your system can handle up to n/2 node failures 

for example n=5 w=3 r=3, you wait for 3 nodes to consider a write to be valid, 

then you know 3 out of 5 nodes have an up to date value, 

so if you read 3 nodes, at least one of them will have an up to date value, 

and this setup can handle 2 node failures 


Quorum is a way to decrease probability of stale reads and causality errors, 

yet you still need to think about

- detecting concurrent writes
- what will happen to the quorum in case of a network partition? 
- what happens when a write fails halfway through? do you rollback the written nodes?
