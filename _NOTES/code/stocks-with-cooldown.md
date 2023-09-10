---

tags: dp

---



## Stocks with 1 day cooldown

<https://leetcode.com/problems/best-time-to-buy-and-sell-stock-with-cooldown/submissions/>

```go
func maxProfit(prices []int) int {
    /*
    it's a state machine with 3 states 

    can_buy, can_sell, cool_down

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
```
