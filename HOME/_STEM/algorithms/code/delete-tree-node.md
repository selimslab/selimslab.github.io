---
tags: tree
---



```python
"""
root = [5,3,6,2,4,null,7]
key = 3
    5
   / \
  3   6
 / \   \
2   4   7
Given key to delete is 3. So we find the node with value 3 and delete it.
One valid answer is [5,4,6,2,null,null,7], shown in the following BST.
    5
   / \
  4   6
 /     \
2       7
Another valid answer is [5,2,6,null,4,null,7].
    5
   / \
  2   6
   \   \
    4   7
"""
    
def deleteNode(self, root, key):

    if not root:
        return

    if key > root.val:
        root.right = self.deleteNode(root.right, key)

    elif key < root.val:
        root.left = self.deleteNode(root.left, key)

    # now the key is the root of a subtree
    else:
        # if the subtree does not have a left child, we just return its right child
        # to its father, and they will be connected on the higher level recursion.
        if not root.left:
            return root.right

        # if it has a left child, we want to find the max val on the left subtree to 
        # replace the node we want to delete.
        else:
            # try to find the max value on the left subtree
            tmp = root.left
            while tmp.right:
                tmp = tmp.right

            root.val = tmp.val
   
                root.left = self.deleteNode(root.left, tmp.val)
        
        return root
```
