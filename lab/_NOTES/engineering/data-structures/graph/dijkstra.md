---
---

```py
from collections import defaultdict
from dataclasses import dataclass, field
import heapq

Cost = int
Node = str

@dataclass
class Edge:
    source: Node
    target: Node
    cost: Cost

@dataclass
class Graph:
    # represent graph as an edge list 
    edges: defaultdict[Node, list[Edge]] = field(
        default_factory=lambda: defaultdict(list)
    )

    def add_edge(self, edge: Edge):
        self.edges[edge.source].append(edge)

    def get_shortest_path(self, start: Node, finish: Node):
        # dijkstra

        costs: dict[Node, Cost] = {
            node: float("infinity") for node in self.edges
        }
        costs[start] = 0
        parents: dict[Node, Node] = {}

        priority_queue = [(0, start)]

        while priority_queue:
            current_distance, current_node = heapq.heappop(priority_queue)
            if current_distance > costs[current_node]:
                continue
            for edge in self.edges[current_node]:
                cost_to_target = current_distance + edge.cost
                if cost_to_target < costs[edge.target]:
                    costs[edge.target] = cost_to_target
                    parents[edge.target] = current_node
                    heapq.heappush(priority_queue, (cost_to_target, edge.target))

        print("parents:", parents)
        print("minimum distances:", costs)

        path = [finish]
        parent = parents.get(finish)
        while parent:
            path.append(parent)
            if parent == start:
                break
            parent = parents.get(parent)

        shortest_path = list(reversed(path))
        print("shortest_path:", shortest_path)
        return shortest_path


def test_dijkstra():
    cities = Graph()
    edges = [
        ("ankara", "istanbul", 6),
        ("ankara", "eskisehir", 2),
        ("eskisehir", "istanbul", 3),
        ("eskisehir", "izmir", 12),
        ("istanbul", "izmir", 8),
    ]

    for start, finish, distance in edges:
        cities.add_edge(Edge(start, finish, distance))
        cities.add_edge(Edge(finish, start, distance))

    shortest_path = cities.get_shortest_path("ankara", "izmir")
    assert shortest_path == ["ankara", "eskisehir", "istanbul", "izmir"]


if __name__ == "__main__":
    test_dijkstra()
```