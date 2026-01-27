---
---
## observe
```
think in terms of user

logs + correlation ids

events: logs, metrics, traces

simulate
progressive rollouts
test in prod
postmortem

load metrics, SLOs

latency, throughput, bandwidth, cpu, disk, error rates, status codes

distribution, percentiles, tail latency, histograms

profiling
    total time
    conc/parall
    causal: if x speeds up by 10%, how much the whole system speeds up?

randomization
statistical significance
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



