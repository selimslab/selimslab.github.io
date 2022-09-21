---
layout: post
title: Tree Traversals
---


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