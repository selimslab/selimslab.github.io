---
---

```py
def inorder(root):

    walk(node):
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
