---
---


Pick the optimal move at each step

---

THE CLASSROOM SCHEDULING PROBLEM

Suppose you have a classroom and want to hold as many classes here as possible. You get a list of classes. Yet some classes overlap.

Sounds like a hard problem, right? Actually, the algorithm is so easy, it might surprise you. Here’s how it works:

1. Pick the class that ends the soonest. This is the first class you’ll hold in this classroom.
2. Now, you have to pick a class that starts after the first class. Again, pick the class that ends the soonest. This is the second class you’ll hold.

---


```python
"""
Input: [ [1,4],[4,5] ]
Output: [ [1,5] ]
Explanation: Intervals [1,4] and [4,5] are considered overlapping.
"""

def mergeIntervals(self, intervals):
    intervals.sort(key=lambda x: x.start)

    merged = []
    for interval in intervals:
        # if the list of merged intervals is empty or if the current
        # interval does not overlap with the previous, simply append it.
        if not merged or merged[-1].end < interval.start:
            merged.append(interval)
        else:
            # otherwise, there is overlap, so we merge the current and previous
            # intervals.
            merged[-1].end = max(merged[-1].end, interval.end)

    return merged
```

```python
"""
Input: tasks = ["A","A","A","B","B","B"], n = 2
Output: 8
Explanation: 
A -> B -> idle -> A -> B -> idle -> A -> B
There is at least 2 units of time between any two same tasks.


Input: tasks = ["A","A","A","A","A","A","B","C","D","E","F","G"], n = 2
Output: 16
Explanation: 
One possible solution is
A -> B -> C -> A -> D -> E -> A -> F -> G -> A -> idle -> idle -> A -> idle -> idle -> A
"""
import collections 

def leastInterval(self, tasks: List[str], n: int) -> int:        

    # tasks = ["A","A","A","B","B","B"]
    # n = 2 

    counts = list(collections.Counter(tasks).values()) # [3,3]
    max_count = max(counts) # 3
    num_of_chars_with_max_count = counts.count(max_count) # 2, A and B

    num_of_chunks_with_idles = max_count-1 # 2  -> A  A  A

    # either a task will fill an empty place or the place stays idle, 
    # either way the chunk size stays the same  
    length_of_a_chunk_with_idle = n+1  # 3 -> A _ _ A _ _ A 

    # on the final chunk, there will only be most frequent letters 
    length_of_the_final_chunk = num_of_chars_with_max_count  # 2  

    length_of_all_chunks = (num_of_chunks_with_idles*length_of_a_chunk_with_idle) + length_of_the_final_chunk # 2*3 + 2 = 8 
    # -> A B _ A B _ A B 

    return max(len(tasks), length_of_all_chunks)

assert leastInterval(["A", "A", "A", "B", "B", "B"], 2) == 8
# A -> B -> idle -> A -> B -> idle -> A -> B
# There is at least 2 units of time between any two same tasks.

assert (
    leastInterval(["A", "A", "A", "A", "A", "A", "B", "C", "D", "E", "F", "G"], n=2)
    == 16
)
# One possible solution is
# A -> B -> C -> A -> D -> E -> A -> F -> G -> A -> idle -> idle -> A -> idle -> idle -> A

```