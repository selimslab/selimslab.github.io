---
---

I have db nodes and keys to distribute
- Reprent each physical node with multiple virtual nodes 
- Place virtual nodes and keys on a circle using a uniform distrubuted hash function 
- Map keys to the next node on the circle

So if I add or remove a node, I only need to move a small subset of key