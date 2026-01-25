---
---
## observe
```
logs + correlation ids
events: logs, metrics, traces
think in terms of user

simulate
progressive rollouts
test in prod
postmortem
```

## measure$$
```
load metrics 
SLOs

distribution
percentiles

tail latency 
add histograms

net 
    latency percentiles
    throughput 
    bandwidth 
cpu 
disk 
metrics 
    error rates 
    http status codes 


profiling
    traditional: total time
    modern: conc/parall

    causal: if x speeds up by 10%, how much the whole system speeds up?

    randomization
    latency/throughput
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



