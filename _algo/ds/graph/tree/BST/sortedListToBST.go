/**
 * Definition for singly-linked list.
 * type ListNode struct {
 *     Val int
 *     Next *ListNode
 * }
 */
/**
 * Definition for a binary tree node.
 * type TreeNode struct {
 *     Val int
 *     Left *TreeNode
 *     Right *TreeNode
 * }
 */
func sortedListToBST(head *ListNode) *TreeNode {
    if head == nil{
        return nil 
    }
    if head.Next == nil{
        return &TreeNode{head.Val, nil,nil}
    }

    pre, mid, fast := head, head, head 

    for fast != nil && fast.Next != nil{
        pre, mid, fast = mid, mid.Next, fast.Next.Next
    }
    pre.Next = nil 
    
    return &TreeNode{mid.Val, sortedListToBST(head), sortedListToBST(mid.Next)}

}
