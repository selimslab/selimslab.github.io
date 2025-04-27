---

---


```go

/*
Input: nums = [1,3,-1,-3,5,3,6,7], k = 3
Output: [3,3,5,5,6,7]
Explanation: 
Window position                Max
---------------               -----
[1  3  -1] -3  5  3  6  7       3
 1 [3  -1  -3] 5  3  6  7       3
 1  3 [-1  -3  5] 3  6  7       5
 1  3  -1 [-3  5  3] 6  7       5
 1  3  -1  -3 [5  3  6] 7       6
 1  3  -1  -3  5 [3  6  7]      7
*/

func max(nums ...int) int {
    max := nums[0]
    for _, i := range nums {
        if i > max {
            max = i
        }
    }
    return max
}


func maxSlidingWindow2(nums []int, k int) []int {
    ans := []int{}    
    for i:=0; i<len(nums)-k+1;i++{
        ans = append(ans, max(nums[i:i+k]...))
    }
    return ans 
}


func maxSlidingWindow(nums []int, k int) []int {
	ans := []int{}
	q := make([]int, 0)

	for i := 0; i < len(nums); i++ {
		// if a queue element is less than the new number, pop it 
		for len(q) > 0 && nums[i] > q[len(q)-1] {
			q = q[:len(q)-1]
		}

		q = append(q, nums[i])

		index_to_exit := i-k+1 // this index will go out of window in the next iteration 
		if index_to_exit >= 0 {
		    ans = append(ans, q[0])
		    // If the greatest element in q is about to exit window, remove it from q
		    if nums[index_to_exit] == q[0] {
			q = q[1:]
		    }
		}
	}
	return ans
}
```