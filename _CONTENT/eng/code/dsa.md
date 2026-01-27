---
---
```
arr
list 
stack
q
pq 

set
map

str
    trie
    rabin-karp
    lps + kmp 

math 
    gcd 
    lcm 

    combis
    perms 
    subsets

bit 
    get:     & 1<<i
    set:     | 1<<i
    clear:   & ~(1<<i)

    lastbit: & 1
    lowbit: n & (-n)
```

## graph 
```
bfs 
  multi-source 

dfs 
  color cycle 

tree 
  inorder pre post

topo
    indegree+bfs
    postorder dfs 

dijkstra: bfs+heap 
bellman: negative weights ok, relax n-1, relax once more 
floyd: try all middle nodes, a -> mid -> b

paths
    dijkstra_priority = new_cost
    greedy_priority = heuristic(goal,next)
    a_star_priority = new_cost + heuristic(goal,next)

bridges: dfs with low degree
cc: dfs
scc: kosa, 3 step, order, reverse, collect 
```

## dp 
```
state space 
    greedy 
    dp 
    backtrack 
```

## prob. 
```
skiplist: levels of linked lists

sets
    membership: 
        bloom filter (k hash funcs + bit array)

    hyperloglog: 
        hash items and count leading zeros
        longest run of zeros ≈ log₂(cardinality)

    similarity
        convert sets to hash signs
        minhash, locality sensitive hashing

streams
    freq: overestimate with count-min-sketch

    sample: k random items with reservoir samp. 
```

