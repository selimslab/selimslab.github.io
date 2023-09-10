---
tags: dp mid 
---

[[longest-common-subsequence]]

```go
/*
Input: word1 = "sea", word2 = "eat"
Output: 2
Explanation: You need one step to make "sea" to "ea" 
and another step to make "eat" to "ea".

Input: word1 = "leetcode", word2 = "etco"
Output: 4
*/
func minSteps(word1 string, word2 string):
    lcs_length = longestCommonSubsequence(word1, word2)
    steps1 = len(word1) - lcs_length
    steps2 = len(word2) - lcs_length
    return steps1 + steps2
```