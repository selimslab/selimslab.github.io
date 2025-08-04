---
---
immutable inputs, never modify input 

compose: separate logic and wiring, workflow orch 

fault tol: atomic ops, rollbacks, transparency

scale: partitions, sort-merge joins 

## perf 

columnar storage 

vectorized proc

avoid intermediate disk pers. in-mem proc with checkpoints 

declerative apis for optz.

pre-compute expensive ops 

minimize i/o: bring code and data closer. co-locate related data 


## spark 
- df 
- Delta lake table format: parquet + transaction log and metadata  
