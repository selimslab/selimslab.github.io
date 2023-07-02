---
layout: code
tags: dp
layout: code

---




```go
func climbStairs(n int) int {
    memo := map[int]int{
        1:1,
        2:2,
    }
    var climb func(n int) int

    climb = func (n int) int {
        _, ok := memo[n];
        if !ok {
            memo[n] = climb(n-1) + climb(n-2)
        }
        return memo[n] 
    }
    return climb(n)
}

// or 

func minCostClimbingStairs(cost []int) int {
    c1,c2 := cost[0], cost[1]
    var min = func(a int,b int) int {
        if a<b{
            return a
        }
        return b 
    }
    
    for i:=2; i<len(cost); i++{
        c1, c2 = c2, cost[i] + min(c1,c2)
    }
            
    return min(c1,c2)         
}
```
