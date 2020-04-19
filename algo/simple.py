"""
Input: ["flower","flow","flight"]
Output: "fl"
"""


def longest_common_prefix(words) -> "str":
    if not words:
        return ""

    shortest_word = min(words, key=len)

    for i, letter in enumerate(shortest_word):
        for s in words:
            if s[i] != letter:
                return shortest_word[:i]

    return shortest_word


"""
Input: nums = [3, 6, 1, 0]
Output: 1
Explanation: 6 is the largest integer, and for every other number in the array x,
6 is more than twice as big as x.  The index of value 6 is 1, so we return 1.
"""


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


"""
Input: 
nums = [1, 7, 3, 6, 5, 6]
Output: 3
Explanation: 
The sum of the numbers to the left of index 3 (nums[3] = 6) is equal to the sum of numbers to the right of index 3.
Also, 3 is the first index where this occurs.
"""


def pivot_index(self, nums) -> int:
    n = len(nums)

    total = sum(nums)
    left = 0
    right = total

    for i in range(n):
        right -= nums[i]
        if right == left:
            return i
        left += nums[i]

    return -1


"""

"""


def string_compression(string):
    counter = 0
    compressed = ""
    previous_letter = string[0]

    for letter in string:
        if letter != previous_letter:
            compressed = compressed + previous_letter + str(counter)
            counter = 0
        counter += 1
        previous_letter = letter

    compressed = compressed + previous_letter + str(counter)

    return compressed


def test_string_comp():
    return string_compression("aaaabbcccccaaabb") == "a4b2c5a3b2"


"""
"""
def check_brackets(test_iterable):
    if len(test_iterable) % 2 != 0:
        return False

    pairs = {"{": "}", "[": "]", "(": ")"}
    s = []

    for bracket in test_iterable:
        if bracket in pairs:
            s.append(bracket)
        elif s and bracket == pairs[s.pop()]:
            continue
        else:
            return False

    return not s