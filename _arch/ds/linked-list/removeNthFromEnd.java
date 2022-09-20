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

    // remove nth from end 
    second.next = second.next.next;
    
    return dummy.next;

}