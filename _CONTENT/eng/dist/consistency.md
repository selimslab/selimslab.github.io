---
---
preserve invariants

1. linearizable: single copy illusion.
- single leader +  election consensus (with lease + fencing token)

2. causal: eg. question before reply
- vector clocks + causal dep. tracking

3. eventual

## session models
- read after write: route writes to same leader
- monotonic reads
- consistent prefix reads: causal
