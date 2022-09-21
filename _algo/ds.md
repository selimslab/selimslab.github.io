---
layout: post
title: Data Structures
---



## String 

```
def reverseOnlyLetters(self, S: str) -> str:
    stack = [c for c in S if c.isalpha()]
    ans = [
        stack.pop() if c.isalpha() else c
        for c in S
    ]
    return "".join(ans)
```

## Array 


## Stack 


## Queue 


## Heap  


## Linked List

<https://leetcode.com/problems/sort-list/>

```
type ListNode struct {
    Val int
    Next *ListNode
}

import "sort"

func sortList(head *ListNode) *ListNode {
    vals := []int{}
    temp := head
    for temp != nil {
        vals = append(vals,temp.Val)
        temp = temp.Next
    }
    sort.Ints(vals)
    
    t := head
    for _, val := range(vals) {
        t.Val = val
        t = t.Next 
    }
    return head
}
```

