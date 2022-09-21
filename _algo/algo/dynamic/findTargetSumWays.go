/*

https://leetcode.com/problems/target-sum/

You are given a list of non-negative integers, 
a1, a2, ..., an, and a target, S. 

Now you have 2 symbols + and -. 
For each integer, you should choose one from + and - as its new symbol.

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