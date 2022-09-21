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

```
func plusOne(digits []int) []int {
  /*
  Given a non-empty array of digits representing a non-negative integer, plus one to the integer.
  The digits are stored such that the most significant digit is at the head of the list, and each element in the array contain a single digit.
  You may assume the integer does not contain any leading zero, except the number 0 itself.
  Example 1:
  Input: [1,2,3]
  Output: [1,2,4]
  Explanation: The array represents the integer 123.
  Example 2:
  Input: [4,3,2,1]
  Output: [4,3,2,2]
  Explanation: The array represents the integer 4321.
  */
    for i:= len(digits)-1; i>=0; i-- {
        if digits[i]<9{
            digits[i]++
            return digits
        }
        digits[i] = 0
    }
    
    //  cases like 100..   
    newDigits := make([]int, len(digits)+1)
    newDigits[0] = 1
    return newDigits   
}
```

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

def longestValidParentheses(self, s: str) -> int:
    maxlen = 0

    l = r = 0

    for c in s:
        if c == "(":
            l += 1
        else:
            r += 1

        if l == r:
            maxlen = max(maxlen, 2 * l)
        elif r > l:
            l = r = 0

    l = r = 0

    for c in reversed(s):
        if c == ")":
            l += 1
        else:
            r += 1

        if l == r:
            maxlen = max(maxlen, 2 * l)
        elif r > l:
            l = r = 0

    return maxlen


assert longestValidParentheses("()()())") == 4
assert longestValidParentheses("(()") == 2



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

```
/*
Given a positive integer n, 
find the least number of perfect square numbers which sum to n.
(for example, 1, 4, 9, 16, ...)

Example 1:

Input: n = 12
Output: 3 
Explanation: 12 = 4 + 4 + 4.


Example 2:

Input: n = 13
Output: 2
Explanation: 13 = 4 + 9.
*/

func numSquares(n int) int {
    var perfect_squares []int
    for i:= 1; i*i<=n; i++{
        if i*i == n{
            return 1
        }
        perfect_squares = append(perfect_squares, i*i)
    }
    
    ans := 0 
    queue := []int{n}
    
    for len(queue) != 0  {
        /*
        ans 1, queue is [12] 
        ans 2, the paths are 1,4,9 -> queue becomes [11 8 3], 
        following the paths 1,4,9, the new level becomes [10 7 2 7 4 2]
        ans = 3, it returns at 4, the shortest path to 0 turns out to be 12 -> 8 -> 4 -> 0 
        */
        ans += 1
        var next_level []int
        for _, num := range(queue){
            for _, perf := range(perfect_squares){
                if num == perf{
                    return ans
                }
                if num<perf{
                    break
                }
                next_level = append(next_level, num-perf)
            } 
            
        }
        queue = next_level 
    }
    return ans 
}
```


## Heap  


## Linked List

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


"""
Detect a cycle in a linked list. Note that the head pointer may be 'None' if the list is empty.
A Node is defined as: 
 
class Node(object):
  def __init__(self, data = None, next_node = None):
      self.data = data
      self.next = next_node
"""


def has_cycle(head):
    if not head:
        return False
    slow, fast = head, head.next
    
    while slow != fast:
        if fast is None or fast.next is None:
            return False
        slow = slow.next
        fast = fast.next.next
    
    return True

def getIntersectionNode(self, headA: ListNode, headB: ListNode) -> ListNode:
    p1, p2 = headA, headB

    while p1 or p2:
        if p1 is p2:
            return p1 
        p1 = headB if not p1 else p1.next
        p2 = headA if not p2 else p2.next


"""
Input:  1->2->6->3->4->5->6, val = 6
Output: 1->2->3->4->5
"""

def removeElements(self, head: ListNode, val: int) -> ListNode:
    
    head, head.next = ListNode(0), head
    p = head
    
    while p.next:
        if p.next.val == val:
            p.next = p.next.next
        else:
            p = p.next
            
    return head.next
```

```
/*
Given linked list: 1->2->3->4->5, and n = 2.
After removing the second node from the end, the linked list becomes 1->2->3->5.
*/

public ListNode removeNthFromEnd(ListNode head, int n) {
    ListNode dummy = new ListNode(0);
    dummy.next = head;
    ListNode first = dummy;
    ListNode second = dummy;
    // Advances first pointer so that the gap between first and second is n nodes apart
    for (int i = 1; i <= n + 1; i++) {
        first = first.next;
    }
    // Move first to the end, maintaining the gap
    while (first != null) {
        first = first.next;
        second = second.next;
    }
    second.next = second.next.next;
    return dummy.next;
}

/*
Input:
[
  1->4->5,
  1->3->4,
  2->6
]
Output: 1->1->2->3->4->4->5->6
*/

public ListNode mergeKLists(ListNode[] lists) {
    List<Integer> l = new ArrayList<Integer>();
   
    for (ListNode ln : lists) {
        while (ln != null) {
            l.add(ln.val);
            ln = ln.next;
        }
    }
   
    Collections.sort(l);
 
    ListNode head = new ListNode(0);
    ListNode h = head;
    for (int i : l) {
        ListNode t = new ListNode(i);
        h.next = t;
        h = h.next;
    }
    h.next = null;
    return head.next;
}

```