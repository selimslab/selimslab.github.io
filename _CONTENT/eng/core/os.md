---
---
## sys
```
boot 
    power
    firmware 
    boot loader 
    kernel entry 
    virtual memory, mount fs
    systemd 

users: root, service account, regular, guest

caps: CAP_NET_ADMIN, CAP_SYS_ADMIN

systemctl: status, start/stop, enable/disable
    
systemd
    networkd, dhcpd, sshd, firewalld
    udevd, crond
    syslogd, journald
```

## proc 
```
address space: code data heap stack 

fork() exec() wait()

pthread
    create join
    mutex lock unlock
    cond wait signal
          
IPC
    shared memory: files, threads, mmap 
    msg passing: sockets, pipes
         
signals: SIGINT, SIGKILL, SIGHUP
    
virt
    host os, qemu, kvm
    vm, guest os, containerd, runc
    kubelet, kube-proxy, coredns
    pod, container, process
```

## fs 
```
inode: persistent struct with file metadata
block levels: direct, indirect, double indirect
mount point: dir where subtree is attached to fs tree

file permissions
    rwx - read, write, execute
    rwx rwx rwx : owner group other

access control lists, fs listacl

file
    open() close()
    read() lseek()
    fsync() 
    rename()
    link() unlink()
    
devices: block, character, pipe, socket
```