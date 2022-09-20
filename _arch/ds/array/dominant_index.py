def dominant_index(nums) -> int:
    max_index = 0
    max_num = nums[0]

    for i, num in enumerate(nums):
        if num > max_num:
            max_index = i
            max_num = num

    for i, num in enumerate(nums):
        if max_num < 2 * num and i != max_index:
            return -1

    return max_index


assert dominant_index([3, 6, 1, 0]) == 1

"""
6 is the largest integer, 
and for every other number in the array x,
6 is more than twice as big as x.  

The index of value 6 is 1, so we return 1.
"""
