"""
Input: [1,null,2,3]
   1
    \
     2
    /
   3
Output: [1,3,2]
"""


class Solution:
    def inorderTraversal(self, root):
        inorder = []
        stack = []

        while stack or root:
            if root:
                stack.append(root)
                root = root.left

            else:
                node = stack.pop()
                inorder.append(node.val)
                root = node.right

        return inorder

    def inorderTraversalRec(self, root: "TreeNode") -> "List[int]":
        inorder = list()

        def go(root):
            if root:
                go(root.left)
                inorder.append(root.val)
                go(root.right)

        go(root)

        return inorder



    

