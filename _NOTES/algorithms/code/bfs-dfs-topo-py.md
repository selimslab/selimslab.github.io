---
tags: graph
layout: code

---




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


def toposort(graph):
    visited = []

    def topo(node):
        for n in graph.get(node, []):
            if n not in visited:
                topo(n)

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