---
---
## schema
```
encoding
    text 
    binary 

schema evolution
    avro 
    protobuf 

    keep unknown fields
    tags vs names: compact + rename later

    breaking
        deleting required fields
        changing field types

    old code -> new data 
    old data <- new code 
```

## integrity
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


## proc
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

## comm 
```
ipc
    db, services, messages 

    push: pubsub, ws, sse, webhook
    pull: query, poll
    q: decouple, buffer 

    MPI: message passing interface
        no central coordinator
        nodes communicate directly

delivery semantics 
    exactly once
        producer retry + consumer dedup 
        producer outbox + consumer ack in tx 
```