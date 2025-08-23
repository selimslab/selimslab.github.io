---
---
## problems 
lost updates

read skew
non-repeatable reads
read values change during tx

phantom reads
the set of rows matching a query changes bw reads
needs predicate locks. can cause write skew

write skew
read same data to decide different writes
may violate invariants, eg. no doctors remaining
needs serial isolation


## read committed
only see committed rows
read-skew possible

## snapshot
repeatable read
only see data committed before tx began

solves read-only phantoms

analytics, backups

impl. by MVCC

## serializable
prevent all races

ways
single thread
2PL: bad perf
MVCC + SSI, ~20% perf cost

## MVCC
multi-version conc. control
each tx gets a snapshot (a set of tx ids)

## SSI
serializable snapshot isolation

predicate locks
deps. cycles
