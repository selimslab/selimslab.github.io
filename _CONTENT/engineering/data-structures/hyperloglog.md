---
---

HLL estimates cardinality (count of unique elements) in a data stream. 

Uses only kilobytes of memory regardless of input size

Trade-off: 2% standard error

It hashes items and counts leading zeros in the hash. More leading zeros means rarer pattern because the probability of seeing k leading zeros follows a geometric distribution

Longest run of zeros ≈ log₂(cardinality)

[redis/src/hyperloglog.c at unstable · redis/redis (github.com)](https://github.com/redis/redis/blob/unstable/src/hyperloglog.c)

