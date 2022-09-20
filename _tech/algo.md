---
layout: post
title: Algorithms
---

## Search 

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

## Sort

## Pointers

```
max water among sticks:
    move the shorter line
```

## Sliding 


## Greedy 


## Subsets

```
subsets(nums):
  start with empty set 

  for num in nums:
    newseen = []
    for set in seen:
      add (set + num) to newseen

    merge newseen with seen
```

## Backtrack

```
backtrack(current, args):
    if done:
        add to results
        return 
    if go this way:
        backtrack(current + x, updated args)
    elif go that way:
        backtrack(current + y, updated args)
```


