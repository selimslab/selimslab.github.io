



## bit 
```c
get:    & 1<<i
set:    | 1<<i
clear:  & ~(1<<i)

masks

-1 << (i+1) // 1111 << 2 = 1100 

(1<<i)-1 // 0100 - 0001 = 0011 
```

## path finding 

dijkstra `priority = new_cost`

greedy best first search  `priority = heuristic(goal,next)`

A* `priority = new_cost + heuristic(goal,next)`

<https://www.redblobgames.com/pathfinding/a-star/introduction.html>


## graph search

bfs: q   
dfs: recurse or stack 
topo: dfs from each node, add node to a list only after its neighbors, reverse the list

## vector search 

Approximate Nearest Neighbors ANN

Hierarchical Navigable Small World (HNSW)

## rabin-karp 

Search a small string in a big string, in linear time, using a rolling hash 

big = "nature does not hurry" small = "ur"

O(b.s) becomes O(b+s)

Rabin fingerprint `H(str) = A^(n-1) + ... + A^0`

Where A is the alphabet size, for ascii, A=128 possible chars

n is the string length 

`H("ur") = 128^1 * code(u) + 128^0 * code(r)`


## LPS
longest prefix suffix 
ABAB lcs=2 since AB - AB

## KMP 
search patterrn in txt, 
two ptrs: txt ptr and pattern ptr 
txt ptr always move ahead
if mismatch happens at x, move pattern ptr to lcs[x-1]

## dynamic 

discrete, independent sub-problems

recursion and memoization