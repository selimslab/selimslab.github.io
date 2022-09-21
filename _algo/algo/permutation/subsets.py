"""
Input: nums = [1,2,3]
Output:
[
  [3],
  [1],
  [2],
  [1,2,3],
  [1,3],
  [2,3],
  [1,2],
  []
]
"""


def subsets(self, nums: List[int]) -> List[List[int]]:
    ans = [[]]

    for num in nums:
        ans += [l + [num] for l in ans]

    return ans

