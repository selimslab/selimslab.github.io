---
 
title: Dynamic
---


```
def dynamic(n):
    if base case:
        return  

    if n not in memo:
        memo[n] = recurrence relation 
    
    return memo[n]
```


## Fibonacci

```python
def fib(n):
    if n < 2:
        return n
    if n not in memo.keys():
        memo[n] = fib(n - 1) + fib(n - 2)
    return memo.get(n)
```


## Stairs


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


## coinChange

```python
def coinChange(coins: List[int], amount: int) -> int:
    # coinChange([1,2,5],11) == 3
    min_coins = [0] + [float('inf')]*amount
    for sub_amount in range(amount+1):
        for coin in coins:
            if coin <= sub_amount:
                min_coins[sub_amount] = min(min_coins[sub_amount], min_coins[sub_amount-coin]+1)
    
    if min_coins[-1] == float('inf'):
        return -1
    else: 
        return min_coins[-1]
```

## Unique BST 

<https://leetcode.com/problems/unique-binary-search-trees>

```python
"""
Input: 3
Output: 5
Explanation:
Given n = 3, there are a total of 5 unique BST's:

   1         3     3      2      1
    \       /     /      / \      \
     3     2     1      1   3      2
    /     /       \                 \
   2     1         2                 3
"""
def numTrees(self, n: int) -> int:  
    dp = [0] * (n+1) # d[n] is the possible num of trees for n elements 
    dp[0] = dp[1] = 1 # there are only 1 possible tree for no element or 1 element 

    for i in range(2,n+1): # we know numTrees for 0 and 1 elements so we start from 2  
        for j in range(1,i+1): 
            # eg. d2 = d1d1, d3= d2 + d1d1 + d2, d4 = d3 + d1d2+ d2d1 + d3
            dp[i] += dp[j-1] * dp[i-j]

    return dp[n]

```


