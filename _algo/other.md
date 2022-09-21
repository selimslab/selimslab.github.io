---
layout: post
title: Other
---

## Sort

```
def quick_sort(data):
    # base case
    if len(data) < 2:
        return data
    # recursion
    else:
        less = list()
        greater = list()
        equal = list()
        pivot = data[int(len(data)/2)]
        for i in data:
            if i < pivot:
                less.append(i)
            elif i == pivot:
                equal.append(i)
            else:
                greater.append(i)

        return quick_sort(less) + equal + quick_sort(greater)


if __name__ == "__main__":
    print(quick_sort([9, 7, 5, 4, 6, 8, 12, 1, 26, 1, 1]))
```

```
def selection_sort(data):
    sorted_list = list()
    for i in range(len(data)):
        smallest_index = data.index(min(data))
        sorted_list.append(data.pop(smallest_index))
    return sorted_list

if __name__ == "__main__":
    print(selection_sort([9, 7, 5, 4, 6, 8, 12, 1, 26, 1, 1]))
```

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

```
"""
Input: tasks = ["A","A","A","B","B","B"], n = 2
Output: 8
Explanation: 
A -> B -> idle -> A -> B -> idle -> A -> B
There is at least 2 units of time between any two same tasks.


Input: tasks = ["A","A","A","A","A","A","B","C","D","E","F","G"], n = 2
Output: 16
Explanation: 
One possible solution is
A -> B -> C -> A -> D -> E -> A -> F -> G -> A -> idle -> idle -> A -> idle -> idle -> A
"""
import collections 

def leastInterval(self, tasks: List[str], n: int) -> int:        

    # tasks = ["A","A","A","B","B","B"]
    # n = 2 

    counts = list(collections.Counter(tasks).values()) # [3,3]
    max_count = max(counts) # 3
    num_of_chars_with_max_count = counts.count(max_count) # 2, A and B

    num_of_chunks_with_idles = max_count-1 # 2  -> A  A  A

    # either a task will fill an empty place or the place stays idle, 
    # either way the chunk size stays the same  
    length_of_a_chunk_with_idle = n+1  # 3 -> A _ _ A _ _ A 

    # on the final chunk, there will only be most frequent letters 
    length_of_the_final_chunk = num_of_chars_with_max_count  # 2  

    length_of_all_chunks = (num_of_chunks_with_idles*length_of_a_chunk_with_idle) + length_of_the_final_chunk # 2*3 + 2 = 8 
    # -> A B _ A B _ A B 

    return max(len(tasks), length_of_all_chunks)
```
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


"""
n=3
[
  "((()))",
  "(()())",
  "(())()",
  "()(())",
  "()()()"
]
We can start an opening bracket if we still have one (of n) left to place. 
And we can start a closing bracket if it would not exceed the number of opening brackets.
"""
def generateParenthesis(self, N):
    ans = []
    def backtrack(S = '', left = 0, right = 0):
        if len(S) == 2 * N:
            ans.append(S)
            return
        if left < N:
            backtrack(S+'(', left+1, right)
        if right < left:
            backtrack(S+')', left, right+1)

    backtrack()
    return ans


"""
find all unique combinations in candidates where the candidate numbers sums to target.
Input: candidates = [2,3,6,7], target = 7,
A solution set is:
[
  [7],
  [2,2,3]
]
Input: candidates = [2,3,5], target = 8,
A solution set is:
[
  [2,2,2,2],
  [2,3,3],
  [3,5]
]
"""

def combinationSum(self, candidates: List[int], target: int) -> List[List[int]]:

    def backtrack(target, comb, idx):
        if target == 0: # found a valid combination
            res.append(comb)
        for i, val in enumerate(candidates[idx:]):
            if val > target: break # dead end 
            backtrack(target-val, comb + [val], idx + i)

    res = []
    candidates.sort()
    backtrack(target, [], 0)

    return res 
```


## Morse

```
func uniqueMorseRepresentations(words []string) int {
    morse := []string{".-","-...","-.-.","-..",".","..-.",
              "--.","....","..",".---","-.-",".-..","--","-.","---",
              ".--.","--.-",".-.","...","-","..-","...-",".--","-..-","-.--",
              "--.."}
    tf := make(map[string]bool)
    
    for _, word := range words {
        rep := ""
        for _, r := range word {
            c := rune(r)
            i := int(c)-97 // 97 is ascii for a
            rep +=  morse[i]
        }
        tf[rep] = true
    }
    return len(tf)
}
```

## Num Squares

```
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

```
func plusOne(digits []int) []int {
  /*
  Given a non-empty array of digits representing a non-negative integer, plus one to the integer.
  The digits are stored such that the most significant digit is at the head of the list, and each element in the array contain a single digit.
  You may assume the integer does not contain any leading zero, except the number 0 itself.
  Example 1:
  Input: [1,2,3]
  Output: [1,2,4]
  Explanation: The array represents the integer 123.
  Example 2:
  Input: [4,3,2,1]
  Output: [4,3,2,2]
  Explanation: The array represents the integer 4321.
  */
    for i:= len(digits)-1; i>=0; i-- {
        if digits[i]<9{
            digits[i]++
            return digits
        }
        digits[i] = 0
    }
    
    //  cases like 100..   
    newDigits := make([]int, len(digits)+1)
    newDigits[0] = 1
    return newDigits   
}
```