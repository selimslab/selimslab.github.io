---
title: Binary Search Tree
tags: easy
---



```py
def sorted_list_to_bst(nums):
    if not nums:
        return None
    
    # Find the middle index of the list
    mid = len(nums) // 2
    
    # Create a TreeNode with the middle element as the root
    root = TreeNode(nums[mid])
    
    # Recursively build the left and right subtrees
    root.left = sorted_list_to_bst(nums[:mid])
    root.right = sorted_list_to_bst(nums[mid+1:])
    
    return root
```

