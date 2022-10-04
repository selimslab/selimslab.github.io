---
tags: 
    - algorithms
---


```python
import heapq


class KthLargest:
    """
    find the kth largest element in a stream.
    in the sorted order, not the kth distinct element.
    """

    def __init__(self, k: int, nums: List[int]):
        self.pool = nums
        self.k = k
        heapq.heapify(self.pool)
        while len(self.pool) > k:
            heapq.heappop(self.pool)

    def add(self, val: int) -> int:
        if len(self.pool) < self.k:
            heapq.heappush(self.pool, val)
        elif val > self.pool[0]:
            heapq.heapreplace(self.pool, val)
        return self.pool[0]


KthLargest(3, [4, 5, 8, 2])
kthLargest.add(3)  # returns 4
kthLargest.add(5)  # returns 5
kthLargest.add(10)  # returns 5
kthLargest.add(9)  # returns 8
kthLargest.add(4)  # returns 8
```


