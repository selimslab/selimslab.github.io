from typing import List


def subsets(nums: List[int]) -> List[List[int]]:
    ans = [[]]

    for num in nums:
        newsets = []
        for s in ans:
            newsets.append(s + [num])
        
        ans += newsets

    return ans



def test_subsets():
    print(subsets([1,2,3,4]))

test_subsets()