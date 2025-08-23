---
---
```py
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
