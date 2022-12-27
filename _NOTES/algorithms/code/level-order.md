---
tags: tree
layout: code
---

```python
def levelOrder(self, root: "TreeNode") -> "List[List[int]]":
    levelorder = list()

    current_level = [root]

    while root and current_level:
        next_level = list()
        current_vals = list()

        for node in current_level:
            current_vals.append(node.val)

            if node.left:
                next_level.append(node.left)

            if node.right:
                next_level.append(node.right)

        levelorder.append(current_vals)
        current_level = next_level

    return levelorder
```

