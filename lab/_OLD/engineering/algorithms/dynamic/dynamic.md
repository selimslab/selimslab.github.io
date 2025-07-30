---
title: Dynamic Programming

---

Can you break a problem down to discrete, independent sub-problems? 

Could be bottom-up or top-down 

Top down uses recursion and memoization. You don't have to precisely define the order of subproblems 

Bottom up iterates up from the base case. It may have better perf since no need to whole recursion tree in memory 

```
def dynamic(n):
    if base case:
        return  

    if n not in memo:
        memo[n] = recurrence relation 
    
    return memo[n]
```
