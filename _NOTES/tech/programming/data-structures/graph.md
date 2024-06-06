---

tags: gr
---

```py
dfs(node):
    if node is not visited:
        visit node 
        for n in neighbours:
            dfs(n)
```

```py
bfs(start_node):
    add start_node to q 
    while q:
        get a node from q
        if node is not visited:
            add neighbors to q 
            visit node 
```

```py
toposort(graph):  

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




