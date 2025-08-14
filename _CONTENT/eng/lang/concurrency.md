---
---
hw atomic ops
compare-and-swap
test-and-set
fetch-and-add
memory barrier/fence

basic sync
mutex/lock
condvar
sem
r/w lock

msg passing
channels
actors
msg qs
ring buffers

lock-free
using atomic hw: map, q, stack, list
concurrent maps, blocking qs
CRDT (Conflict-free Replicated Data Types)

async
future/promise, async/await
event loop, coroutines
task schedulers with thread pools, C# Task

coordination: barriers, monitor

high-level
STM
actors with supervisor trees
event-driven via dist. q

## go
sync .Mutex .Cond .Once .WaitGroup .RWLock
sync.atomic
select for channel mux

## csharp
async/await Task<T>
lock
Monitor, Semaphore
Parallel.ForEach, PLINQ
ConcurrentQueue, ConcurrentDict

## py
asyncio
threading
multiprocessing
thread-safe queue.Queue
concurrent.futures ThreadPool, ProcPool

## c
pthread: create join mutex cond rwlock
mutex lock unlock
cond wait signal
std.atomic
