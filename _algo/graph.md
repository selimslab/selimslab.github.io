---
layout: post
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



<script src="https://gist.github.com/selimslab/b79fcd36a3a837b0e81cae7b7865ede6.js"></script>