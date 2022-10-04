---
 
title: Array
---

[[count-primes]]

[[plus-one]]

[[group-anagrams]]



[[UniqueMorseRepresentations]]

[[array-rotate]]

[[longestConsecutive]]

[[three-sum]]


[[map-reduce-js]]



```py
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

assert dominant_index([3, 6, 1, 0]) == 1
```

```py
"""
Input: 5
Output:
[
     [1],
    [1,1],
   [1,2,1],
  [1,3,3,1],
 [1,4,6,4,1]
]
"""

def generate_pascals_triangle(self, numRows: int) -> List[List[int]]:
    pascal = list()

    for i in range(1,numRows+1):
        new_row = [1] * i
        pascal.append(new_row)
        for j in range(1,i-1):
            pascal[i-1][j] = pascal[i-2][j-1] + pascal[i-2][j]

    return pascal

assert generate_pascals_triangle(5) == [
    [1],
    [1, 1],
    [1, 2, 1],
    [1, 3, 3, 1],
    [1, 4, 6, 4, 1],
]
```

```py
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
```

```js
/*

Input: nums = [6,5,4,8]
Output: [2,1,0,3]

Input: nums = [7,7,7,7]
Output: [0,0,0,0]

*/
var smallerNumbersThanCurrent = function(nums) {
    const sorted = [...nums].sort((a, b) => a - b);
    return nums.map(num => sorted.indexOf(num));
};
```


