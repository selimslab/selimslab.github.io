---
layout: post
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

```
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
```

```go
On a staircase, the i-th step has some non-negative cost cost[i] assigned (0 indexed).

Once you pay the cost, you can either climb one or two steps. 
You need to find minimum cost to reach the top of the floor, 
and you can either start from the step with index 0, or the step with index 1.

Example 1:
Input: cost = [10, 15, 20]
Output: 15
Explanation: Cheapest is start on cost[1], pay that cost and go to the top.

Example 2:
Input: cost = [1, 100, 1, 1, 1, 100, 1, 1, 100, 1]
Output: 6
Explanation: Cheapest is start on cost[0], and only step on 1s, skipping cost[3].

Note:
cost will have a length in the range [2, 1000].
Every cost[i] will be an integer in the range [0, 999].

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

```
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

```py
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

```py
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

# since we use only last 2, it could be optimized to 
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

```go
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

```go
import "fmt"

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

## Min steps to make words same 

```py
def minDistance(word1: str, word2: str) -> int:
    """
        Given two strings word1 and word2, 
        return the minimum number of steps 
        required to make word1 and word2 the same.


        Input: word1 = "sea", word2 = "eat"
        Output: 2
        Explanation: You need one step to make "sea" to "ea" 
        and another step to make "eat" to "ea".

        Input: word1 = "leetcode", word2 = "etco"
        Output: 4

    """
    m,n = len(word1), len(word2)

    if n<m:
        return minDistance(word2, word1)
    
    pre = [0]*(len(word1)+1)
    dp = [0]*(len(word1)+1)

    for i in range(1,n+1):
        for j in range(1,m+1):
            if word1[j-1] == word2[i-1]: 
                dp[j] = pre[j-1] + 1
            else:
                dp[j] = max(dp[j-1], pre[j])         
        pre = dp[::]

    lcs = dp[-1]
    
    del_ops = m+n-(2*lcs)
    
    return del_ops
```

## Word Break 

<https://leetcode.com/problems/word-break/>

```py
Given a non-empty string s and a dictionary wordDict containing a list of non-empty words, determine if s can be segmented into a space-separated sequence of one or more dictionary words.

Note:

The same word in the dictionary may be reused multiple times in the segmentation.
You may assume the dictionary does not contain duplicate words.
Example 1:

Input: s = "leetcode", wordDict = ["leet", "code"]
Output: true
Explanation: Return true because "leetcode" can be segmented as "leet code".
Example 2:

Input: s = "applepenapple", wordDict = ["apple", "pen"]
Output: true
Explanation: Return true because "applepenapple" can be segmented as "apple pen apple".
             Note that you are allowed to reuse a dictionary word.
Example 3:

Input: s = "catsandog", wordDict = ["cats", "dog", "sand", "and", "cat"]
Output: false

def wordBreak(self, s: str, wordDict: List[str]) -> bool:
    """
    this can be broken down to subproblems
    if we know a string is ok up to the 42nd index, it's enough to check from there 
    a list can keep track of this, ok = []
    if up to ith index of s is ok, ok[i] will be True 
    eg. 
    s="cars" 
    wordDict = [car, ca, rs]
    start walking from the start
    ok = [t,f,f,f,f,f]
    c, ca -> yes ca in dict, so ok becomes [t,f,t,f,f]
    a, ar, ars nope
    r, rs -> yes rs in dict, ok becomes [t,f,t,f,t]
    """

    ok = [True] + [False] * (len(s))

    for i in range(1,len(s)+1): 
        for j in range(i): # j is the start index
            # start point has to be ok, 
            # otherwise starting from here does not make sense
            if ok[j] and s[j:i] in wordDict: 
                    # we are ok up to index j 
                    ok[i] = True
                    break 
    return ok[-1]
```

## The longest increasing subsequence

<https://leetcode.com/problems/longest-increasing-subsequence/>

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

## Target Sum 

<https://leetcode.com/problems/target-sum/>

```go
/*
You are given a list of non-negative integers, a1, a2, ..., an, and a target, S. Now you have 2 symbols + and -. For each integer, you should choose one from + and - as its new symbol.

Find out how many ways to assign symbols to make sum of integers equal to target S.

Example 1:

Input: nums is [1, 1, 1, 1, 1], S is 3. 
Output: 5
Explanation: 

-1+1+1+1+1 = 3
+1-1+1+1+1 = 3
+1+1-1+1+1 = 3
+1+1+1-1+1 = 3
+1+1+1+1-1 = 3

There are 5 ways to assign symbols to make the sum of nums be target 3.
*/

type pair struct {
    x,y int 
}

func calc(nums[]int, i int, current_sum int, S int, memo map[pair]int) int {
    if count, ok := memo[pair{i,current_sum}]; ok{
        return count
    }
    
    if i == len(nums) {
        if current_sum == S {
            return 1
        } else {
            return 0 
        }
    }
    
    pos := calc(nums, i+1, current_sum+nums[i],S, memo)
    neg := calc(nums, i+1, current_sum-nums[i],S, memo)
    memo[pair{i,current_sum}] = pos + neg 
    return memo[pair{i,current_sum}]
    }


func findTargetSumWays(nums []int, S int) int {
    memo := map[pair]int{}
    return calc(nums, 0,0,S, memo)
}
```


## maximalSquare

```py
"""
Given a 2D binary matrix filled with 0's and 1's, 
find the largest square containing only 1's and return its area.
1 0 1 0 0
1 0 1 1 1
1 1 1 1 1
1 0 0 1 0
Output: 4
"""


def maximalSquare(self, matrix: List[List[str]]) -> int:
    rows = len(matrix)
    if rows:
        cols = len(matrix[0])
    else:
        cols = 0

    dp = [0] * (cols + 1)
    maxsq = 0
    prev = 0

    for i in range(1, rows + 1):
        for j in range(1, cols + 1):
            temp = dp[j]
            if matrix[i - 1][j - 1] == "1":
                min_prev = min(dp[j - 1], prev)
                min_cur = min(min_prev, dp[j])
                dp[j] = min_cur + 1
                maxsq = max(maxsq, dp[j])
            else:
                dp[j] = 0

            prev = temp

    return maxsq * maxsq
```

## Min path sum 

```go
func minPathSum(grid [][]int) int {
	/*
	Input: grid = [[1,3,1],[1,5,1],[4,2,1]]
	Output: 7
	Explanation: Because the path 1 → 3 → 1 → 1 → 1 minimizes the sum.
	*/
    rows := len(grid)
    cols := len(grid[0])
    
    // sum top row
    for j := 1; j < cols; j++ {
        grid[0][j] += grid[0][j-1]
    }
    
    // sum left column
    for j := 1; j < rows; j++ {
        grid[j][0] += grid[j-1][0]
    }
    
    for i := 1; i < rows; i++ {
        for j := 1; j < cols; j++ {
            grid[i][j] += min(grid[i-1][j],grid[i][j-1])
        }
    }
    
    return grid[rows-1][cols-1]
}
```