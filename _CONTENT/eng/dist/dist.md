---
---
## dist troubles 

network    
time/order    
partial failures


## time 

NTP - network latency 

GPS - satellite latency, normally lower than network 

vector clock: a list of counters for each node [c1, .. cn]


## ID generation 

UUID not sortable 

ID server: SPOF

timestamp + data center id + machine id + sequence number 


## detect failures 

heartbeats, pings  
- phi accrual: adapt to network conditions. prob. dist. of heartbeat arrivals in a sliding window

lease: timeout 

gossip 





## trouble 

  • Network failures are inevitable - messages lost, delayed, duplicated,
   reordered
  • Use timeouts carefully - balance false failures vs delayed recovery•
  Never trust synchronized clocks - use logical counters for event
  ordering
  • Process pauses happen - GC, virtualization, OS scheduling cause
  unexpected delays
  • Build quorum-based decisions - single nodes cannot make critical
  choices alone
  • Implement fencing tokens - prevent split-brain in leader election
  • Design for crash-recovery - nodes fail and restart losing memory
  state
  • Monitor clock drift - remove nodes with excessive time deviation
  • Test network partitions - artificially simulate failures with chaos
  engineering
  • Assume partial failures - the defining characteristic of distributed
  systems
  • Safety properties must never be violated - even during total system
  failure
  • Use adaptive timeouts - adjust based on observed system behavior
  • Build suspicion into design - pessimism and paranoia are survival
  traits
  • Embrace uncertainty - think in confidence intervals not absolutes
  • Something is always broken - in large distributed systems this is
  normal