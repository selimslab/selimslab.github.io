---
layout: post
title: Algorithms, Dynamic
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

```
def fib(n):
    if n < 2:
        return n
    if n not in memo.keys():
        memo[n] = fib(n - 1) + fib(n - 2)
    return memo.get(n)
```


## House Robber 

```
def rob(nums: List[int]) -> int:
    # max robbery, no adjacent homes
    if not nums:
        return 0

    dp = {}
    n = len(nums)

    def decide(i):
        if i < 2:
            return max(nums[: i + 1])

        if i not in dp:
            rob = decide(i - 2) + nums[i]
            skip = decide(i - 1)
            dp[i] = max(rob, skip)
            
        return dp[i]


    return decide(n - 1)

# since we use only last 2, it could be optimized to 
def rob():
    for num in nums:
        prev1, prev2 = max(prev2+num, prev1), prev1

def rob_circular(nums: List[int]) -> int:

    return max of (0 to n-2) vs (1 to n-1) homes

def rob_tree(nums: List[int]) -> int:
    node.rob = node.val + left.skip + right.skip
    node.skip = max(left.rob, left.skip) + max(right.rob, right.skip)
```



## Stocks with 1 day cooldown

```go
func maxProfit(prices []int) int {
    /*
    it's a state machine with 3 states 

    can_buy, can_sell, cool_down

    can_buy -> (buy) -> can_sell -> (sell) -> cool_down -> can_buy
    */
    
    // the game starts with can_buy, 
    can_buy := 0  

    // can_sell and cool_down are minInt because they will be possible after buying 
    can_sell := math.MinInt32 
    cool_down :=  math.MinInt32 
    
    for _, p := range(prices) {
        // either all has to be in a single line or we need to remember a prev value  
        can_sell_prev := can_sell
        can_sell = max(can_sell, can_buy-p) 
        can_buy = max(can_buy, cool_down) 
        cool_down = can_sell_prev + p 
    }
    
    // the game should end with no stock at hand 
    return max(can_buy, cool_down)
}
```