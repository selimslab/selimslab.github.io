---
tags: 
    - dynamic
---

[[dynamic]]

```python
def coinChange(coins: List[int], amount: int) -> int:
    # coinChange([1,2,5],11) == 3
    min_coins = [0] + [float('inf')]*amount
    for sub_amount in range(amount+1):
        for coin in coins:
            if coin <= sub_amount:
                min_coins[sub_amount] = min(min_coins[sub_amount], min_coins[sub_amount-coin]+1)
    
    if min_coins[-1] == float('inf'):
        return -1
    else: 
        return min_coins[-1]
```