---
tags: dist storage
---

Keeping the same data on multiple nodes 

A simple concept yet requires a lot of thought to implement well 

## Sync or Async?

1. sync -> wait for a write to be replicated on all nodes 
2. async -> write to the leader and async write followers  
3. semi-sync -> write to the leader and some of the followers and async write others 

## What to replicate?

1. SQL statements
   
   indeterministic, eg. now() 

2. WAL (write ahead log)
   
   depends on internal bytes layout of a specific db version, so an upgrade requires downtime 

3. Row based 
   
    higher level, easier to parse for external systems, nodes might run different versions of db

4. Trigger based 
   
   more flexible, custom application code, more prone to bugs, greater overhead 

## How to replicate?

[[single-leader]]

[[multi-leader]]

[[leaderless-replication]]