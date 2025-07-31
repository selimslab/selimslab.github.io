---
title: Skip Lists 
tags: search
---

You can search static data with a binary search. Dynamic data requires a balanced tree. An alternative is skip lists.
- Multiple levels of linked lists. 
- Simpler to implement 
- Better for concurrent ops 
- Better for caching due to linear structure
- nlogn memory vs n for trees 
- logn search and insert time 

Level 0 has all elements in sorted order. Higher levels has less and less items. 

For insert, choose a random level and insert at all levels below, too 

```
After inserting 10, 20, 30, 40, and 50 with random levels:

Level 3: None 
Level 2: [30] 
Level 1: [10] -> [30] -> [50] 
Level 0: [10] -> [20] -> [30] -> [40] -> [50]
```


For search, start at top, and move right, drop down if you overshoot. Repeat until level 0. 