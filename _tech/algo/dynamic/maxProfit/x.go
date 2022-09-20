func max(a int, b int) int {
    if a>b {
        return a
    }
    return b 
}

func min(a int, b int) int {
    if a<b {
        return a
    }
    return b 
}

func maxProfit(prices []int) int {
    if len(prices)==0{
        return 0 
    }         
    buy := prices[0]
    profit := 0 
    for _, price := range prices{
        buy = min(buy,price)
        profit = max(price-buy, profit)
    }
    return profit
}