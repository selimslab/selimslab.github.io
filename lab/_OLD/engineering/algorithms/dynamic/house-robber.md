---

---


```py
def rob(nums: List[int]) -> int:
    # max robbery, no adjacent homes
    if not nums:
        return 0

    dp = {}
    n = len(nums)

    def decide(i):
        if i < 2:
            return max(nums[: i + 1])

        if i not in dp:
            rob = decide(i - 2) + nums[i]
            skip = decide(i - 1)
            dp[i] = max(rob, skip)
            
        return dp[i]


    return decide(n - 1)

# since we use only last 2, it could be optimized to 
def rob():
    for num in nums:
        prev1, prev2 = max(prev2+num, prev1), prev1

def rob_circular(nums: List[int]) -> int:

    return max of (0 to n-2) vs (1 to n-1) homes

def rob_tree(nums: List[int]) -> int:
    node.rob = node.val + left.skip + right.skip
    node.skip = max(left.rob, left.skip) + max(right.rob, right.skip)
```

