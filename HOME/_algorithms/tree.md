---
layout: post
title: Tree 
---

```
def tree():
    return collections.defaultdict(tree)
```


```go
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


```python
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

```python
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


```python
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

```go
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

```

```python

"""
Invert a binary tree.
Example:
Input:
     4
   /   \
  2     7
 / \   / \
1   3 6   9
Output:
     4
   /   \
  7     2
 / \   / \
9   6 3   1
'''

# Definition for a binary tree node.
# class TreeNode:
#     def __init__(self, x):
#         self.val = x
#         self.left = None
#         self.right = None

  def invertTree(self, root):
      """
      :type root: TreeNode
      :rtype: TreeNode
      """
      if not root:
          return None

      right = self.invertTree(root.right)
      left = self.invertTree(root.left)

      root.right = left
      root.left = right

      return root

```


```java

/*
    1
   / \
  2   2
 / \ / \
3  4 4  3
*/
public boolean isSymmetric(TreeNode root) {
    return isMirror(root, root);
}

public boolean isMirror(TreeNode t1, TreeNode t2) {
    if (t1 == null && t2 == null) return true;
    if (t1 == null || t2 == null) return false;
    return (t1.val == t2.val)
        && isMirror(t1.right, t2.left)
        && isMirror(t1.left, t2.right);
}

```
```cpp

/**
 * Definition for a binary tree node.
 * struct TreeNode {
 *     int val;
 *     TreeNode *left;
 *     TreeNode *right;
 *     TreeNode(int x) : val(x), left(NULL), right(NULL) {}
 * };
 */
class Solution {
public:
    int maxDepth(TreeNode* root) {
        if(!root){
            return 0;
        }
        int left = maxDepth(root->left);
        int right = maxDepth(root->right);
        
        return max(left,right)+1;

    }
};

```
```python

# Definition for a binary tree node.
# class TreeNode:
#     def __init__(self, x):
#         self.val = x
#         self.left = None
#         self.right = None

"""
   3
   / \
  9  20
    /  \
   15   7
 
return : 3
"""

def maxDepth(self, root: 'TreeNode') -> 'int':
    if not root:
        return 0
    left = self.maxDepth(root.left)
    right =  self.maxDepth(root.right)

    return max(left,right)+1
```


```python
def maxPathSum(self, root: TreeNode) -> int:
    """
       1
      / \
     2   3

    Output: 6

    -10
    / \
    9  20
        /  \
    15   7

    Output: 42


    """
    max_sum = float("-inf")

    def walk(node):
        if not node:
            return 0

        left = max(0, walk(node.left))
        right = max(0, walk(node.right))

        max_sum = max(max_sum, node.val + left + right)

        return max(left, right) + node.val

    walk(root)

    return max_sum
```