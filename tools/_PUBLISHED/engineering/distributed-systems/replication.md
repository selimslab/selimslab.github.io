---
---

the same data on multiple nodes 

Why? fault tolerance, latency, scale 

can be sync, async, or semi-sync 

## What to replicate?

SQL statements: indeterministic, eg. now() 

WAL (write ahead log): depends on internal memory layout of a specific db version so upgrades bring downtime

Rows: higher level, easier on external systems, nodes can be on different db versions 

Trigger based: custom code, more flexible, more bug risk and overhead 

## Single leader 
Extensions for Postgres, MySQL

## Leaderless
Resolve conflicts by read-repair or background anti-entropy 

## Multi-leader
Makes more sense in a multiple datacenter setup. Offline clients and collaborative editing are also similar to a multi leader setup. 
