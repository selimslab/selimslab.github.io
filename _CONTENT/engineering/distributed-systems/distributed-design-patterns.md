---
---

There are so many patterns but you don't need to memorize them all because they are based on a smaller list of key ideas. When you encounter a problem, you can arrive at the same pattern using the fundamentals.  

- caching

- separating interfaces

- decoupling with queues or message brokers 

- reducing coordination necessity by assigning each worker a subset of work 

- batching work 

- reusing 

- async work 

- buffers 

- doing work upfront to simplify later stages, like indexing 

- dividing your data into more manageable pieces, sharding 

- using references to avoid moving large pieces of data 

- selecting an appropriate data store for the use case, like an object store for static assets, etc. 

- using a gateway to aggregating multiple requests to one 

- using separate subsystems for different concerns like auth, config, etc. 


**Many of them include a spectrum, for example** 

- central control vs autonomy

- divide vs aggregate

- couple vs decouple

- copies vs references 
 
- sync vs async 


https://learn.microsoft.com/en-us/azure/architecture/patterns/category/data-management







