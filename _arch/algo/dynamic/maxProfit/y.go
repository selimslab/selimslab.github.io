func maxProfit(prices []int) int {
    maxProfit := 0 
    minSoFar := math.MaxInt16
    for i :=1; i<len(prices); i++{
        minSoFar = min(minSoFar,prices[i-1])
        maxProfit = max(maxProfit, prices[i]-minSoFar)
    }
    return maxProfit 
}

func max(a int, b int) int{
    if a > b {
        return a
    }
    return b 
}

func min(a int, b int) int{
    if a < b {
        return a
    }
    return b 
}