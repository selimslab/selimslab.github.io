---
tags: heap string
---

```python
import heapq
from heapq import heappush, heappop, heapify

def longestDiverseString(a: int, b: int, c: int) -> str:
    
    ans = 0
    
    # get 2 from max, 1 from min 
    
    minh = [a,b,c]
    maxh = [a,b,c]

    heapify(minh)
    heapq._heapify_max(maxh)
    
    
    maxnum = heappop(maxh)
    minnum = heappop(minh)


    while maxnum or minnum:
        if maxnum:
            print("maxh",maxh)

            if maxnum > 1:
                heappush(maxh, maxnum-2)
                ans += 2
            

            else:
                ans += 1
            
            if maxh:
                maxnum = heappop(maxh)
                
        if minnum:
            print("minh",minh)
            if minnum > 0:
                ans += 1
                heappush(minh, minnum-1)

                minnum = heappop(minh)

    print(ans)
    return ans 


longestDiverseString(7,1,1)
```