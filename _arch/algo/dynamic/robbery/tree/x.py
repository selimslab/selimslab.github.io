def rob(self, root: TreeNode) -> int:
    def robTree(node):
        """
        now: max money earned if input node is robbed
        later: max money earned if input node is not robbed
        """
        if not node:
            return 0, 0

        left, right = robTree(node.left), robTree(node.right)

        now = node.val + left[1] + right[1]

        later = max(left) + max(right)

        return now, later

    res = robTree(root)

    return max(res)
