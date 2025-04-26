---


---


```py
"""
Three sum 

find 3 integers summing closest to a target, 

return their sum 

Input: nums = [-1,2,1,-4], target = 1
Output: 2
Explanation: The sum that is closest to the target is 2
(-1 + 2 + 1 = 2).
"""

def threeSumClosest(self, nums: list[int], target: int) -> int:
    """
    two pointers on sorted list 

    for each num:
        start left and right pointers at 0 and n-1 

        if left + right + num is target return 
        if the sum is closer, update the result 

        if less then sum, move left, else move right 
    """
    
    n = len(nums)
    
    nums.sort()

    res = None
    
    resdif = float("inf")
    

    for i,num in enumerate(nums):
        # skip dups 
        if i>0 and num==nums[i-1]: 
            continue

        l = i+1
        r = n-1
        
        while l<r:
            tsum = num + nums[l] + nums[r] 
            if tsum == target:
                return target 

            diff = abs(tsum-target)
            if diff < resdif:
                res = tsum
                resdif = diff 
                
            if tsum < target:
                l += 1
            else:
                r -= 1

    return res 
```