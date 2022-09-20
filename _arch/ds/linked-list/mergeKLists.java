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
    // create an array, sort it, create new ListNodes 

    // linked list to array 
    List<Integer> l = new ArrayList<Integer>();

    for (ListNode ln : lists) {
        while (ln != null) {
            l.add(ln.val);
            ln = ln.next;
        }
    }

    // sort 
    Collections.sort(l);

    // create new linked list 
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