---
---
sets
membership: bloom filter
cardinality: hyperloglog
similarity: minhash, LSH

streams
freq with count-min-sketch
select k random items with reservoir samp.

balanced trees
skiplist

## bloom filters

Tests set membership

k different hash funcs

a bit array of m bits

to insert, compute k hash values and set those positions to 1 in bit array

to query, check if all k positions are 1

false positives possible, false negatives impossible



## skip list

An alt. to balanced trees using levels of linked lists.

nlogn memory, logn search and insert time

Level 0 has all elements in sorted order.

Insert: choose a random level, insert there and all levels below

Search: Start at top, move down if next value is higher than target

## minhash

Estimate similarity of sets

Convert sets to compact hash signatures

Similarity of signatures approximates jaccard similarity `|A ∩ B| / |A ∪ B| (ratio of intersection to union)`

Can combine with locality sensitive hashing. Unlike common hash funcs, locality hashing creates similar hashes for similar items.

Minhash with locality hashing can get sub-linear search in large datasets

## hloglog

Estimate unique items in a large set

1.5KB for 2% error on billions of items

Hash items and count leading zeros. The probability of seeing k leading zeros follows a geometric distribution

Longest run of zeros ≈ log₂(cardinality)

[redis/src/hyperloglog.c at unstable · redis/redis (github.com)](https://github.com/redis/redis/blob/unstable/src/hyperloglog.c)


## count-min-sketch

Estimate frequency an item in a stream

a 2D array of counters

hash funcs

Insert: hash item with each hash func and increment resulting counters

query: hash item with each func and return max counter

always overestimates


## reservoir sampling

Sample k random items from a stream

linear time, constant(k) space

1. Fill reservoir with first k elements
2. For ith stream item, generate a rand num bw 1 and i, replace if rand<=k
