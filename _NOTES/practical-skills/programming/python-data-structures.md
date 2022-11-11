---
---


[collections](https://docs.python.org/3/library/collections.html)


```py 
dict
list
set
tuple
```

```py
def tree():
    return collections.defaultdict(tree)
```

```py
from enum import Enum

# class syntax
class Color(Enum):
    RED = 1
    GREEN = 2
    BLUE = 3

# functional syntax
Color = Enum('Color', ['RED', 'GREEN', 'BLUE'])
```


```py
from collections import deque

d = deque()

for i in range(10):
    d.append(i)

d.pop() # 9

d.popleft() # 0
```


```py
from heapq import heappush, heappop

def heapsort(iterable):
    h = []
    for value in iterable:
        heappush(h, value)
    return [heappop(h) for i in range(len(h))]
```