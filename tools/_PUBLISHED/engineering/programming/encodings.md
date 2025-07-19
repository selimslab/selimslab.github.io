---
---


language-specific
- eg. python pickle 
- restricted to one language
- poor back/forward compatibility

text
- eg. json, csv
- More generic
- human-readable
- better compatibility  

binary
- eg. protobuf, thrift 
- compact 
- not human readable, need to be decoded 

Paths
1. via DBs 
2. via services, eg. REST, RPC  
3. via message passing, eg. brokers, actors
   

[[unicode]]