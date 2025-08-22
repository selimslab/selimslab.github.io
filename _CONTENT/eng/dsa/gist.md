---
---
bit 
str 

array 
linked-list 

stack 
q

map 

tree
trie
heap

graph

greedy
dynamic
backtrack

lru-cache: dict + linked list

## linked lists
Detect cycle: no cycle if the fast ptr finds the end

Get intersection:
if there is one, two ptrs will meet after some iterations
when a ptr becomes null, move it to the head of other list

## graph
bfs: q
dfs: recurse or stack

topo:
dfs from all 
visit after neighbors
reverse

## path finding
```c
// dijkstra 
priority = new_cost

// greedy 
priority = heuristic(goal,next)

// A* 
priority = new_cost + heuristic(goal,next)
```

<https://www.redblobgames.com/pathfinding/a-star/introduction.html>
