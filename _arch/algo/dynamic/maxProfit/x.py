def maxProfit(prices: List[int]) -> int:
    if not prices:
        return 0
    buy = prices[0]
    profit = 0
    for price in prices:
        if price < buy:
            buy = price
        profit = max(price - buy, profit)
    return profit
