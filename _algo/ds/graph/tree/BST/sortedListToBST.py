from typing import List


class ListNode:
    def __init__(self, data):
        self.val = val
        self.next = None


class TreeNode:
    def __init__(self, data):
        self.val = val
        self.left = None
        self.right = None


def sortedListToBST(self, head: ListNode) -> TreeNode:
    """
    https://leetcode.com/problems/convert-sorted-list-to-binary-search-tree/

    Given a singly linked list where elements are sorted in ascending order,
    convert it to a height balanced BST.

    For this problem, 
    a height-balanced binary tree is defined as a binary tree 
    in which the depth of the two subtrees of every node never differ by more than 1.

    Example:
    Given the sorted linked list: [-10,-3,0,5,9],
    One possible answer is: [0,-3,9,-10,null,5], which represents the following height balanced BST:
          0
         / \
       -3   9
       /   /
     -10  5
    """
    if not head:
        return None
    if not head.next:
        return TreeNode(head.val)

    pre, slow, fast = None, head, head

    # when fast is at the end, slow will be at mid
    while fast and fast.next:
        pre, slow, fast = slow, slow.next, fast.next.next
    if pre:
        # cut the parts from mid
        pre.next = None

    root = TreeNode(slow.val)
    root.left = self.sortedListToBST(head)
    root.right = self.sortedListToBST(slow.next)

    return root
