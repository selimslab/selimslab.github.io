---
tags: tree
---


```go
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