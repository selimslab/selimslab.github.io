---
---
```
acid: tx, FK, CHECK, .. 

isolation problems
1. dirty-read: see uncommitted 
2. non-repeatable read: same query, different result
3. phantom read: new rows appear or disappear
4. lost updates: conc. writes lose data
5. read-skew: existing rows change between reads
6. write skew: two tx reads same data to decide writes

solutions
1. read committed
2. snapshot/repeatable read: MVCC, must for analytics, backups 
3. serializable MVCC + SSI

SSI: serializable snapshot isolation
predicate locks + dep. cycles
```