---
 
title: Graph 
---

## Search 

```
dfs(node):
    if node is not visited:
        visit node 
        for n in neighbours:
            dfs(n)

bfs(start_node):
    add start_node to q 
    while q:
        get a node from q
        if node is not visited:
            add neighbors to q 
            visit node 
```

## Sort 

```
topo(graph):  

    tfs(node):
        for n in neighbours:
            if n is not seen:
                tfs(n)

        if node is not seen:
            mark as seen 
            add to stack 

    for node in graph:
        tfs(node) 

    return reversed stack 
```



```python
from collections import deque


def bfs(graph, start_node):
    queue = deque()
    queue.append(start_node)

    result = list()

    while queue:
        node = queue.popleft()
        if node not in result:
            queue += graph.get(node, [])
            result.append(node)

    return result


def dfs(graph, start_node, visited=None):
    if not visited:
        visited = list()

    if start_node not in visited:
        visited.append(start_node)
        for node in graph.get(start_node, []):
            dfs(graph, node, visited)

    return visited


def toposort(graph):
    visited = list()

    def topo(node):
        for neigh in graph.get(node, []):
            if neigh not in visited:
                topo(neigh)

        # mark as visited only after visiting all neighbours
        if node not in visited:
            visited.append(node)

    for node in graph:
        topo(node)

    return visited[::-1]


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

```python
def levelOrder(self, root: "TreeNode") -> "List[List[int]]":
    levelorder = list()

    current_level = [root]

    while root and current_level:
        next_level = list()
        current_vals = list()

        for node in current_level:
            current_vals.append(node.val)

            if node.left:
                next_level.append(node.left)

            if node.right:
                next_level.append(node.right)

        levelorder.append(current_vals)
        current_level = next_level

    return levelorder
```