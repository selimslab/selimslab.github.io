---
---


```py
from collections import deque

def jump(nums: List[int]) -> int:
	n = len(nums)
	if n == 1:
		return 0

	q = deque([0])  
	jumps = {}

	while q:
		i = q.popleft()
		curj = jumps.get(i,0)
		maxj = nums[i] + i
		can_jump = maxj >= n-1
		if can_jump:
			return curj + 1
		else:
			for k in range(i+1, maxj+1):  
				q.append(k)  
				jumps[k] = min(jumps.get(k, float("inf")), curj + 1)
```