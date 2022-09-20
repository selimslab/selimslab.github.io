def rob(nums: List[int]) -> int:
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
