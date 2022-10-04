---
tags: 
    - pointers
---

[[pointers]]
```py
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