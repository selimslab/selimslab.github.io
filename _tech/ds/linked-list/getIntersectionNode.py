def getIntersectionNode(headA: ListNode, headB: ListNode) -> ListNode:
    p1, p2 = headA, headB
    while p1 or p2:
        if p1 is p2:
            return p1
        p1 = headB if not p1 else p1.next
        p2 = headA if not p2 else p2.next
