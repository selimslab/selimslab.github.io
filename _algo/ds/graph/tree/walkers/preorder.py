"""
Input: [1,null,2,3]
   1
    \
     2
    /
   3
Output: [1,2,3]
"""


class Solution:
    def preorderTraversal(self, root):
        # root, left, right
        preorder = []
        stack = []

        while stack or root:
            if root:
                stack.append(root)
                preorder.append(root.val)
                root = root.left

            else:
                node = stack.pop()
                root = node.right

        return preorder

    def preorderTraversal(self, root: "TreeNode") -> "List[int]":
        preorder = list()

        def walk(root):
            if root:
                preorder.append(root.val)
                walk(root.left)
                walk(root.right)

        walk(root)

        return preorder
