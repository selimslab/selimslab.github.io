---
---


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

