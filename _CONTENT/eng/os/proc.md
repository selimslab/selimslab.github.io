---
---
## address space
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

## conc. 
time sharing
save/load registers to switch ctx

scheduler
policy vs mechanism


## process api
```
fork()
exec()

wait() 
zombie children 

signals
    SIGINT
    SIGTERM

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

