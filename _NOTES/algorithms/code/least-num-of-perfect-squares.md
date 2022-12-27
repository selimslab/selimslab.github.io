---
tags: q
layout: code
---

```go
/*
Given a positive integer n, 
find the least number of perfect square numbers which sum to n.
(for example, 1, 4, 9, 16, ...)

Example 1:

Input: n = 12
Output: 3 
Explanation: 12 = 4 + 4 + 4.


Example 2:

Input: n = 13
Output: 2
Explanation: 13 = 4 + 9.
*/

func numSquares(n int) int {
    var perfect_squares []int
    for i:= 1; i*i<=n; i++{
        if i*i == n{
            return 1
        }
        perfect_squares = append(perfect_squares, i*i)
    }
    
    ans := 0 
    queue := []int{n}
    
    for len(queue) != 0  {
        /*
        ans 1, queue is [12] 
        ans 2, the paths are 1,4,9 -> queue becomes [11 8 3], 
        following the paths 1,4,9, the new level becomes [10 7 2 7 4 2]
        ans = 3, it returns at 4, the shortest path to 0 turns out to be 12 -> 8 -> 4 -> 0 
        */
        ans += 1
        var next_level []int
        for _, num := range(queue){
            for _, perf := range(perfect_squares){
                if num == perf{
                    return ans
                }
                if num<perf{
                    break
                }
                next_level = append(next_level, num-perf)
            } 
            
        }
        queue = next_level 
    }
    return ans 
}
```