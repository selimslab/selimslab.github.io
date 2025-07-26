---
---

Estimate similarity of sets 

Convert sets to compact hash signatures 

Similarity of signatures approximates jaccard similarity `|A ∩ B| / |A ∪ B| (ratio of intersection to union)`

Can combine with locality sensitive hashing. Unlike common hash funcs, locality hashing creates similar hashes for similar items. 

Minhash with locality hashing can get sub-linear search in large datasets 

