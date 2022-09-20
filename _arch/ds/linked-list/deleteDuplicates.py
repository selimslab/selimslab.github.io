def deleteDuplicates(self, head: ListNode) -> ListNode:
    """
    Given a sorted linked list, delete all duplicates such that each element appear only once.
    Example 1:
    Input: 1->1->2
    Output: 1->2

    Example 2:
    Input: 1->1->2->3->3
    Output: 1->2->3
    """
    cur = head

    while cur and cur.next:
        if cur.val == cur.next.val:
            cur.next = cur.next.next
        else:
            cur = cur.next
    return head
