"""
Input:  1->2->6->3->4->5->6, val = 6
Output: 1->2->3->4->5
"""


def removeElements(head: ListNode, val: int) -> ListNode:

    head, head.next = ListNode(0), head
    p = head

    while p.next:
        if p.next.val == val:
            p.next = p.next.next
        else:
            p = p.next

    return head.next
