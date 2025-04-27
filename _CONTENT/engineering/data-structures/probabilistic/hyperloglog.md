---
---

Estimate unique items in a large set 

1.5KB for 2% error on billions of items 

Hash items and count leading zeros. The probability of seeing k leading zeros follows a geometric distribution

Longest run of zeros ≈ log₂(cardinality)

[redis/src/hyperloglog.c at unstable · redis/redis (github.com)](https://github.com/redis/redis/blob/unstable/src/hyperloglog.c)

