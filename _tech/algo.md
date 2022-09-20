---
layout: post
title: Algorithms
---

## Graph Search 

```
dfs(node):
    if node is not visited:
        visit node 
        for n in neighbours:
            dfs(n)


bfs(start_node):
    add start_node to q 
    while q:
        get a node from q
        if node is not visited:
            add neighbors to q 
            visit node 


topo(graph):  

    tfs(node):
        for n in neighbours:
            if n is not seen:
                tfs(n)

        if node is not seen:
            mark as seen 
            add to stack 

    for node in graph:
        tfs(node) 

    return reversed stack 

```


## Graph Traversals 

```
inorder(root):

    walk(node):
        if node:
            walk(left)
            visit node 
            walk(right)

    walk(root)


inorder(root):
    # return left, root, right

    stack = []

    while stack or root:
        if root:
             add root to stack 
             go left

        else:
            get node from stack 
            visit node 
            go right 


preorder(root):
    # return root, left, right

    stack = []

    while stack or root:
        if root:
            add root to stack 
            visit node 
            go left 

        else:
            get node from stack 
            go right

postorder(root):
    # return left, right, root 
    # visit in reverse 

    stack = []

    while stack or root:
        if root:
            add root to stack 
             visit node 
             go right 

        else:
            get node from stack 
            go left

    return reverse visited

```

 

## Search 

```
def binary_search(nums, target)->int:
    while low <= high:
        if target at mid:
            return mid 
        if nums[mid] < target:
            low = mid + 1
        else:
            high = mid - 1

    return -1
```


## String 


## Array 


## Stack 


## Queue 


## Heap  


## Pointers

```
max water among sticks:
    move the shorter line
```

## Sliding 

## Dynamic 

```
def dynamic(n):

    if base case:
        return  

    if n not in memo:
        memo[n] = recurrence relation 
    
    return memo[n]


```

Fibonacci

```
def fib(n):
    if n < 2:
        return n
    if n not in memo.keys():
        memo[n] = fib(n - 1) + fib(n - 2)
    return memo.get(n)
```

House Robber 

```
def rob(nums: List[int]) -> int:
    # max robbery, no adjacent homes
    if not nums:
        return 0

    dp = {}
    n = len(nums)

    def decide(i):
        if i < 2:
            return max(nums[: i + 1])

        if i not in dp:
            rob = decide(i - 2) + nums[i]
            skip = decide(i - 1)
            dp[i] = max(rob, skip)
            
        return dp[i]


    return decide(n - 1)


def rob_circular(nums: List[int]) -> int:

    return max of (0 to n-2) vs (1 to n-1) homes

def rob_tree(nums: List[int]) -> int:
    node.rob = node.val + left.skip + right.skip
    node.skip = max(left.rob, left.skip) + max(right.rob, right.skip)
```


## Greedy 


## Sort

## Subsets

```
subsets(nums):
  start with empty set 

  for num in nums:
    newseen = []
    for set in seen:
      add (set + num) to newseen

    merge newseen with seen
```

## Backtrack

```
backtrack(current, args):
    if done:
        add to results
        return 
    if go this way:
        backtrack(current + x, updated args)
    elif go that way:
        backtrack(current + y, updated args)
```


