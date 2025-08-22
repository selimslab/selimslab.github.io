---
---
lost updates

## read skew
non-repeatable reads
read values change during tx

## phantom reads
the set of rows matching a query changes bw reads
needs predicate locks. can cause write skew

## write skew
read same data to decide different writes
may violate invariants, eg. no doctors remaining
needs serial isolation