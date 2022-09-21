---
layout: post
title: Array
---


```
def countPrimes(self, n: int) -> int:
    """
    Mark non-primes, 
    2s, 3s, 
    """
    primes = [True] * n
    
    for i in range(2, int(sqrt(n))+1):
        if primes[i] is False: 
            continue 
        for j in range(i*i, n, i):
            primes[j] = False
            
    return sum(1 if primes[i] else 0 for i in range(2,n))
```

```
func plusOne(digits []int) []int {
  /*
  Given a non-empty array of digits representing a non-negative integer, plus one to the integer.
  The digits are stored such that the most significant digit is at the head of the list, and each element in the array contain a single digit.
  You may assume the integer does not contain any leading zero, except the number 0 itself.
  Example 1:
  Input: [1,2,3]
  Output: [1,2,4]
  Explanation: The array represents the integer 123.
  Example 2:
  Input: [4,3,2,1]
  Output: [4,3,2,2]
  Explanation: The array represents the integer 4321.
  */
    for i:= len(digits)-1; i>=0; i-- {
        if digits[i]<9{
            digits[i]++
            return digits
        }
        digits[i] = 0
    }
    
    //  cases like 100..   
    newDigits := make([]int, len(digits)+1)
    newDigits[0] = 1
    return newDigits   
}
```


```
"""
Input: ["eat", "tea", "tan", "ate", "nat", "bat"],
Output:
[
  ["ate","eat","tea"],
  ["nat","tan"],
  ["bat"]
]
"""
def groupAnagrams(self, strs: List[str]) -> List[List[str]]:
    ans = collections.defaultdict(list)
    for s in strs:
        count = [0]*26
        for c in s:
            count[ord(c)-ord("a")] +=1

        ans[tuple(count)].append(s)

    return ans.values()
```

```
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

```
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

```
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

```
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

```
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

```
// UniqueMorseRepresentations returns number of possible morse codes
func UniqueMorseRepresentations(words []string) int {
    morse := []string{".-","-...","-.-.","-..",".","..-.",
              "--.","....","..",".---","-.-",".-..","--","-.","---",
              ".--.","--.-",".-.","...","-","..-","...-",".--","-..-","-.--",
              "--.."}
    tf := make(map[string]bool)
    
    for _, word := range words {
        rep := ""
        for _, r := range word {
            c := rune(r)
            i := int(c)-97 // 97 is ascii for a
            rep +=  morse[i]
        }
        tf[rep] = true
    }
    return len(tf)
}
```

```
# dedup 
l = [1, 2, 2, 3, 3, 3, 4, 4, 5]
assert list(dict.fromkeys(l)) == [1, 2, 3, 4, 5]
```

```
/*
left rotate a size n array by d  

5 4
1 2 3 4 5

5 1 2 3 4

*/

import java.io.*;
import java.util.*;
import java.math.*;


public class LeftRotation {
    public static void main(String[] args) {
        Scanner scan = new Scanner(System.in);
        int n = scan.nextInt();
        int d = scan.nextInt();
        int[] array = new int[n];
        for(int i=0; i<n;i++) {
            array[(i+n-d)%n] = scan.nextInt();
        }
        for(int i=0; i<n;i++) {
            System.out.print(array[i] + " ");
        }      
    }
}
```

```
def longestConsecutive(nums: List[int]) -> int:
    numset = set(nums)
    ans = 0

    def streak(num):
        streak = 1

        while num + 1 in numset:
            streak += 1
            num += 1

        return streak

    for num in nums:
        if num - 1 in numset:
            continue
        ans = max(ans, streak(num))

    return ans


assert longestConsecutive([100, 4, 200, 1, 3, 2]) == 4  # 1,2,3,4
```

```
class Solution {
public:
    void rotate(vector<vector<int>>& matrix) {
        reverse(matrix.begin(), matrix.end());
        for (int i = 0; i < matrix.size(); i++) {
            for (int j = i + 1; j < matrix[i].size(); j++){
                swap(matrix[i][j], matrix[j][i]);
            }
        }
        
    }
};
```