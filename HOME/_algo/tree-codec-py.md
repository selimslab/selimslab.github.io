---
tags: tree
---


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

