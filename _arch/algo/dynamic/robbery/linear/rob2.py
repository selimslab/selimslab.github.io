def rob(self, nums: List[int]) -> int:
    if not nums:
        return 0

    prev1 = prev2 = 0

    for num in nums:
        prev1, prev2 = max(prev2 + num, prev1), prev1

    return prev1
