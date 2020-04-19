from typing import List


def subsets(nums: List[int]) -> List[List[int]]:
    ans = [[]]

    for num in nums:
        news = [l + [num] for l in ans]
        ans += news

    return ans


def test_subsets():
    pass
