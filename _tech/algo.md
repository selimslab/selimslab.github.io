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

<script src="https://gist.github.com/selimslab/9f8c72be1867c2cce60dbb7f6bc41b37.js"></script>



## Sliding Window 


<https://leetcode.com/problems/sliding-window-maximum/>

```
/*
Input: nums = [1,3,-1,-3,5,3,6,7], k = 3
Output: [3,3,5,5,6,7]
Explanation: 
Window position                Max
---------------               -----
[1  3  -1] -3  5  3  6  7       3
 1 [3  -1  -3] 5  3  6  7       3
 1  3 [-1  -3  5] 3  6  7       5
 1  3  -1 [-3  5  3] 6  7       5
 1  3  -1  -3 [5  3  6] 7       6
 1  3  -1  -3  5 [3  6  7]      7
*/

func max(nums ...int) int {
    max := nums[0]
    for _, i := range nums {
        if i > max {
            max = i
        }
    }
    return max
}


func maxSlidingWindow2(nums []int, k int) []int {
    ans := []int{}    
    for i:=0; i<len(nums)-k+1;i++{
        ans = append(ans, max(nums[i:i+k]...))
    }
    return ans 
}


func maxSlidingWindow(nums []int, k int) []int {
	ans := []int{}
	q := make([]int, 0)

	for i := 0; i < len(nums); i++ {
		// if a queue element is less than the new number, pop it 
		for len(q) > 0 && nums[i] > q[len(q)-1] {
			q = q[:len(q)-1]
		}

		q = append(q, nums[i])

		index_to_exit := i-k+1 // this index will go out of window in the next iteration 
		if index_to_exit >= 0 {
		    ans = append(ans, q[0])
		    // If the greatest element in q is about to exit window, remove it from q
		    if nums[index_to_exit] == q[0] {
			q = q[1:]
		    }
		}
	}
	return ans
}
```

## Greedy 

<script src="https://gist.github.com/selimslab/af1606d6b36b8a6e7cfca5d04f1ac5cb.js"></script>

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


