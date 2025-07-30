---
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
