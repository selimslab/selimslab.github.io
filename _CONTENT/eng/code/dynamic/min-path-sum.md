---

---


```go
func minPathSum(grid [][]int) int {
	/*
	Input: grid = [ [1,3,1],[1,5,1],[4,2,1] ]
	Output: 7
	Explanation: Because the path 1 → 3 → 1 → 1 → 1 minimizes the sum.
	*/
    rows := len(grid)
    cols := len(grid[0])
    
    // sum top row
    for j := 1; j < cols; j++ {
        grid[0][j] += grid[0][j-1]
    }
    
    // sum left column
    for j := 1; j < rows; j++ {
        grid[j][0] += grid[j-1][0]
    }
    
    for i := 1; i < rows; i++ {
        for j := 1; j < cols; j++ {
            grid[i][j] += min(grid[i-1][j],grid[i][j-1])
        }
    }
    
    return grid[rows-1][cols-1]
}
```