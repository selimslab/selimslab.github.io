import "fmt"

func uniquePaths(m int, n int) int {
    /*
A robot is located at the top-left corner of a m x n grid (marked 'Start' in the diagram below).

The robot can only move either down or right at any point in time. 
The robot is trying to reach the bottom-right corner of the grid 

How many possible unique paths are there?
    */
    p := make([]int, m)
    for i := range p{
        p[i] = 1
    }

    for i := 1; i < n; i++ {
        for j := 1; j < m; j++ {
            p[j] += p[j-1] 
        }
    }
        
    return p[len(p)-1]
}