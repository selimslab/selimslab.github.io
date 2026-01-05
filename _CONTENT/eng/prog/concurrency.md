---
---
## races
outcome depends on timing/order

shared access w/o sync
at least one write

read-modify-write
check-then-act
ABA
cache coherence

init
destruct
interrupt

deadlock
livelock

## solutions

q
actor
event loop
thread pool

atomics
compare-and-swap
test-and-set
fetch-and-add
memory barrier/fence

lock-free
CRDT (Conflict-free Replicated Data Types)

mutex
rwlock

condition var
sema

barrier
monitor
concurrent collections

q
msg q
ring buffer

future/promise
async/await
event loop, coroutines

task schedulers with thread pools, eg. C# Task
actors with supervisor trees
STM
