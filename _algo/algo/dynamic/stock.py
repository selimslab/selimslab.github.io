def maxProfit(k: int, prices) -> int:
    if not prices:
        return 0

    if k >= len(prices) // 2:
        # max profit is possible
        ans = 0
        prev = prices[0]
        for p in prices:
            if p > prev:
                ans += p - prev
            prev = p
        return ans

    dp = [0] * len(prices)
    for t in range(k):
        pre = 0
        for day in range(1, len(prices)):
            cur = prices[day] - prices[day - 1]

            print(prices[day])

            print(pre, cur)
            print(pre + cur, dp[day])
            pre = max(pre + cur, dp[day])
            print(dp[day - 1], pre)
            dp[day] = max(dp[day - 1], pre)
            print(dp, "\n")

    return dp[-1]


maxProfit(2, [1, 4, 2, 7, 6, 8])
