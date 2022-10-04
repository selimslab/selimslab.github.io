---
tags: dynamic
---


## maximalSquare

```py
"""
Given a 2D binary matrix filled with 0's and 1's, 
find the largest square containing only 1's and return its area.
1 0 1 0 0
1 0 1 1 1
1 1 1 1 1
1 0 0 1 0
Output: 4
"""


def maximalSquare(self, matrix: List[List[str]]) -> int:
    rows = len(matrix)
    if rows:
        cols = len(matrix[0])
    else:
        cols = 0

    dp = [0] * (cols + 1)
    maxsq = 0
    prev = 0

    for i in range(1, rows + 1):
        for j in range(1, cols + 1):
            temp = dp[j]
            if matrix[i - 1][j - 1] == "1":
                min_prev = min(dp[j - 1], prev)
                min_cur = min(min_prev, dp[j])
                dp[j] = min_cur + 1
                maxsq = max(maxsq, dp[j])
            else:
                dp[j] = 0

            prev = temp

    return maxsq * maxsq
```


