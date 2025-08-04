---
---
## path finding 

dijkstra `priority = new_cost`

greedy best first search  `priority = heuristic(goal,next)`

A* `priority = new_cost + heuristic(goal,next)`

<https://www.redblobgames.com/pathfinding/a-star/introduction.html>


## graph search

bfs: q   
dfs: recurse or stack 
topo: dfs from each node, add node to a list only after its neighbors, reverse the list
