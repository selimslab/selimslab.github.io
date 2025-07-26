

## hash table 

1. Chain with linked lists, O(n) worst-case lookup
2. Chain with binary search trees, O(log n) worst-case 


## trees 

```py
def inorder(root):

    def walk(node):
        if node:
            walk(left)
            visit node 
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

def preorder(root):
    # return root, left, right

    visited = []
    stack = []
    node = root

    while stack or node:
        if node:
            stack.append(node)
            visited.append(node)
            node = node.left 
        else:
            node = stack.pop()
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


## trie 
```
t = self.root 
..
t = t[level]
```

## lru-cache 

dict+linked list

## probabilistic

sets: 
membership: bloom filter 
cardinality: hyperloglog
similarity: minhash, LSH 

streams:
freq with count-min-sketch 
select k random items with reservoir samp. 

balanced trees:
skiplist