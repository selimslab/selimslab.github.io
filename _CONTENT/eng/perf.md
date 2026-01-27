---
---
## observe
```
think in terms of user

logs + correlation ids
events: logs, metrics, traces

define load metrics, SLOs
latency, throughput, bandwidth
cpu, disk, ram, network
error rates, status codes

distribution, percentiles, tail latency, histograms
randomization
statistical significance

profiling
    total time
    conc, parall
    causal: part vs whole 
```

## optimize
```
data 
    locality, seq. io 
    binary 
    parallel, SIMD

i/o
    mmap
    copy-on-write
    zero-copy

conc.
    lock-free 

db 
    index
    conn. pool

    query optimization
    denorm.

    replicas
    sharding

dsa
    prep
    sort

    share
    prune

    lazy 
    approximate

compiler
    pipelining
    branch prediction
    loop unrolling
```



