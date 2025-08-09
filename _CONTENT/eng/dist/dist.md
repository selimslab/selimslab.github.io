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




  Distributed systems require solving fundamental coordination problems: keeping data consistent across multiple unreliable machines
  connected by unreliable networks.

  Core Practical Ideas:

  1. Use proven consensus patterns like Paxos or Raft to elect leaders and coordinate decisions across nodes
  2. Implement replicated logs - write operations to a log first, then apply them to ensure all nodes see the same sequence of changes
  3. Design with logical clocks and versioning - use timestamps and version vectors to order events when physical clocks can't be
  trusted
  4. Build fault tolerance through quorums - require majority agreement before committing changes
  5. Make operations idempotent - ensure repeating the same operation produces the same result to handle network retries
  6. Use single-threaded processing queues - process updates in order to maintain consistency
  7. Implement heartbeats and leases - detect failed nodes and reassign responsibilities automatically
  8. Batch operations and pipeline requests - reduce network overhead and improve throughput
  9. Partition data intelligently - distribute load while maintaining locality for related data
  10. Use gossip protocols - spread information efficiently across the cluster without central coordination

  These patterns solve the three core challenges: consensus (agreeing on what happened), consistency (keeping data synchronized), and
  availability (continuing to work despite failures).


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
