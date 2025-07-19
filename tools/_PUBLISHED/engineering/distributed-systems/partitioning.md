---
---

Break down data into managable pieces

Horizontal 
- Split rows 
- Each part will have the the same schema 

Vertical 
- Split columns 

Functional 
- Split by custom criteria, like domain boundaries or workload type, eg. 
  - read vs write 
  - hot vs cold data
  - real-time vs batch
  - OLAP vs OLTP

Risks
- hot spots 
- perf

[[consistent-hashing]]