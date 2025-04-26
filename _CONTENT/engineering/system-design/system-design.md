---
---

Input -> System -> Output

At a high enough level, most systems do the same thing: read data, process it, and write your output

- store data and retrieve data
  - various stores for each use case
  - index and cache retrieve faster 
  - partition to make data manageble 
  - replicate to make data available and recover from faults 
- queue to make things flow smoother, to decouple systems
- APIs to define system boundaries 
- distribute the work, make things parallel 
