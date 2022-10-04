---
tags: 
    - algorithms
---


```go
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

```python
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
```

```python
def getIntersectionNode(self, headA: ListNode, headB: ListNode) -> ListNode:
    p1, p2 = headA, headB

    while p1 or p2:
        if p1 is p2:
            return p1 
        p1 = headB if not p1 else p1.next
        p2 = headA if not p2 else p2.next
```

```py
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

```java
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
```

```python
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

[[algorithms]]
