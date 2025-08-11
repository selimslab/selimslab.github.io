---
---
## concurrency problems
lost updates

read skew: non-repeatable reads. read values change during tx.

phantom reads: the set of rows matching a query changes bw reads.
- needs predicate locks. can cause write skew

write skew: read same data to decide different writes.
- may violate invariants, eg. no doctors remaining
- needs serial isolation

## read committed
only see committed rows.
- read-skew (non-repeatable reads) possible

## snapshot
or repeatable read
only see data committed before tx began
solves read-only phantoms

analytics, backups

MVCC: multi-version conc. control. rows have each tx gets a snapshot (a set of tx ids)

## serializable
prevent all race conds.

ways
1. serial, single thread
2. 2PL: traditional, bad perf
3. MVCC + SSI, ~20% perf cost

SSI: serializable snapshot isolation. predicate locks + deps. cycles

## postgres
SET TRANSACTION ISOLATION LEVEL
- READ COMMITTED
- REPEATABLE READ
- SERIALIZABLE
