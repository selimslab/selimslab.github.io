---
---



```go
/*
left rotate a size n array by d  

5 4
1 2 3 4 5

5 1 2 3 4

*/

package main

import "fmt"

func reverse(nums []int) {
    for i, j := 0, len(nums)-1; i < j; i, j = i+1, j-1 {
        nums[i], nums[j] = nums[j], nums[i]
    }
}

func leftRotateBySwapping(arr []int, d int) []int {
	n := len(arr)
	d %= n // Handle cases where d is greater than n

	// Reverse the first part of the array (0 to d-1)
	reverse(arr[:d])

	// Reverse the second part of the array (d to n-1)
	reverse(arr[d:])

	// Reverse the entire array to obtain the final rotated array
	reverse(arr)

	return arr
}

func leftRotateDirect(arr []int, d int) []int {
	n := len(arr)
	result := make([]int, n)

	for i := 0; i < n; i++ {
		// Calculate the new index after left rotation 
		and store the element in the result slice
		result[(i+n-d)%n] = arr[i]
	}

	return result
}

func main() {
	// Example usage of the leftRotateBySwapping function
	array := []int{1, 2, 3, 4, 5}
	d := 2
	rotatedArray := leftRotateBySwapping(array, d)

	fmt.Println(rotatedArray) // Print the rotated array
}

```
