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


## virt

L1, L2 per core 64kb, 1mb
L3 shared 32mb

x86/x64 rings
ring 0: kernel mode
ring 3: user mode

disk
hdd
ssd: sata | nvme


```
thread
process

containers
pod

kubelet
kube-proxy
coredns

containerd
runc

guest os
vm

qemu
kvm

host os

CPU MMU disk

node
```
