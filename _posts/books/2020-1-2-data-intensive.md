---
layout: post
title: Designing Data-Intensive Applications 
tags: books-tech
category: Tech 
---
 

<img height="250"  src="https://i.gr-assets.com/images/S/compressed.photo.goodreads.com/books/1415816873l/23463279.jpg" /> 

ideas to design reliable, scalable, maintainable systems


# Storage and retrieval

## OLTP 
Transaction processing

User facing 

Huge volume of simple requests

Disk seek time 

### Update in place school 
B trees, major RDMS

### Log structured school
Only permits appending to files

Never updates 

Cassandra, hbase, lucene 

Key idea is turning random access writes to sequential writes on disk 

Enables higher throughput

## OLAP analytics 

Low volume of complex requests

Disk bandwidth

indexes are less relevant 

Minimize read amount 

Encode compactly 


## Replication

Keeping a copy of data on multiple places 

Can serve several ends 

High availability 

Offline operation 

reduce latency

Scalability

Concurrency

Network faults 



## Consistency and Consensus

Linearity

Causality

A lot of problems can be reduced to consensus 

Zookeeper 


## Batch processing 

Unix pipelines awk grep sort

Immutable inputs 

do one thing well

Lego like components


Hadoop map-reduce hdfs

Framework handles fault tolerance. Many problems reduced to a retry 

Final output is as if no fault, even there are many 

Input is bounded, fixed size 



## Stream processing

Message brokers and event logs instead of a file system 

user activity, sensors, finance
 

#### Purposes

Searching for event patterns -  event processing

Computing windowed aggregations - stream analytics 

Keeping derived data systems up to date - materialized views 




## Transactions 

abstraction 

Reduces many errors to a simple transaction abort 

Network 

Power 

Process crash

Disk full

concurrency


## The Lambda Architecture

Update batch views with real time stream results 


## Concurrency models

Threads and locks

Functional programming

Separating identity from state - clojure way, STM 

actors 

CSP - communicating sequential processes 

data parallelism 

Lambda architecture 

## Partitioning 
Key range based 
Hash based 


## Encoding

Backward and forward compatibility 

1. Language specific eg. Pickle 
2. JSON, CSV, XML 
3. Binary, schema driven, like protobufs

Usecases

Databases

RPC 

Rest APIs 

Async messaging 

