"""
find all unique combinations in candidates where the candidate numbers sums to target.
Input: candidates = [2,3,6,7], target = 7,
A solution set is:
[
  [7],
  [2,2,3]
]
Input: candidates = [2,3,5], target = 8,
A solution set is:
[
  [2,2,2,2],
  [2,3,3],
  [3,5]
]
"""


def combinationSum(self, candidates: List[int], target: int) -> List[List[int]]:
    def backtrack(target, current_combination, start_index):
        if target == 0:
            res.append(current_combination)  # found a valid combination

        for i, val in enumerate(candidates[start_index:]):
            if val > target:
                break  # dead end

            backtrack(target - val, current_combination + [val], start_index + i)

    res = []
    candidates.sort()
    backtrack(target, [], 0)

    return res
