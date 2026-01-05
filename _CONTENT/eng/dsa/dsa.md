---
---
```
str
rk
lps + kmp
trie

list 
map

stack
q
pq 

tree 
  inorder pre post

bfs 
  multi-source 

dfs 
  color cycle 

graph 
  topo: indegree+bfs or postorder dfs 

  dijkstra: bfs+heap 
  bellman: negative weights ok, relax n-1, relax once more 
  floyd: try all middle nodes, a -> mid -> b

  bridges: dfs with low degree
  cc: dfs
  scc: kosa, 3 step, order, reverse, collect 


paths
  dijkstra_priority = new_cost
  greedy_priority = heuristic(goal,next)
  a_star_priority = new_cost + heuristic(goal,next)

bit
  get:     & 1<<i
  set:     | 1<<i
  lastbit: & 1
  clear:   & ~(1<<i)
  
  -1 << (i+1)
  1111 << 2 = 1100

  (1<<i)-1
  (1<<2)-1
  0100 - 0001 = 0011

math
  gcd 
  lcm 
```
