---

tags: dp algo
---

It's useful when you try to optimize something given a constraint 

It only works if you can split the problem into discrete subproblems 

Discrete is important here, if some subproblems are dependent, DP doesnt work 

Could be bottom-up or top-down 

Top down uses recursion and memoization 

Bottom up iterates up from the base case 

Generally top-down is easier because you don't have to precisely define the order of subproblems 

Bottom-up could be more performant because it doesn't use a recursive call stack and it might not need to keep the whole recursion tree in memory 



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