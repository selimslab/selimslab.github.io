---
---
imagine easier versions
relax constraints

```
bit
bool

char
str

array
list

stack
q

hashmap

linked-list
skip-list

tree
  bst
  heap
  prefix-tree

graph

greedy
dp
backtrack

NP

probabilistic
heuristic
```

```
iter

binary search

sort
  qsort
  mergesort
  heapsort

  selection
  insertion

  timsort

linked-list
  cycle: no cycle if the fast ptr finds the end

  intersection:
  if there is one, two ptrs will meet after some iterations
  when a ptr becomes null, move it to the head of other list

tre ewalk
  recurse
  or stack+visited

  preorder
  inorder
  postorder: reverse visited

trie
  t = self.root
  t = t[level]


graph
  bfs: q
  dfs: recurse or stack

  topo:
  dfs from all
  visit after neighbors
  reverse

paths
  dijkstra_priority = new_cost
  greedy_priority = heuristic(goal,next)
  a_star_priority = new_cost + heuristic(goal,next)

bit
  get:     & 1<<i
  set:     | 1<<i

  clear:   & ~(1<<i)
  lastbit: & 1

bitmasks
  -1 << (i+1)
  1111 << 2 = 1100

  (1<<i)-1
  (1<<2)-1
  0100 - 0001 = 0011
```


<https://www.redblobgames.com/pathfinding/a-star/introduction.html>
