def maxPathSum(self, root: TreeNode) -> int:
    """
       1
      / \
     2   3

    Output: 6

    -10
    / \
    9  20
        /  \
    15   7

    Output: 42


    """
    max_sum = float("-inf")

    def walk(node):
        if not node:
            return 0

        left = max(0, walk(node.left))
        right = max(0, walk(node.right))

        max_sum = max(max_sum, node.val + left + right)

        return max(left, right) + node.val

    walk(root)

    return max_sum
