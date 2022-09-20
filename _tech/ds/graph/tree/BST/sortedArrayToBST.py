from typing import List


class TreeNode:
    def __init__(self, data):
        self.data = data
        self.left = None
        self.right = None


def sortedArrayToBST(nums: List[int]) -> TreeNode:
    """
    Given an array where elements are sorted in ascending order, 
    convert it to a height balanced BST.

    For this problem, 
    a height-balanced binary tree is defined as a binary tree
     in which the depth of the two subtrees of every node never differ by more than 1.

    Example:

    Given the sorted array: [-10,-3,0,5,9],

    One possible answer is: [0,-3,9,-10,null,5], 
    which represents the following height balanced BST:

          0
         / \
       -3   9
       /   /
     -10  5
    """

    def go(left, right):
        if left > right:
            return None
        mid = (left + right) // 2
        root = TreeNode(nums[mid])
        root.left = go(left, mid - 1)
        root.right = go(mid + 1, right)
        return root

    return go(0, len(nums) - 1)
