---
---
```
encoding
    text: json, csv 
    binary: avro, protobuf 

schema evolution
    keep unknown fields
    tags vs names: compact + rename later

breaking
    deleting required fields
    changing field types

old code -> new data 
old data <- new code 


ipc: db, services, messages 

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
