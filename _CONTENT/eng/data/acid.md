---
---
```
acid: TX, FK, CHECK, WAL, .. 

isolation problems
    reads
        dirty
        non-repeatable
        phantom
        read-skew

    writes 
        lost 
        decision skew

solutions
    1. read committed
    2. snapshot/repeatable read: MVCC, must for analytics, backups 
    3. serializable MVCC + SSI

SSI: serializable snapshot isolation
    predicate locks + dep. cycles
```
