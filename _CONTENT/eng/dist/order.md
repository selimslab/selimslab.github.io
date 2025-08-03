---
---
## time 

NTP - network latency 

GPS - satellite latency, normally lower than network 

vector clock: a list of counters for each node [c1, .. cn]


## anti-entropy 
- read repair: compare replica responses 
- compare hash digests, full read only when mismatch 
- merkle hash tree
- hints: store failed rights as hints on neighbors 
- vector clocks 

## coordination  

a fencing token is an increasing number. a lease has a token to prevent split-brain 
