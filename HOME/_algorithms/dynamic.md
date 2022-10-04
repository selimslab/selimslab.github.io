---
tags: 
    - algorithms
---



```
def dynamic(n):
    if base case:
        return  

    if n not in memo:
        memo[n] = recurrence relation 
    
    return memo[n]
```

```python
def fibonacci(n):
    if n < 2:
        return n
    if n not in memo.keys():
        memo[n] = fib(n - 1) + fib(n - 2)
    return memo.get(n)
```








