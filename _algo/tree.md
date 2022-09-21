---
layout: post
title: Tree 
---


## Traversals

```
inorder(root):

    walk(node):
        if node:
            walk(left)
            visit node 
            walk(right)

    walk(root)


inorder(root):
    # return left, root, right

    stack = []

    while stack or root:
        if root:
             add root to stack 
             go left

        else:
            get node from stack 
            visit node 
            go right 


preorder(root):
    # return root, left, right

    stack = []

    while stack or root:
        if root:
            add root to stack 
            visit node 
            go left 

        else:
            get node from stack 
            go right

postorder(root):
    # return left, right, root 
    # visit in reverse 

    stack = []

    while stack or root:
        if root:
            add root to stack 
             visit node 
             go right 

        else:
            get node from stack 
            go left

    return reverse visited



```

## Postorder 

```
import "fmt"


type Node struct {
    Val int
    Children []*Node
}

func reverse(numbers []int) {
	for i, j := 0, len(numbers)-1; i < j; i, j = i+1, j-1 {
		numbers[i], numbers[j] = numbers[j], numbers[i]
	}
}

func postorder(root *Node) []int {
    ans := []int{}
    stack := []*Node{} 
    for root != nil || len(stack) != 0 {
        if root != nil {
            ans = append(ans, root.Val)
            for _, node := range(root.Children){
                stack = append(stack, node)
            }
            root = nil 
        } else {
            n := len(stack)
            root = stack[n-1]
            stack = stack[:n-1]
        }
    }
    
    reverse(ans)
    
    return ans 
}
```



```
/**
 * Definition for TreeNode.
 * type TreeNode struct {
 *     Val int
 *     Left *ListNode
 *     Right *ListNode
 * }
 */
 func lowestCommonAncestor(root, p, q *TreeNode) *TreeNode {
     if root == nil || root == p || root == q {
         return root 
     }
     left := lowestCommonAncestor(root.Left,p,q)
     right := lowestCommonAncestor(root.Right,p,q)
     if left != nil && right != nil {
         return root 
     }
     if left != nil{
         return left 
     } else{
         return right 
     }
     
}
```

```
def sortedArrayToBST(self, nums: List[int]) -> TreeNode:
    """
    Given an array where elements are sorted in ascending order, convert it to a height balanced BST.
    For this problem, a height-balanced binary tree is defined as a binary tree in which the depth of the two subtrees of every node never differ by more than 1.
    Example:
    Given the sorted array: [-10,-3,0,5,9],
    One possible answer is: [0,-3,9,-10,null,5], which represents the following height balanced BST:
          0
         / \
       -3   9
       /   /
     -10  5
    """
    def go(left,right):
        if left>right:
            return None
        mid = (left+right) // 2
        root = TreeNode(nums[mid])
        root.left = go(left, mid-1)
        root.right = go(mid+1, right)
        return root

    return go(0, len(nums)-1)

def sortedListToBST(self, head: ListNode) -> TreeNode:
    """
  
    Given a singly linked list where elements are sorted in ascending order, convert it to a height balanced BST.
    For this problem, a height-balanced binary tree is defined as a binary tree in which the depth of the two subtrees of every node never differ by more than 1.
    Example:
    Given the sorted linked list: [-10,-3,0,5,9],
    One possible answer is: [0,-3,9,-10,null,5], which represents the following height balanced BST:
          0
         / \
       -3   9
       /   /
     -10  5
    """
    if not head:
        return None 
    if not head.next:
        return TreeNode(head.val)

    pre, slow, fast = None, head, head

    # when fast is at the end, slow will be at mid 
    while fast and fast.next:
        pre, slow, fast = slow, slow.next, fast.next.next
    if pre:
        # cut the parts from mid 
        pre.next = None


    root = TreeNode(slow.val)
    root.left = self.sortedListToBST(head)
    root.right = self.sortedListToBST(slow.next)

    return root 
```