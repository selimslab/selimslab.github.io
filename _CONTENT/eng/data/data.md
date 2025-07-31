---
---


## encoding 
language-specific: eg. python pickle   
text: eg. json, csv  
binary: compact. eg. protobuf, thrift 

## Unicode
a standard to encode text. It assigns unique code points to characters.   
5: U+0035  
A: U+0041

UTF: Unicode Transformation Format
UTF-8: uses 8-bit blocks. one byte for ascii, up to 4 bytes for the rest. 


## IPC

- Fastest: Shared memory (direct access)
- Most portable: Pipes, sockets
- Most scalable: Message queues, brokers
- Simplest: Files, signals

## MPI

Message passing interface 

HPC

no central coordinator. nodes know each other, and directly communicate


## Data flow bw nodes
1. via DBs 
2. via APIs, eg. REST, RPC  
3. via message passing, eg. brokers, actors

