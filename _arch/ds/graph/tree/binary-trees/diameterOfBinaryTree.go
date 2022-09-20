/**
 * Definition for a binary tree node.
 * type TreeNode struct {
 *     Val int
 *     Left *TreeNode
 *     Right *TreeNode
 * }
 */
func max(a, b int) int {
    if a < b {
        return b
    }
    return a
}

func diameterOfBinaryTree(root *TreeNode) int {
    dia := 0
    
    var walk func(root *TreeNode) int

    walk = func(root *TreeNode) int {
        if root == nil{
            return 0 
        }
        
        var left = walk(root.Left)
        
        var right = walk(root.Right)
                
        dia = max(dia, left+right)

        return max(left,right) + 1
  
    }
    
    walk(root)
    
    return dia 
    
}