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
atomic hw
lock/sem/cond
monitor
lock-free, crdt
q
actor
event loop
thread pool

atomic
compare-and-swap
test-and-set
fetch-and-add
memory barrier/fence

mutex
rwlock

cond
sem

barrier
monitor

q
msg q
ring buffer

blocking q
channel

actors with supervisor trees

concurrent map/set/list

lock-free ds
CRDT (Conflict-free Replicated Data Types)

future/promise
async/await
event loop, coroutines

task schedulers with thread pools, eg. C# Task

STM
