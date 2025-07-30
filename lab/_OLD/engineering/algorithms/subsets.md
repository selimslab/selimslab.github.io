---
---

```py

def subsetsWithDup(nums: list[int]) -> list[list[int]]:
	"""
	Return all possible subsets without duplicates 
	
	Input: nums = [1,2,1]

	Output: [[],[1],[1,2],[1,1],[1,2,1],[2]]
	
	Input: nums = [7,7]
	
	Output: [[],[7], [7,7]]
	"""
	nums.sort()
	subs = { () }
	for num in nums:
		news = set()
		for sub in subs:
			news.add(sub + (num,))
		subs = subs.union(news)

	return [list(s) for s in subs]
```