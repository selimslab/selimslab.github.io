---
tags: gr
layout: code

---


**bfs:** use a queue
**dfs:** recursive or stack
**topo:** reuse dfs, mark visited, add to stack after all neighbors are visited, reverse the stack 


```py
from collections import deque


def bfs(graph, node):
    q = deque([node])
    res = []
    seen = set()

    while q:
        n = q.popleft()
        if n not in seen:
            q += graph.get(n, [])
            res.append(n)
            seen.add(n)

    return result

def dfs(graph, node, seen=None, res=None):
    if not seen:
        seen = set()
    if not res: 
        res = []

    if node not in seen:
        res.append(node)
        seen.add(node)
        for n in graph.get(node, []):
            dfs(graph, n, seen, res)

    return res


def topological_sort(graph):
    def dfs(node):
        if node in visited:
            return

        visited.add(node)
        
        for neighbor in graph.get(node, []):
            dfs(neighbor)
        
        # After visiting all neighbors, add the node to the stack
        stack.append(node)

    visited = set()
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
