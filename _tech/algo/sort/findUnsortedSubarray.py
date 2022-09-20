def findUnsortedSubarray(nums) -> int:
    is_same = [a == b for a, b in zip(nums, sorted(nums))]
    if all(is_same):
        return 0
    else:
        first_index = is_same.index(False)
        last_index = len(nums) - is_same[::-1].index(False)
        return last_index - first_index


"""
[2, 6, 4, 8, 10, 9, 15]
[t,f,... f,t]
0,1, .. 5,6
false starts at index 1, ends at 5 
"""

assert findUnsortedSubarray([2, 6, 4, 8, 10, 9, 15]) == 5
