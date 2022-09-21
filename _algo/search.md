---
layout: post
title: Search
---

```
def binary_search(nums, target)->int:
    while low <= high:
        if target at mid:
            return mid 
        if nums[mid] < target:
            low = mid + 1
        else:
            high = mid - 1

    return -1
```
