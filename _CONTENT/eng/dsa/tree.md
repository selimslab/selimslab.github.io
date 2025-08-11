---
---
## trie
```
t = self.root
t = t[level]
```


## walk

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


## BST

```python
def deleteBSTNode(self, root, key):

    if not root:
        return

    if key > root.val:
        root.right = self.deleteNode(root.right, key)

    elif key < root.val:
        root.left = self.deleteNode(root.left, key)

    # now the key is the root of a subtree
    else:
        # if the subtree does not have a left child, we just return its right child
        # to its parent, and they will be connected on the higher level recursion.
        if not root.left:
            return root.right

        # if it has a left child, we want to find the max val on the left subtree
        # to replace the node we want to delete.
        else:
            # find the max value on the left subtree
            tmp = root.left
            while tmp.right:
                tmp = tmp.right
            root.val = tmp.val
            root.left = self.deleteNode(root.left, tmp.val)

        return root
```



## Diameter

```go
func diameterOfBinaryTree(root *TreeNode) int {
    dia := 0

    var walk func(root *TreeNode) int

    walk = func(root *TreeNode) int {
        if root == nil{
            return 0
        }

        var leftDepth = walk(root.Left)

        var rightDepth = walk(root.Right)

        maxDia = max(dia, leftDepth+rightDepth)

        return max(leftDepth,rightDepth) + 1

    }

    walk(root)

    return maxDia

}
```

## Invert

```py
def invert(root):
    if not root:
        return None

    right = invert(root.right)
    left = invert(root.left)

    root.right = left
    root.left = right

    return root
```

## Mirror

```java
/*
    1
   / \
  2   2
 / \ / \
3  4 4  3
*/
public boolean isSymmetric(TreeNode root) {
    return isMirror(root, root);
}

public boolean isMirror(TreeNode t1, TreeNode t2) {
    if (t1 == null && t2 == null) return true;
    if (t1 == null || t2 == null) return false;
    return (t1.val == t2.val)
        && isMirror(t1.right, t2.left)
        && isMirror(t1.left, t2.right);
}
```

## Max path sum

```python
def maxPathSum(self, root: TreeNode) -> int:
    """
       1
      / \
     2   3

    Output: 6

    -10
    /  \
    9   20
        /  \
        15   7

    Output: 42


    """
    mps = float("-inf")

    def walk(node):
        if not node:
            return 0

        left = max(0, walk(node.left))
        right = max(0, walk(node.right))

        cur = node.val + left + right
        mps = max(mps, cur)

        return max(left, right) + node.val

    walk(root)

    return mps
```
