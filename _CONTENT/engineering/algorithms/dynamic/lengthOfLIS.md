---
title: Longest increasing subsequence

---


```go
/*
Given an unsorted array of integers, find the length of longest increasing subsequence.

Example:

Input: [10,9,2,5,3,7,101,18]
Output: 4 
Explanation: The longest increasing subsequence is [2,3,7,101], therefore the length is 4. 
Note:

There may be more than one LIS combination, it is only necessary for you to return the length.
Your algorithm should run in O(n2) complexity.
Follow up: Could you improve it to O(n log n) time complexity?
*/


func lengthOfLIS(nums []int) int {
    if len(nums) == 0 {
        return 0
    }
    
    lis := make([]int, len(nums)) // lis[i] holds the length of max LIS up to the index i 

    lis[0]=1 // there is number itself, so it starts from 1 
    ans := 1 
    
    for i:=1; i<len(nums); i++{
        gt := 0 
        for j:=0; j<i; j++{
            if nums[i]>nums[j]{
                // when you are greater than a previous number
                // your sequence is at least as long as theirs or longer 
                gt = max(gt, lis[j]) 
            } 
        }
        lis[i] = gt + 1 // the current number is bigger than gt numbers before, including 
        ans = max(ans,lis[i])
    }
    return ans 
}
```
