---
title: Tree, Binary Search Tree
tags: 
    - tree
---

[[tree]]

```py
def sortedArrayToBST(self, nums: List[int]) -> TreeNode:
    """
    Given an array where elements are sorted in ascending order, convert it to a height balanced BST.
    For this problem, a height-balanced binary tree is defined as a binary tree in which the depth of the two subtrees of every node never differ by more than 1.
    Example:
    Given the sorted array: [-10,-3,0,5,9],
    One possible answer is: [0,-3,9,-10,null,5], which represents the following height balanced BST:
          0
         / \
       -3   9
       /   /
     -10  5
    """
    def go(left,right):
        if left>right:
            return None
        mid = (left+right) // 2
        root = TreeNode(nums[mid])
        root.left = go(left, mid-1)
        root.right = go(mid+1, right)
        return root

    return go(0, len(nums)-1)
```

```py
def sortedListToBST(self, head: ListNode) -> TreeNode:
    """
  
    Given a singly linked list where elements are sorted in ascending order, convert it to a height balanced BST.
    For this problem, a height-balanced binary tree is defined as a binary tree in which the depth of the two subtrees of every node never differ by more than 1.
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
```