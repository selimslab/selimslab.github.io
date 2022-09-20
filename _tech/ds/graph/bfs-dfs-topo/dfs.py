def dfs(graph, start_node, visited=None):
    if not visited:
        visited = list()

    if start_node not in visited:
        visited.append(start_node)
        for node in graph.get(start_node, []):
            dfs(graph, node, visited)

    return visited




