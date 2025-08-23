---
---
sets
membership: bloom filter
cardinality: hyperloglog
similarity: minhash, LSH

streams
overestimate freq with count-min-sketch
select k random items with reservoir samp.

sorting
skiplist

## bloom filters
Tests set membership

k different hash funcs
a bit array of m bits

to insert, compute k hash values and set those positions to 1 in bit array
to query, check if all k positions are 1

definetely not here

## skip list
levels of linked lists
Level 0 has all elements in sorted order.

nlogn memory
logn insert/search

insert
choose a random level
insert there and all levels below

search
start at top and move down

## minhash
Estimate similarity of sets
Convert sets to compact hash signatures

Similarity of signatures approximates jaccard similarity
`|A ∩ B| / |A ∪ B| (ratio of intersection to union)`

Can combine with locality sensitive hashing.

## hloglog
Estimate unique items in a large set
1.5KB for 2% error on billions of items

Hash items and count leading zeros.
The probability of seeing k leading zeros follows a geometric distribution

Longest run of zeros ≈ log₂(cardinality)

[redis/src/hyperloglog.c at unstable · redis/redis (github.com)](https://github.com/redis/redis/blob/unstable/src/hyperloglog.c)

## count-min-sketch
Estimate frequency an item in a stream
always overestimates

hash funcs
2D array of counters

insert:
hash item with each hash func
increment resulting counters

query
hash item with each func
return max counter

## reservoir sampling
Sample k random items from a stream

linear time
O(k) space

Fill reservoir with first k elements

For ith stream item
generate rand in [1,i]
replace if rand<=k
