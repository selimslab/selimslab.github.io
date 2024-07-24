---
title: Skip Lists 
---

Searching sorted data is a common use case 

A binary search tree would work well for static data. since it searches in logarithmic time but inserts in linear time 

For dynamic data, one way is to keep a tree and balance the tree as you insert new elements. 

A simpler alternative is a skip list. It has multiple linked lists and it balances probabilistically 
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

