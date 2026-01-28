---
---
```
delta lake: parquet + transaction log + metadata

batch
    atomic ops on seq. data 

stream
    immutable events

    time 
        event 
        delivery 
        processing  

    flow control
        backpressure
        circuit breaker

    consumer lag
        grace period
        publish correction

    checkpoint
    watermark
    
    windows: fixed, overlapping, sliding, session

    log compaction
    joins 
    probabilistic dsa
```
