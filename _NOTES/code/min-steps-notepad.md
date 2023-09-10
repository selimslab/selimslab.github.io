---

tags: dp
---



## Min steps notepad 

```go
/*
Initially on a notepad only one character 'A' is present. 

You can perform two operations on this notepad for each step:

Copy All: You can copy all the characters present on the notepad (partial copy is not allowed).

Paste: You can paste the characters which are copied last time.
 
Given a number n. You have to get exactly n 'A' on the notepad 
by performing the minimum number of steps permitted. 

Output the minimum number of steps to get n 'A'.

Example:
Input: 3
Output: 3

Explanation:
Intitally, we have one character 'A'.
In step 1, we use Copy All operation.
In step 2, we use Paste operation to get 'AA'.
In step 3, we use Paste operation to get 'AAA'.
*/

func minSteps(n int) int {
    dp := make(map[int]int)
    // the key insight is that it is always better to multiply
    for i := 2; i<=n; i++ {
        dp[i] = i
        // find the biggest factor of i
        // then just copy it and paste it (i/j)-1 times 
        for j:= i/2; j>1; j-- {
            if i%j == 0 {
                dp[i] = dp[j] + i/j // 1 copy + (i/j)-1 paste
                break // we don't need a smaller factor 
            }
        }
    }
    return dp[n]
}
```


