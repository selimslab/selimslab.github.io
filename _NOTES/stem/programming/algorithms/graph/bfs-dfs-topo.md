---
tags: gr mid 
title: BFS DFS Toposort
---

## BFS 


```py
from collections import deque

def bfs(graph, node):
    q = deque([node])
    res = []
    seen = set()

    while q:
        n = q.popleft()
        if n not in seen:
            seen.add(n)
            res.append(n)
            q += graph.get(n, [])

    return result
```

## DFS

recursive or stack


```py
def dfs(graph, node, seen=None, res=None):
    if not seen:
        seen = set()
    if not res: 
        stack = []

    if node not in seen:
        seen.add(node)
        stack.append(node)
        for n in graph.get(node, []):
            dfs(graph, n, seen, stack)

    return stack
```

## Toposort 

1. modify dfs to neighbors-first(add a node dfs result after its neighbors)
2. call dfs for all nodes
3. reverse the result 


```py
def topological_sort(graph):
    def dfs(graph, node, seen=None, res=None):
        if not seen:
            seen = set()
        if not res: 
            stack = []

        if node not in seen:
            seen.add(node)
            for n in graph.get(node, []):
                dfs(graph, n, seen, res)
            stack.append(node) # after neighbors

        return res

    seen = set()
    stack = []

    for node in graph:
        dfs(node)

    # The topological sort is the reverse of the stack
    return stack[::-1]


def test():
    graph1 = {
        1: [2, 3],
        2: [4, 5],
        3: [6],
    }

    assert bfs(graph1, 1) == [1, 2, 3, 4, 5, 6]
    assert dfs(graph1, 1) == [1, 2, 4, 5, 3, 6]
    assert toposort(graph1) == [1, 3, 6, 2, 5, 4]

    graph2 = {
        6: [4, 5],
        5: [2, 0],
        4: [0, 1],
        2: [3],
        3: [1],
    }

    assert bfs(graph2, 6) == [6, 4, 5, 0, 1, 2, 3]
    assert dfs(graph2, 6) == [6, 4, 0, 1, 5, 2, 3]
    assert toposort(graph2) == [6, 5, 2, 3, 4, 1, 0]


if __name__ == "__main__":
    test()
```

```go
package main

import "fmt"

func bfs(graph map[string][]string, name string) []string {

	var searchQueue []string
	searchQueue = append(searchQueue, graph[name]...)
	searched := make(map[string]bool)

	res := []string{}

	for len(searchQueue) > 0 {
		var person = searchQueue[0]
		searchQueue = searchQueue[1:]
		personAlreadySearched := searched[person]

		if !personAlreadySearched {
			res = append(res, person)
			searchQueue = append(searchQueue, graph[person]...)
			searched[person] = true
		}

	}
	return res

}

func dfs(graph map[string][]string, start_node string, visited map[string]bool) []string {
	if _, ok := visited[start_node]; !ok {
		visited[start_node] = true
		for _, node := range graph[start_node] {
			dfs(graph, node, visited)
		}
	}

	keys := make([]string, 0, len(visited))
	for k := range visited {
		keys = append(keys, k)
	}

	return keys

}

func main() {
	graph := make(map[string][]string)
	graph["you"] = []string{"alice", "bob", "claire"}
	graph["bob"] = []string{"anuj", "peggy"}
	graph["alice"] = []string{"peggy"}
	graph["claire"] = []string{"thom", "jonny"}
	graph["anuj"] = []string{}
	graph["peggy"] = []string{}
	graph["thom"] = []string{}
	graph["jonny"] = []string{}

	fmt.Println(bfs(graph, "you"))
	// [alice bob claire peggy anuj thom jonny]

	fmt.Println(dfs(graph, "you", make(map[string]bool)))
	// [you alice peggy bob anuj claire thom jonny]

}
```
