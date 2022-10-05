---
tags: 
    - dynamic
---

[[dynamic]]
## Word Break 

<https://leetcode.com/problems/word-break/>

```py
"""
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
"""

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
