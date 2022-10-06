---
tags: 
    - array 
    - pointers
---

[[array]]

[[pointers]]


```py
"""
Input: 
nums = [1, 7, 3, 6, 5, 6]
Output: 3
Explanation: 
The sum of the numbers to the left of index 3 (nums[3] = 6) is equal to the sum of numbers to the right of index 3.
Also, 3 is the first index where this occurs.
"""


def pivot_index(self, nums) -> int:
    n = len(nums)

    total = sum(nums)
    left = 0
    right = total

    for i in range(n):
        right -= nums[i]
        if right == left:
            return i
        left += nums[i]

    return -1
```