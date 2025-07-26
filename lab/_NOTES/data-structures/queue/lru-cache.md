---
---

``` py 

"""

Implement an LRU (Least Recently Used) cache. An LRU cache is a data structure that stores a fixed number of items and automatically evicts the least recently accessed item when the capacity is exceeded. The cache should support the following operations:

Get(key int): string
Put(key int, value string)
You can assume the cache stores numbers as keys, and strings as values.

7-12-8-6-5

"""

from dataclasses import dataclass
from heapq import heapify, heappush, heappop

@dataclass
class Node:
    key: int
    val: str
    pre: Node = None
    nxt: Node = None


class LRUCache:
    # 7-12-8-...-6-5-..
    # 1-2-3-4-5
    # 

    def __init__(self, cap:int):
        self.head = Node(0,"")
        self.cache = {}

    def get(self, key:int)->str:


    def put(self, key:int, val:str):

        
```  


        


