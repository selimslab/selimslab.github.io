---
---

**Detect cycle:** fast and slow pointers, if the fast finds the end then no cycle

**Sort:** find the middle with fast and slow pointers then merge 

**Get intersection:** iterate lists with two pointers, if one becomes null then set it to the head of the other list, This assumes there is an intersection. If not it will be an infinite loop so return after a few iterations. 

**Remove nth from end:** use two pointers, one is n steps ahead of the other. When the first pointer reaches the end, the second pointer will be at the nth from the end.

```python
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
def find_middle(head):
    if not head:
        return None

    slow = head
    fast = head

    while fast and fast.next:
        slow = slow.next
        fast = fast.next.next

    return slow
```

```python
def sorted_list_to_bst(head):
    if not head:
        return None

    # Find the middle element of the linked list
    middle = find_middle(head)

    # Create a TreeNode using the middle element
    root = TreeNode(middle.val)

    # If there's only one element in the list, return the root
    if middle == head:
        return root

    # Recursively construct the left and right subtrees
    root.left = sorted_list_to_bst(head)
    root.right = sorted_list_to_bst(middle.next)

    return root
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

