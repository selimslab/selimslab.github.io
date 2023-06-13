---
tags: ptr
layout: code
---

```go

func threeSum(nums []int) [][]int {
    // Sort the array
    sort.Ints(nums)
    var res [][]int
    // Loop through the array
    for i := 0; i < len(nums)-2; i++ {
        // Skip duplicates
        if i > 0 && nums[i] == nums[i-1] {
            continue
        }
        // Set left and right pointers
        l, r := i+1, len(nums)-1
        // Loop through the array
        for l < r {
            // Calculate sum of three numbers
            sum := nums[i] + nums[l] + nums[r]
            if sum < 0 {
                l++
            } else if sum > 0 {
                r--
            } else {
                // Add triplet to result slice
                res = append(res, []int{nums[i], nums[l], nums[r]})
                // Skip duplicates
                for l < r && nums[l] == nums[l+1] {
                    l++
                }
                for l < r && nums[r] == nums[r-1] {
                    r--
                }
                // Move pointers
                l++
                r--
            }
        }
    }
    return res
}

```