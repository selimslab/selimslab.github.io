---
layout: post
title: Algorithms, Data Structures
---



## String 


## Array 


## Stack 


## Queue 


## Heap  


## Linked List

### Sort 

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

