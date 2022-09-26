
---
layout: post
title: Pointers
---


## Partition Labels

```python
A string S of lowercase English letters is given. We want to partition this string into as many parts as possible so that each letter appears in at most one part, and return a list of integers representing the size of these parts.

Input: S = "ababcbacadefegdehijhklij"

Output: [9,7,8]

Explanation:

The partition is "ababcbaca", "defegde", "hijhklij".

This is a partition so that each letter appears in at most one part.

A partition like "ababcbacadefegde", "hijhklij" is incorrect, because it splits S into less parts.

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


## Max Water 

```
max water among sticks:
    move the shorter line
```


```python
"""
Input: height = [1,8,6,2,5,4,8,3,7]
Output: 49
Explanation: The above vertical lines are represented by array [1,8,6,2,5,4,8,3,7]. 
In this case, the max area of water (blue section) the container can contain is 49.
"""
def maxArea(self, height: List[int]) -> int:
    def area(l,r):
        h = min(height[l],height[r])
        w = r-l
        return h*w

    l = 0
    r = len(height)-1
    max_area = 0 

    while l<r:
        max_area = max(max_area, area(l,r))
        # move the shorter line 
        if height[l]<height[r]:
            l += 1
        else:
            r -= 1

    return max_area 
```


```python
def minWindow(self,s, t):
    """
    Given a string S and a string T, 
    find the minimum window in S which will contain
    all the characters in T in complexity O(n).

    Input: S = "ADOBECODEBANC", T = "ABC"
    Output: "BANC"

    1. Use two pointers: start and end to represent a window.
    2. Move end to find a valid window.
    3. When a valid window is found, move start to find a smaller window.
    """
    need = collections.Counter(t)            
    missing = len(t)                         
    start, end = 0, 0
    left = 0
    for right, char in enumerate(s, 1):       
        #index j from 1
        if need[char] > 0:
            missing -= 1
        need[char] -= 1

        # we found a window 
        if missing == 0:                  

            # remove un-target chars from the start to find the real start
            while left < right and need[s[left]] < 0: 
                need[s[left]] += 1
                left += 1


            if end == 0 or right-left < end-start: 
                # update window
                start, end = left, right 

            # we will move the left pointer, 
            # and the first char is a target, 
            # so we will need to find another one 
            need[s[left]] += 1   
            missing += 1   

            # update i to start+1 for next window
            left += 1                         
    return s[start:end]

assert minWindow("ADOBECODEBANC", "ABC") == "BANC"
```