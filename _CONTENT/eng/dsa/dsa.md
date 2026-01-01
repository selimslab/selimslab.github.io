---
---
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

