from typing import List


def search(nums: List[int], target: int) -> int:
    low, high = 0, len(nums) - 1

    while low <= high:
        mid = low + (high - low) // 2
        if target == nums[mid]:
            return mid
        if nums[mid] < target:
            low = mid + 1
        else:
            high = mid - 1

    return -1


def test_search():
    nums = [4, 5, 6, 7, 0, 1, 2]
    target = 0
    assert search(nums, target) == 4
    target = 3
    assert search(nums, target) == -1
