---
---

Represent a server with many virtual nodes on a circle. Map nodes and keys to the circle, using a uniformly distributed hash function  

When you add or remove a node, you only need to re-distribute a fraction of keys instead of all your keys 

Use a bloom filter before searching a key

If you add or remove a node, go counter clockwise and remap the keys 

Used for partitioning in Dynamo and Cassandra
