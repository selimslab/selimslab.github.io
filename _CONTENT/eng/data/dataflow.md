---
---
## comm. 
```
ipc
    db
    services, api, rpc, http 
    msg passing, q

    push: pubsub, ws, sse, webhook
    pull: query, poll
    q: decouple, buffer 

MPI, message passing interface
    no central coordinator
    nodes communicate directly

delivery semantics 
    exactly once
        producer retry + consumer dedup 
        producer outbox + consumer ack in tx 
```

## dataproc
```
batch
    atomic ops on seq. data 
    delta lake: parquet + transaction log + metadata

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
        checkpoint
        watermark
        grace period
        publish correction

    windows: fixed, overlapping, sliding, session

    log compaction
    joins 
    probabilistic dsa
```
