---
title: Dijkstra
tags: graph algo 
layout: code
---


```py
from collections import defaultdict


class Graph:
    def __init__(self):
        self.nodes = set()
        self.edges = defaultdict(list)
        self.distances = {}

    def add_node(self, value):
        self.nodes.add(value)

    def add_edge(self, from_node, to_node, distance):
        if from_node not in self.nodes:
            self.add_node(from_node)
        if to_node not in self.nodes:
            self.add_node(to_node)
        self.edges[from_node].append(to_node)
        self.edges[to_node].append(from_node)
        self.distances[(from_node, to_node)] = distance
        self.distances[(to_node, from_node)] = distance


def get_shortest_path(parents, start_node, finish_node):
    path = [finish_node]
    parent = parents[finish_node]
    while parent:
        path = [parent] + path
        if parent == start_node:
            break
        parent = parents[parent]
    return path


def dijkstra(graph, start_node, finish_node):
    costs = {start_node: 0}
    parents = dict()
    nodes = graph.nodes

    while nodes:
        costs_of_remaining_nodes = {k: v for k, v in costs.items() if k in nodes}
        cheapest_node = min(costs_of_remaining_nodes, key=costs_of_remaining_nodes.get)
        nodes.remove(cheapest_node)

        cost = costs[cheapest_node]
        neighbors = graph.edges[cheapest_node]

        for neighbor in neighbors:
            new_cost = cost + graph.distances[(cheapest_node, neighbor)]
            if neighbor not in costs or new_cost < costs[neighbor]:
                costs[neighbor] = new_cost
                parents[neighbor] = cheapest_node

    print("parents:", parents)
    print("minimum distances:", costs)

    return get_shortest_path(parents, start_node, finish_node)


def test_dijkstra():
    cities = Graph()
    edges = [
        ("ankara", "istanbul", 6),
        ("ankara", "eskişehir", 2),
        ("eskişehir", "istanbul", 3),
        ("eskişehir", "izmir", 12),
        ("istanbul", "izmir", 8),
    ]

    for start, finish, distance in edges:
        cities.add_edge(start, finish, distance)

    shortest_path = dijkstra(cities, "ankara", "izmir")

    assert shortest_path == ['ankara', 'eskişehir', 'istanbul', 'izmir']


if __name__ == "__main__":
    test_dijkstra()
```