---
---
Load code
alloc mem
init address space

```
stack <- SP
    return address
    open files
    params
    local vars
heap
    new()
    malloc()
code <- PC or IP, program counter or instruction pointer
data

```
threads share code, data, heap 

time sharing
save/load registers to switch ctx

scheduler
policy vs mechanism

signals
SIGINT
SIGTERM

```
fork()
exec()

wait() 
zombie children 

pthread
    create
    join
    mutex 
        lock 
        unlock
    cond 
        wait 
        signal
```


## IPC
shared memory

mmap
files

pipes
sockets

qs

signals

