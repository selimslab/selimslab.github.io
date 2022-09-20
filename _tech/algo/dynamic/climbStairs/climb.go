func climbStairs(n int) int {
    memo := map[int]int{
        1:1,
        2:2,
    }
    var climb func(n int) int

    climb = func (n int) int {
        _, ok := memo[n];
        if !ok {
            memo[n] = climb(n-1) + climb(n-2)
        }
        return memo[n] 
    }
    return climb(n)
}