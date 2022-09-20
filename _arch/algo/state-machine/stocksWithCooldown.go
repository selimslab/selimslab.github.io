/*
Say you have an array for which the ith element is the price of a given stock on day i.

Design an algorithm to find the maximum profit. 

You may complete as many transactions as you like 
(ie, buy one and sell one share of the stock multiple times) with the following restrictions:

You may not engage in multiple transactions at the same time 
(ie, you must sell the stock before you buy again). 

After you sell your stock, you cannot buy stock on next day. (ie, cooldown 1 day) Example:

Input: [1,2,3,0,2] 
Output: 3 
Explanation: transactions = [buy, sell, cooldown, buy, sell]
*/

func max(a int, b int) int {
    if a>b {
        return a
    }
    return b 
}

func maxProfit(prices []int) int {
    /*
    it's a state machine with 3 states can_buy,can_sell, and cool_down
    can_buy -> (buy) -> can_sell -> (sell) -> cool_down -> can_buy
    */
    
    // the game starts with can_buy, 
    can_buy := 0  
    // can_sell and cool_down are minInt because they will be possible after buying 
    can_sell := math.MinInt32 
    cool_down :=  math.MinInt32 
    
    for _, p := range(prices) {
        // either all has to be in a single line or we need to remember a prev value  
        can_sell_prev := can_sell
        can_sell = max(can_sell, can_buy-p) 
        can_buy = max(can_buy, cool_down) 
        cool_down = can_sell_prev + p 
    }
    
    // the game should end with no stock at hand 
    return max(can_buy, cool_down)
}