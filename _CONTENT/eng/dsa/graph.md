---
---
```
bfs 
  multi-source 

dfs 
  color cycle 

tree 
  inorder pre post

dijks
bf
fw

cc dfs lowlink
scc kosa


topo
indegree+bfs
postorder dfs 

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

```