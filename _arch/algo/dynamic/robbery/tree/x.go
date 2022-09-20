/**
 * Definition for a binary tree node.
 * type TreeNode struct {
 *     Val int
 *     Left *TreeNode
 *     Right *TreeNode
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


 func rob(root *TreeNode) int {
    if root == nil{
        return 0
    }
    pair := robTree(root)
    return pair.max()
}


func robTree(node *TreeNode) Pair {
    if node == nil{
        return Pair{}
    }
    
    left := robTree(node.Left)
    right := robTree(node.Right)
    
    p := Pair{}
    p.now = node.Val + left.later + right.later
    p.later = left.max() + right.max()
    
    return p 
}

func max(a int, b int) int{
    if a > b {
        return a
    }
    return b 
}

type Pair struct {
    now int
    later int
}

func (p *Pair) max() int{
    return max(p.now, p.later)
}