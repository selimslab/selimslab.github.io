---
---
## acid

atomicity
consistency
[[isolation]]
durability: WAL, replicas, fsync, power hardware

tx
group ops. to atomic units
no partial failure
consistency
fk integrity
data sync



## data flow
db
api
msg passing

push: pubsub, ws, sse, webhook
pull: query, poll

stream: events
batch: cron

req-resp
q

MPI: message passing interface
no central coordinator
nodes communicate directly


## encoding
backward comp: old data, new code

breaking:
deleting required fields
changing field types

keep unknown fields
tags vs names: compact + rename later
