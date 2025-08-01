---
---
## boot 

1. bios 
2. boot loader
3. kernel init 
4. device/driver init 
5. root fs mount 
6. init PID 1, user space starts
7. user login 


## user space startup 
1. init PID 1 systemd 
2. low level: daemons, syslogd
3. network config 
4. mid level: like cron 
5. high level: login prompt, gui, apps


systemd is the first process. manages units like .service .socket .mount 

config in /etc/systemd/system/

systemctl: status, start, stop, restart, enable, disable, ..

journalctl 

## proc/PID

address space 
- stack <- SP, stack pointer 
- heap
- code <- PC, program counter or IP, instruction pointer
- data

Threads share address space 

stack 
- return address
- params
- open files
- local variables

heap: new(), malloc()  

fork, exec, wait 

signals 


## CPU

caches: L1, L2 per core. L3 shared 

fetch-decode-execute

## sockets 

unix, ipv4, ipv6 sockets 

stream vs datagram sockets like tcp vs udp 

socket() -> bind() -> listen() -> accept()

read() write()  

send() recv()

## files 

array of bytes 

inode, filetypes, blocks, dirs, hardlinks, symlinks

block levels: direct, indirect, double indirect for large files 

file descriptor: integer handle for open files  

inodes: persistent struct with file metadata   

mount point: dir where file sys is attached to tree 

permission bits: rwx - read, write, execute 

rwx rwx rwx : owner group other

access control lists for more control: fs listacl

fsync() and rename() for atomic file updates 

open() read() lseek() close()

mkdir, opendir, readdir, closedir

stat()

link() unlink()

mkfs creates empty fs on partitions

strace() syscall tracing 

## containers 

Containers provide more process isolation, ease, and control on top of what OS provides  



## devices 

block   
character   
pipe    
socket  

/dev/null, /dev/zero, /dev/random


## threads 

pthread 

create  
join 

mutex lock unlock   
cond wait signal 


