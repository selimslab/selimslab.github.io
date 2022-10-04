---
tags: array
---


```java
/*
Given nums = [2, 7, 11, 15], target = 9,

Because nums[0] + nums[1] = 2 + 7 = 9,
return [0, 1].
*/

public int[] twoSum(int[] nums, int target) {
    Map<Integer, Integer> map = new HashMap<>();
    for (int i = 0; i < nums.length; i++) {
        int complement = target - nums[i];
        if (map.containsKey(complement)) {
            return new int[] { map.get(complement), i };
        }
        map.put(nums[i], i);
    }
    throw new IllegalArgumentException("No two sum solution");
}

assert new Solution().twoSum([2, 7, 11, 15], 9) == [0, 1]
```


```py
Given an integer array nums of length n and an integer target, find three integers in nums such that the sum is closest to target.

Return the sum of the three integers.

You may assume that each input would have exactly one solution.


Input: nums = [-1,2,1,-4], target = 1
Output: 2
Explanation: The sum that is closest to the target is 2. (-1 + 2 + 1 = 2).

def threeSumClosest(self, nums: List[int], target: int) -> int:
    
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

            total = num + nums[l] + nums[r] 

            if total == target:
                return target 
            
            # update diff 
            diff = abs(total-target)
            if diff < resdif:
                res = total
                resdif = diff 
                
            
            if total < target:
                l += 1
            else:
                r -= 1

    return res 
```