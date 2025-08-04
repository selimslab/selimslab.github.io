---
---
## idempotency
1. db: unique, where, upsert
2. unique ids
3. http get, put, delete are idp. 
4. app logic


## Data flow
1. via DBs 
2. via APIs, eg. REST, RPC  
3. via message passing, eg. brokers, actors

## IPC
- Fastest: Shared memory (direct access)
- Most portable: Pipes, sockets
- Most scalable: Message queues, brokers
- Simplest: Files, signals
  
## MPI: Message passing interface 
no central coordinator  
nodes know each other, and directly communicate

## proc

spark 
- df 
- Delta lake table format: parquet + transaction log and metadata  
