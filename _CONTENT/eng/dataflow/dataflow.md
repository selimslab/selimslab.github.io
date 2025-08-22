---
---
Data flow: db, api, msg passing

push: pubsub, ws, sse, webhook 
pull: poll, query 

stream: events
batch: cron

req-resp: sync comm.
q: async msg passing

MPI: Message passing interface - no central coordinator, nodes communicate directly



## encoding 
language specific: pickle
text: json, csv
binary: protobuf, thrift, avro

## compatibility
backward: old data, new code
rolling upgrades

breaking:
deleting required fields
changing field types

keep unknown fields
tags vs names: compact + rename later
