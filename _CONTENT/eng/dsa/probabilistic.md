---
---
skiplist: levels of linked lists

### sets
membership: bloom filter (k hash funcs + bit array)
cardinality: hyperloglog: hash items and count leading zeros. longest run of zeros ≈ log₂(cardinality)
similarity: convert sets to hash signs. minhash, locality sensitive hashing

### streams
overestimate freq with count-min-sketch
sample k random items with reservoir samp: Fill reservoir with first k elements. For ith stream item, replace if a random num in [1,i] <=k
