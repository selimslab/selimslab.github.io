---
title: Longest Common Subsequence
---


```
Example 1:

Input: text1 = "abcde", text2 = "ace" 
Output: 3  
Explanation: The longest common subsequence is "ace" and its length is 3.
Example 2:

Input: text1 = "abc", text2 = "abc"
Output: 3
Explanation: The longest common subsequence is "abc" and its length is 3.
Example 3:

Input: text1 = "abc", text2 = "def"
Output: 0
Explanation: There is no such common subsequence, so the result is 0.
 

Constraints:

1 <= text1.length, text2.length <= 1000
text1 and text2 consist of only lowercase English characters.
```


imagine looong strings 

abncsdgs.....fsfsd   vs asfdagfd....fasdfas

lets look at the last letters

if I knew the common length up until there, i could just add 1 if the last letters are the same or add 0 if different 

```go
func longestCommonSubsequence(word1, word2 string) int {
	return lcsHelper(word1, word2, len(word1), len(word2))
}

func lcsHelper(word1, word2 string, m, n int) int {
	// Base case: If either of the words is empty, LCS is 0.
	if m == 0 || n == 0 {
		return 0
	}

	// If the characters match, include them in the LCS.
	if word1[m-1] == word2[n-1] {
		return 1 + lcsHelper(word1, word2, m-1, n-1)
	}

	// If characters don't match, take the maximum LCS from the previous states.
	return max(lcsHelper(word1, word2, m-1, n), lcsHelper(word1, word2, m, n-1))
}

func max(a, b int) int {
	if a > b {
		return a
	}
	return b
}
```

here we can save some calls by remembering the result of a previous call 

for example look at the lcsHelper(word1, word2, m-1, n-1) call 

maybe it's called with the same args multiple times 

what if we save the result of this call to an array and look up if we need it again 



```go

func longestCommonSubsequence(text1 string, text2 string) int {
	m, n := len(text1), len(text2)
	dp := make([][]int, m+1)
	for i := range dp {
		dp[i] = make([]int, n+1)
	}

	for i := 1; i <= m; i++ {
		for j := 1; j <= n; j++ {
			if text1[i-1] == text2[j-1] {
				dp[i][j] = dp[i-1][j-1] + 1 
			} else {
				dp[i][j] = max(dp[i][j-1], dp[i-1][j])
			}
		}
	}

	return dp[m][n]

}

func max(a, b int) int {
	if a > b {
		return a
	}
	return b
}

```

here dp[i-1][j-1] keeps the result of lcsHelper(word1, word2, m-1, n-1) call 

we can also follow dp a table 

```
iterate the first row

s vs e 
0 common  

   |    s  e  a
---|------------
   | 0  0  0  0
e  | 0  **0**  0  0
a  | 0  0  0  0
t  | 0  0  0  0


se vs e 1

   |    s  e  a
---|------------
   | 0  0  0  0
e  | 0  0  1  0
a  | 0  0  0  0
t  | 0  0  0  0

sea vs e 1

   |    s  e  a
---|------------
   | 0  0  0  0
e  | 0  0  1  1
a  | 0  0  0  0
t  | 0  0  0  0


2nd row 

s vs ea 0 

   |    s  e  a
---|------------
   | 0  0  0  0
e  | 0  0  1  0
a  | 0  0  0  0
t  | 0  0  0  0

se vs ea 1 
   |    s  e  a
---|------------
   | 0  0  0  0
e  | 0  0  1  0
a  | 0  0  1  0
t  | 0  0  0  0

sea vs ea 2 common
   |    s  e  a
---|------------
   | 0  0  0  0
e  | 0  0  1  0
a  | 0  0  1  2
t  | 0  0  0  0

3rd row 

s vs eat 0 
   |    s  e  a
---|------------
   | 0  0  0  0
e  | 0  0  1  0
a  | 0  0  1  2
t  | 0  0  0  0

se vs eat 
   |    s  e  a
---|------------
   | 0  0  0  0
e  | 0  0  1  0
a  | 0  0  1  2
t  | 0  0  1  0

sea vs eat 

   |    s  e  a
---|------------
   | 0  0  0  0
e  | 0  0  1  0
a  | 0  0  1  2
t  | 0  0  1  2

```


at each step, it's enough to know the results of 3 prev calls 

dp[i-1][j-1], dp[i][j-1], dp[i-1][j]

It means we don't have remember all the table

```go
func longestCommonSubsequence(word1, word2 string) int {
	m, n := len(word1), len(word2)

	// Ensure m is the smaller of the two lengths for space optimization.
	if m > n {
		word1, word2 = word2, word1
		m, n = n, m
	}

	// Use a 1D DP slice to store the current row.
	dp := make([]int, n+1)

	for i := 1; i <= m; i++ {
		prev := 0 // Store the value from the previous row and column.
		for j := 1; j <= n; j++ {
			temp := dp[j] // Store the current value in dp[j].
			if word1[i-1] == word2[j-1] {
				dp[j] = prev + 1
			} else {
				dp[j] = max(dp[j], dp[j-1])
			}
			prev = temp // Update prev with the stored value.
		}
	}

	return dp[n]
}

```

