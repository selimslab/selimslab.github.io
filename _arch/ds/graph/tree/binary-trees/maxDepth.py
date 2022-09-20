# Definition for a binary tree node.
# class TreeNode:
#     def __init__(self, x):
#         self.val = x
#         self.left = None
#         self.right = None

"""
   3
   / \
  9  20
    /  \
   15   7
 
return : 3
"""


def maxDepth(self, root: "TreeNode") -> "int":
    if not root:
        return 0
    left = self.maxDepth(root.left)
    right = self.maxDepth(root.right)

    return max(left, right) + 1
