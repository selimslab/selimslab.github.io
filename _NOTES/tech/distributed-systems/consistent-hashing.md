---
---

When you add or remove a node, you only need to re-distribute a fraction of keys instead of all your keys 

Map servers and keys on a ring using a uniformly distributed hash function 

Go clockwise to find which server has the value of a key 

Bloom filters helps to avoid searching if a key does not exist

Represent a server with many virtual nodes  

If you add a node,  go counter clockwise and map the keys to the new node 

If a node leaves, go counter clockwise and map the keys to the next node on the ring 

Used for [[partitioning]] in Dynamo and Cassandra