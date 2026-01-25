---
---
## address space
```
code <- PC program counter or IP instruction pointer

data

stack <- SP
    return address
    open files
    params
    local vars

heap
    new()
    malloc()
```

time sharing, save/load registers to switch ctx
scheduler: policy vs mechanism

```
fork()
exec()
wait()

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

```
IPC
    shared memory
        threads
        mmap
        files
    
    msg passing 
        sockets 
        pipes

signals 
    SIGINT
    SIGTERM
    SIGHUP
```

## virt
```
host os, qemu, kvm
vm, guest os, containerd, runc
kubelet, kube-proxy, coredns
pod, container
```
