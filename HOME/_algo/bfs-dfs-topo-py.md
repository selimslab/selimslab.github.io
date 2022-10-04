---
tags: 
    - graph
---

[[graph]]


```py
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