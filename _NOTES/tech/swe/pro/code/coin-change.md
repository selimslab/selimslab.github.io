---

tags: dp mid 

---



```python
from typing import List

def minimumCoinsRequired(coins: List[int], amount: int) -> int:
    # coinChange([1,2,5],11) == 3

    # Initialize a list to store 
	# the minimum number of coins needed for each amount.
    min_coins = [0] + [float('inf')] * amount
    
    # Iterate through each sub-amount from 1 to 'amount'.
    for sub_amount in range(1, amount + 1):
        # Consider each coin denomination.
        for coin in coins:
            if coin <= sub_amount:
                # Update the minimum number of coins needed for the current sub-amount.
                min_coins[sub_amount] = min(min_coins[sub_amount], min_coins[sub_amount - coin] + 1)
    
    # If it's not possible to make up the amount, return -1. Otherwise, return the minimum count.
    if min_coins[amount] == float('inf'):
        return -1
    else:
        return min_coins[amount]

```

```go
package main

import (
	"fmt"
	"math"
)

func coinChange(coins []int, amount int) int {
	// Initialize a slice to store the minimum number of coins needed for each amount.
	minCoins := make([]int, amount+1)
	for i := 1; i <= amount; i++ {
		minCoins[i] = math.MaxInt32
	}

	// Iterate through each sub-amount from 1 to 'amount'.
	for subAmount := 1; subAmount <= amount; subAmount++ {
		// Consider each coin denomination.
		for _, coin := range coins {
			if coin <= subAmount {
				// Update the minimum number of coins needed for the current sub-amount.
				if minCoins[subAmount-coin]+1 < minCoins[subAmount] {
					minCoins[subAmount] = minCoins[subAmount-coin] + 1
				}
			}
		}
	}

	// If it's not possible to make up the amount, return -1. 
	# Otherwise, return the minimum count.
	if minCoins[amount] == math.MaxInt32 {
		return -1
	}
	return minCoins[amount]
}

func main() {
	coins := []int{1, 2, 5}
	amount := 11
	result := coinChange(coins, amount)
	fmt.Println(result) // Output: 3
}

```