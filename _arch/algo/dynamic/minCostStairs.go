func minCostClimbingStairs(cost []int) int {
    c1,c2 := cost[0], cost[1]
    var min = func(a int,b int) int {
        if a<b{
            return a
        }
        return b 
    }
    
    for i:=2; i<len(cost); i++{
        c1, c2 = c2, cost[i] + min(c1,c2)
    }
            
    return min(c1,c2)
            
}