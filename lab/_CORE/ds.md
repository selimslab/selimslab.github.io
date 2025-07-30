

## hash table 

1. Chain with linked lists, O(n) worst-case lookup
2. Chain with binary search trees, O(log n) worst-case 

## linked lists 

Detect cycle: no cycle if the fast ptr finds the end 

Get intersection: if there is one, two ptrs will meet after some iterations (if a ptr becomes null, move to head of other list)


## trie 
```
t = self.root 
t = t[level]
```

## lru-cache 

dict+linked list



## trees 

```py
def preorder(root):

    def walk(node):
        if node:
            visit node 
            walk(left)
            walk(right)

    walk(root)


def inorder(root):
    # return left, root, right

    stack = []
    node = root

    while stack or node:
        if node:
            stack.append(node)
            node = node.left 
        else:
            node = stack.pop()
            visit(node)
            node = node.right


def postorder(root):
    # return left, right, root 
    
    visited = []
    stack = []
    node = root 

    while stack or node:
        if node:
            stack.append(node)
            visited.append(node)
            node = node.right
        else:
            node = stack.pop()
            node = node.left

    return reversed(visited)

```



