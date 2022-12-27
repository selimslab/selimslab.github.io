---
tags: ptr
layout: code
---


```python
"""
A string S of lowercase English letters is given.

 We want to partition this string into as many parts as possible 
 
 so that each letter appears in at most one part, 
 
 and return a list of integers representing the size of these parts.

Input: S = "ababcbacadefegdehijhklij"

Output: [9,7,8]

Explanation:

The partition is "ababcbaca", "defegde", "hijhklij".

This is a partition so that each letter appears in at most one part.

A partition like "ababcbacadefegde", "hijhklij" is incorrect, because it splits S into less parts.
"""

def partitionLabels(self, S: str) -> List[int]:
    res = []

    # Figure out the rightmost index for each letter 
    # and use it to separate sections
    maxright = {c:i for i, c in enumerate(S) }

    l = r = 0 
    for i, c in enumerate(S):
        r = max(r, maxright[c])
        if r == i:
            res.append(r-l+1)
            # Reset the left pointer at the start of each new section.
            l = i+1

    return res 
```
