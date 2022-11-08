---
layout: tag
tags: backtrack algorithms
---


    backtrack(current, args):
        if done:
            add to results
            return 
        if go this way:
            backtrack(current + x, updated args)
        elif go that way:
            backtrack(current + y, updated args)



```py
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

assert generateParenthesis(3) == ["((()))", "(()())", "(())()", "()(())", "()()()"]
```

```py
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


