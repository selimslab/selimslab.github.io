---
---
## data flow 
1. via DBs 
2. via APIs, eg. REST, RPC  
3. via message passing, eg. brokers, actors

rpc only needs bw comp. since we can assume servers update first 

msg broker benefits: decoupling, buffering, auto-retry, discovery, fan-out, broadcast


## IPC
- Fastest: Shared memory (direct access)
- Most portable: Pipes, sockets
- Most scalable: Message queues, brokers
- Simplest: Files, signals

## MPI: Message passing interface 
no central coordinator  
nodes know each other, and directly communicate
