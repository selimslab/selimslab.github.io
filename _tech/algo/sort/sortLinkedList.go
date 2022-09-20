/**
 * Definition for singly-linked list.
 * type ListNode struct {
 *     Val int
 *     Next *ListNode
 * }
 */

import "sort"

func sortList(head *ListNode) *ListNode {
	vals := []int{}
	temp := head
	for temp != nil {
		vals = append(vals, temp.Val)
		temp = temp.Next
	}
	sort.Ints(vals)

	p := &ListNode{0, nil}
	t := p
	for _, val := range vals {
		p.Next = &ListNode{val, nil}
		p = p.Next
	}
	return t.Next
}