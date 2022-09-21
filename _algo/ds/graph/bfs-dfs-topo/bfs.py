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



