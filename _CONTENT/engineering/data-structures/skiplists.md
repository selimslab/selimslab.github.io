---
title: Skip Lists 
tags: search
---

Searching sorted data is a common use case 

For static data, you could simply use binary search over an array 

For dynamic data, one way is to balance a tree as you insert new elements. 

A simpler alternative is a skip list. A skip list has multiple sorted linked lists with shortcuts. 

A skip list uses log-linear memory while a tree uses linear. Both have logarithmic search and insert time. But the former is simpler to implement, better for concurrent operations due to this simplicity, better for caching due to its linear structure


### Example

#### Data:

Consider inserting the elements 10, 20, 30, 40, and 50 into a skip list.

#### Initial Skip List (empty):


```
Level 3: None 
Level 2: None 
Level 1: None 
Level 0: None
```


#### Inserting 10:

- Randomly determine the level, e.g., level 1.


```
Level 3: None 
Level 2: None 
Level 1: [10] 
Level 0: [10]

[10] is a single node with two next pointers for level 0 and 1
```




#### Inserting 20:

- Randomly determine the level, e.g., level 0.


```
Level 3: None 
Level 2: None 
Level 1: [10] 
Level 0: [10] -> [20]
```

#### Inserting 30:

- Randomly determine the level, e.g., level 2.


```
Level 3: None 
Level 2: [30] 
Level 1: [10] -> [30] 
Level 0: [10] -> [20] -> [30]
```


#### Inserting 40:

- Randomly determine the level, e.g., level 0.


```
Level 3: None 
Level 2: [30] 
Level 1: [10] -> [30] 
Level 0: [10] -> [20] -> [30] -> [40]
```


#### Inserting 50:

- Randomly determine the 
level, e.g., 
level 1.


```

Level 3: None 
Level 2: [30] 
Level 1: [10] -> [30] -> [50] 
Level 0: [10] -> [20] -> [30] -> [40] -> [50]
```


### Visual Representation

#### Skip List After All Insertions:


```

Level 3: None 
Level 2: [30] 
Level 1: [10] -> [30] -> [50] 
Level 0: [10] -> [20] -> [30] -> [40] -> [50]
```


### Search Example

- **Search for 40**:
    1. Start at the top level: Move to 30.
    2. Move to Level 1: 30 -> 50 (stop, greater than 40).
    3. Move to Level 0: 30 -> 40 (found).

