---
---
atomicity: tx 
consistency: invariants, FK, constraints 
isolation: concurrent txs do not interfere
durability: WAL, replicas, fsync, power hardware

## tx 
group ops. to atomic units
no partial failure
consistency
fk integrity
data sync

## isolation problems
lost updates

1. dirty-read: see uncommitted 
2. non-repeatable read: same query, different result
3. phantom read: new rows appear or disappear
4. lost updates: conc. writes lose data
5. read-skew: existing rows change between reads
6. write skew: two tx reads same data to decide writes
may violate invariants, eg. no doctors remaining
needs serial isolation

# solutions

## read committed
only see committed rows
read-skew possible

## repeatable read
snapshot
only see data committed before tx began

solves read-skew 

impl. by MVCC
multi-version conc. control
each tx gets a snapshot (a set of tx ids)

analytics, backups

## serializable
prevent all races
solves phantoms and write-skew 

MVCC + SSI
20% perf cost

SSI: serializable snapshot isolation
predicate locks
dependency cycles

## dist tx
saga: commit or compensate

or replicate entire transaction log through consensus
