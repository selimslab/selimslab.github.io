---
layout: tag
tags: heap algo
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

```go
package main

import (
    "fmt"
    "sort"
)

type KthLargest struct {
    k   int
    pool []int
}

func NewKthLargest(k int, nums ...int) *KthLargest {
    return &KthLargest{
        k:   k,
        pool: make([]int, 0, k),
    }
}

func (kl *KthLargest) Add(val int) int {
    if len(kl.pool) < kl.k {
        heap.Push(&kl.pool, val)
    } else {
        if val > kl.pool[0] {
            heap.Replace(&kl.pool, val)
        }
    }
    return kl.pool[0]
}

func (kl *KthLargest) Len() int {
    return len(kl.pool)
}

func main() {
    kl := NewKthLargest(3, 4, 5, 8, 2)
    fmt.Println(kl.Add(3)) // prints 4
    fmt.Println(kl.Add(5)) // prints 5
    fmt.Println(kl.Add(10)) // prints 5
    fmt.Println(kl.Add(9)) // prints 8
    fmt.Println(kl.Add(4)) // prints 8
}
```