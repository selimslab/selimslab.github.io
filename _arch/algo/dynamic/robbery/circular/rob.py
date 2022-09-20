def rob_circular(self, nums: List[int]) -> int:
    def rob_linear(nums):
        if not nums:
            return 0

        prev1 = prev2 = 0

        for num in nums:
            prev1, prev2 = max(prev2 + num, prev1), prev1

        return prev1

    n = len(nums)
    if n == 0:
        return 0
    if n == 1:
        return nums[0]

    return max(rob_linear(nums[: n - 1]), rob_linear(nums[1:n]))
