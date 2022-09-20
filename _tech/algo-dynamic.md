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

## Unique BST 

<https://leetcode.com/problems/unique-binary-search-trees>
```

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

<https://leetcode.com/problems/best-time-to-buy-and-sell-stock-with-cooldown/submissions/>

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

## Min steps notepad 

```
/*
Initially on a notepad only one character 'A' is present. 

You can perform two operations on this notepad for each step:

Copy All: You can copy all the characters present on the notepad (partial copy is not allowed).

Paste: You can paste the characters which are copied last time.
 
Given a number n. You have to get exactly n 'A' on the notepad 
by performing the minimum number of steps permitted. 

Output the minimum number of steps to get n 'A'.

Example:
Input: 3
Output: 3

Explanation:
Intitally, we have one character 'A'.
In step 1, we use Copy All operation.
In step 2, we use Paste operation to get 'AA'.
In step 3, we use Paste operation to get 'AAA'.
*/

func minSteps(n int) int {
    dp := make(map[int]int)
    // the key insight is that it is always better to multiply
    for i := 2; i<=n; i++ {
        dp[i] = i
        // find the biggest factor of i
        // then just copy it and paste it (i/j)-1 times 
        for j:= i/2; j>1; j-- {
            if i%j == 0 {
                dp[i] = dp[j] + i/j // 1 copy + (i/j)-1 paste
                break // we don't need a smaller factor 
            }
        }
    }
    return dp[n]
}
```

## Edit Distance

```
import "fmt"

func min(vars ...int) int {
    min := vars[0]

    for _, i := range vars {
        if i < min {
            min = i
        }
    }

    return min
}

type key struct {
    x,y int 
}


func dist(word1 string, word2 string, table map[key]int, i int, j int ) int {
    if j == 0 {
        return i
    }
    if i == 0 {
        return j
    }
    
    if val, ok := table[key{i,j}]; ok{
        return val 
    }
        
    if word1[i-1] == word2[j-1] {
        return dist(word1,word2,table, i-1, j-1)
    } 
    
    ins := dist(word1,word2,table, i-1, j ) + 1
    del := dist(word1,word2,table, i, j-1 ) + 1
    rep := dist(word1,word2,table, i-1, j-1 ) + 1

    ans := min(del, ins ,rep)   
    table[key{i,j}] = ans
    return ans 
}

func minDistance(word1 string, word2 string) int {
    i, j := len(word1), len(word2)
    table := map[key]int{}
    return dist(word1,word2,table, i, j )
    
}
```