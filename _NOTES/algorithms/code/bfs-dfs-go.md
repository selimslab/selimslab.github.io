---
tags: graph
layout: code

---


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

