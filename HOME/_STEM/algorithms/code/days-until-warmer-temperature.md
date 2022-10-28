---
tags: stack
---


```python
def dailyTemperatures(T):
    """
    how many days you would have to wait until a warmer temperature ? 
    """

    ans = [0] * len(T)
    stack = []
    for today, temp in enumerate(T):
        while stack and T[stack[-1]] < temp:
            old_day = stack.pop()
            ans[old_day] = today - old_day
        stack.append(today) 

    return ans


t = [73, 74, 75, 71, 69, 72, 76, 73]
assert dailyTemperatures(t) ==  [1, 1, 4, 2, 1, 1, 0, 0]
```
