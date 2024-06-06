---
---

## Encodings

### languages specific, eg. python pickle 
   
restricted to one language and they have poor back/forward compatibility

### text, eg. json, csv

More generic, better human-readable, better compatibility than the former 

### binary, eg. protobuf, thrift 

more compact 

need to be decoded to be human readable

clear ways for compatibility 


1. via dbs 
2. via services, eg. REST, RPC  
3. via message passing, eg. brokers, actors
   
