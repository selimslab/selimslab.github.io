---
---
take it easy
relax constraints

```
bit
  get:     & 1<<i
  set:     | 1<<i

  clear:   & ~(1<<i)
  lastbit: & 1

  -1 << (i+1)
  1111 << 2 = 1100

  (1<<i)-1
  (1<<2)-1
  0100 - 0001 = 0011

str
  rk
  lps + kmp
  trie

array

stack
q
monotonic

hashmap

linked-list
skip-list

graph
  topo: kahns or
    dfs from all
    visit after neighbors
    reverse

  paths
    dijkstra_priority = new_cost
    greedy_priority = heuristic(goal,next)
    a_star_priority = new_cost + heuristic(goal,next)
```

## probabilistic

skiplist: levels of linked lists

### sets
membership: bloom filter (k hash funcs + bit array)
cardinality: hyperloglog: hash items and count leading zeros. longest run of zeros ≈ log₂(cardinality)
similarity: convert sets to hash signs. minhash, locality sensitive hashing

### streams
overestimate freq with count-min-sketch
sample k random items with reservoir samp: Fill reservoir with first k elements. For ith stream item, replace if a random num in [1,i] <=k
