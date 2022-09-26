---
layout: post
title: Sliding Window 
---

```python
import collections

def characterReplacement(s:str, k:int):
    counter = collections.Counter()
    start = 0
    longest_window = 0 

    current_window_size = lambda: end-start+1

    for end, c in enumerate(s):
        counter[c] += 1
        count_of_most_freq_char_in_window = counter.most_common(1)[0][1]
        count_of_different_chars_in_window = current_window_size() - count_of_most_freq_char_in_window
        has_enough_replacements = count_of_different_chars_in_window <= k
        if not has_enough_replacements: 
            # shrink_the_window
            counter[s[start]] -= 1
            start += 1
            
        longest_window = max(longest_window, current_window_size())
    return longest_window  

s = "ABAB"
k = 2
assert characterReplacement(s,k) == 4 

s = "AABABBA"
k = 1
assert characterReplacement(s,k) == 4 
```

<https://leetcode.com/problems/sliding-window-maximum/>

```go
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