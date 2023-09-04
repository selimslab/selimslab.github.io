---
tags: sys 
---

DDD emphasizes close collaboration among domain people, designers, UI/UX, business, product, and engineering. This collaboration enables a shared language and deeper understanding. 

The context is another key idea. The same word can mean different things depending on the team. So DDD emphasizes clear boundaries of meaning between sub-systems. 

A frequent pattern is defining the core layer of models and business logic, independent of any specific technology. And building the rest as replaceable layers around this core, like an onion. People call it hexagonal architecture or clean architecture. 

This is the model-driven way and useful in many cases but it's not the only way. Systems have different needs and usage patterns. 

For example, for a database-driven system, it might make sense to express this core layer with a relational database leveraging the strengths of the database system like relationships and constraints. 

In some other cases, it might make sense to drive design from UI experiments and user feedback. 

Another system might have a few core data types and many different operations on them, then a functional approach could be more expressive. 

The bottom line is that there is no one true way. A good idea is good in its context. Yet the core process is sound. When we listen well, collaborate, think deeply, and care about our work, the results are delightful. 