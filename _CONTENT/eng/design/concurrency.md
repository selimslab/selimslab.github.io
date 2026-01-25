---
---
```
race: outcome depends on timing/order

cause: shared access + write + no sync 

don't share access
    confine 
    monitor 
    single writer 

    event loop
    scheduler with thread pool?

sync 
    locking
        mutex
        cond. var 

    msg passing 
        q, chan 
        actors with supervisor trees

    lock-free
        immutable
        atomics
            compare-and-swap
            test-and-set 
        CRDT


race eg. 
    deadlock, livelock

    read-modify-write
    check-then-act
    ABA

    cache coherence

    init
    destruct
    interrupt
```
