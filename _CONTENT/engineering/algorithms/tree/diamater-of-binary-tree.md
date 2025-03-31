---

---


```go

func diameterOfBinaryTree(root *TreeNode) int {
    dia := 0
    
    var walk func(root *TreeNode) int

    walk = func(root *TreeNode) int {
        if root == nil{
            return 0 
        }
        
        var leftDepth = walk(root.Left)
        
        var rightDepth = walk(root.Right)
                
        maxDia = max(dia, leftDepth+rightDepth)

        return max(leftDepth,rightDepth) + 1
  
    }
    
    walk(root)
    
    return maxDia 
    
}

```