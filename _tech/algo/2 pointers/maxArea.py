"""
Input: height = [1,8,6,2,5,4,8,3,7]
Output: 49

Explanation: The above vertical lines are represented by array [1,8,6,2,5,4,8,3,7]. 
In this case, the max area of water (blue section) the container can contain is 49.

image https://s3-lc-upload.s3.amazonaws.com/uploads/2018/07/17/question_11.jpg
"""


def area(l, r):
    h = min(height[l], height[r])
    w = r - l
    return h * w


def maxArea(self, height: List[int]) -> int:
    l = 0
    r = len(height) - 1
    max_area = 0

    while l < r:
        max_area = max(max_area, area(l, r))

        # move the shorter line
        if height[l] < height[r]:
            l += 1
        else:
            r -= 1

    return max_area
