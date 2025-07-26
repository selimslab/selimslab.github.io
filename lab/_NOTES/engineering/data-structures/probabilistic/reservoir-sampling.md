---
---

Sample k random items from a stream 

linear time, constant(k) space 

```py
import random

def reservoir_sample(stream, k):
    reservoir = []
    
    # Fill reservoir with first k elements
    for i in range(k):
        try:
            reservoir.append(next(stream))
        except StopIteration:
            return reservoir
    
    # For each stream item, 
    # generate a random number j between 1 and i 
    # if j<=k, replace reservoir item 
    i = k
    for item in stream:
        i += 1
        j = random.randint(1, i)
        if j <= k:
            reservoir[j-1] = item
            
    return reservoir
```