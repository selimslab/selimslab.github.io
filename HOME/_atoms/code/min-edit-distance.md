---
tags: dynamic 
---

[[dynamic]]
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