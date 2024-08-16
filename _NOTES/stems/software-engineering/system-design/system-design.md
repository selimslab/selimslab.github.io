---
tags: systems
---

There are many kinds of tech with different tradeoffs but at the high level, many systems are built over the same fundamental ideas. 

The starting point is why we are doing something in the first place, that is to create something useful. For that, most of the time a system needs a way to get some input, produce some output, store and retrieve data,  be reasonably fast and easy to use, respectful to the user and her time, to keep working even if some internal parts of it are broken, be reliable, not be wasteful or unnecessarily expensive, easy to monitor, easy to fix, easy to improve, thus easy to understand

Not an exhaustive list but all the tools and tech we use are there to address a part of such concerns

For example, we often need to store some data and use it later. People created all kinds of data stores for it. 

Relational DBs organize data as tables of rows and columns, they help to enforce rules on data, to keep it consistent, to recover from errors

Columnar DBs help with analytical workloads by storing columns together instead of rows 

It's possible to organize data as key-value pairs, documents, or as a graph. Each one is optimized for its use case. 

Indexing does the hard work upfront and makes it easier to search later 

Caching helps to get load off the data stores by reusing previous work 

Queuing helps to make things async, to decouple systems, to deliver messages to multiple systems 

APIs provide an interface for systems to interact with each other. 

Redundancy helps to ensure the system keeps up when some of its parts are down 

Load balancers and consistent hashing help with distributing load 

