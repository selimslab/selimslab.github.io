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

```
def check_brackets(test_iterable):
    if len(test_iterable) % 2 != 0:
        return False

    pairs = {"{": "}", "[": "]", "(": ")"}
    s = []

    for bracket in test_iterable:
        if bracket in pairs:
            s.append(bracket)
        elif s and bracket == pairs[s.pop()]:
            continue
        else:
            return False

    return not s
```

```
/*
Input: ")()())"
Output: 4
Explanation: The longest valid parentheses substring is "()()"
*/

// stack, linear time and space 
public int longestValidParentheses(String s) {
    int maxans = 0;
    Stack<Integer> stack = new Stack<>();
    stack.push(-1);
    for (int i = 0; i < s.length(); i++) {
        if (s.charAt(i) == '(') {
            stack.push(i);
        } else {
            stack.pop();
            if (stack.empty()) {
                stack.push(i);
            } else {
                maxans = Math.max(maxans, i - stack.peek());
            }
        }
    }
    return maxans;
}
```



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

<script src="https://gist.github.com/selimslab/ec31bd954c63e08f54ae23d869f2952a.js"></script>