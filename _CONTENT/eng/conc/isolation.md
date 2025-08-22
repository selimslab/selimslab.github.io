---
---
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
1. serial, single thread
2. 2PL: bad perf
3. MVCC + SSI, ~20% perf cost

## MVCC
multi-version conc. control
each tx gets a snapshot (a set of tx ids)

## SSI
serializable snapshot isolation

predicate locks
deps. cycles
