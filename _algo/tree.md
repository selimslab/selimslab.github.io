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


```
class Codec:

    def serialize(self, root):
        """Encodes a tree to a single string.
        
        :type root: TreeNode
        :rtype: str
        """
        def preorder(root):
            vals = list()
            def go(node):
                if node:
                    vals.append(str(node.val))
                    go(node.left)
                    go(node.right)
                else:
                    vals.append("#")
            
            go(root)
            return vals
        
        vals = preorder(root)
        return " ".join(vals)      
                
    def deserialize(self, data):
        """Decodes your encoded data to tree.
        
        :type data: str
        :rtype: TreeNode
        """
                
        def construct():
            val = next(vals)
            if val == "#":
                return None
            node = TreeNode(int(val))
            node.left= construct()
            node.right= construct()
            
            return node

        vals = iter(data.split())
        root = construct()
        
        return root
```

```
class Trie:
    """ or prefix tree """
    def __init__(self):
        """
        a child of a Trie is a Trie        
        """
        self.trie = {}
        
    def insert(self, word: str) -> None:
        """
        Inserts a word into the trie.
        """
        t = self.trie
        for letter in word:
            if letter not in t:
                t[letter] = {}
            t = t[letter]
        t["#"] = "#"  

    def search(self, word: str) -> bool:
        """
        Returns if the word is in the trie.
        """
        return self.startsWith(word + '#')
        

    def startsWith(self, prefix: str) -> bool:
        """
        Returns if there is any word in the trie that starts with the given prefix.
        """
        t = self.trie 
        for letter in prefix:
            if letter not in t:
                return False
            t = t[letter]
        return True

def test_trie():
  trie = Trie()
  trie.insert("apple")
  assert trie.search("apple") is True
  assert trie.search("app") is False
  assert trie.startsWith("app") is True
  trie.insert("app")
  assert trie.search("app") is True
```


```
"""
root = [5,3,6,2,4,null,7]
key = 3
    5
   / \
  3   6
 / \   \
2   4   7
Given key to delete is 3. So we find the node with value 3 and delete it.
One valid answer is [5,4,6,2,null,null,7], shown in the following BST.
    5
   / \
  4   6
 /     \
2       7
Another valid answer is [5,2,6,null,4,null,7].
    5
   / \
  2   6
   \   \
    4   7
"""
    
def deleteNode(self, root, key):

    if not root:
        return

    if key > root.val:
        root.right = self.deleteNode(root.right, key)

    elif key < root.val:
        root.left = self.deleteNode(root.left, key)

    # now the key is the root of a subtree
    else:
        # if the subtree does not have a left child, we just return its right child
        # to its father, and they will be connected on the higher level recursion.
        if not root.left:
            return root.right

        # if it has a left child, we want to find the max val on the left subtree to 
        # replace the node we want to delete.
        else:
            # try to find the max value on the left subtree
            tmp = root.left
            while tmp.right:
                tmp = tmp.right

            root.val = tmp.val
   
                root.left = self.deleteNode(root.left, tmp.val)
        
        return root
```


<script src="https://gist.github.com/selimslab/7e5db0cbd495c661ceb1c11cbcb0f137.js"></script>