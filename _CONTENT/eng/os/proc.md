---
---
```
address space
    code <- IP or PC
        instruction pointer or program counter
    data
    heap
        malloc
    stack <- SP
        params
        return address
        local vars
        open files

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

virt
    host os, qemu, kvm
    vm, guest os, containerd, runc
    kubelet, kube-proxy, coredns
    pod, container, process
```
