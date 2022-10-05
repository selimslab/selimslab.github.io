---
tags: array
---

```py
def longestConsecutive(nums: List[int]) -> int:
    """
    for each num:
        if num-1 in set, continue
        check the streak 
    """
    numset = set(nums)
    ans = 0

    def streak(num):
        streak = 1

        while num + 1 in numset:
            streak += 1
            num += 1

        return streak

    for num in nums:
        if num - 1 in numset:
            continue
        ans = max(ans, streak(num))

    return ans


assert longestConsecutive([100, 4, 200, 1, 3, 2]) == 4  # 1,2,3,4
```

[[array]]
