"""
Input: [1,null,2,3]
   1
    \
     2
    /
   3
Output: [3,2,1]
"""


class Solution:
    def postorderTraversal(self, root):
        postorder = []
        stack = []

        while root or stack:
            if root:
                # instead of left, right, root; we build the array as root, right, left and invert it
                stack.append(root)
                postorder.append(root.val)
                root = root.right

            else:
                node = stack.pop()
                root = node.left

        return postorder[::-1]

    def postorderTraversal(self, root: "TreeNode") -> "List[int]":
        postorder = list()

        def walk(root):
            if root:
                walk(root.left)
                walk(root.right)
                postorder.append(root.val)

        walk(root)

        return postorder
