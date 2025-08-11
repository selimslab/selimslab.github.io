---
---
group ops. to atomic units, no partial failure
- consistency
- fk integrity
- data sync

distributed tx: 10x perf. penalty, coordinator spof, often avoided
- 2PC: ask all, commit if they all ack. blocks if coord. fails after prepare
- saga: commit or compensate
