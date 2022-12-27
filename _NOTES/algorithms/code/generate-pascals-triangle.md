---
tags: arr  
layout: code

---


```py
"""
Input: 5
Output:
[
     [1],
    [1,1],
   [1,2,1],
  [1,3,3,1],
 [1,4,6,4,1]
]
"""

def generate_pascals_triangle(self, numRows: int) -> List[List[int]]:
    pascal = list()

    for i in range(1,numRows+1):
        new_row = [1] * i
        pascal.append(new_row)
        for j in range(1,i-1):
            pascal[i-1][j] = pascal[i-2][j-1] + pascal[i-2][j]

    return pascal

assert generate_pascals_triangle(5) == [
    [1],
    [1, 1],
    [1, 2, 1],
    [1, 3, 3, 1],
    [1, 4, 6, 4, 1],
]
```
