---
---
## from scratch 
- Electric current: open/close, 0/1
- Base 2, boolean logic, AND, OR, NOT, IF, logic gates
- Mechanical switch → vacuum tube → transistor (npn, pnp)
- Memory cell → bit → byte
- Program: set of instructions
- Instruction: opcode and operand (e.g., LOAD 0010, PUSH, POP, JUMP)
- CPU: ALU, control unit, memory unit
- Memory, disk

## boot 

1. bios 
2. boot loader
3. kernel init 
4. device/driver init 
5. root fs mount 
6. init PID 1, user space starts
7. user login 

user space startup, systemd
1. init PID 1
2. low level services, daemons, syslogd
3. network config 
4. mid level services like cron 
5. high level, login prompt, gui, apps

systemd init system, the first process

it manages units like .service .socket .mount

config in /etc/systemd/system/

systemctl: status, start, stop, restart, enable, disable, ..

journalctl 

## Process

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


## networking 

app - transport - internet - phys 

ipv4 32 bits 

ipv6 128 bits, stateless, no dhcp needed

cidr 10.23.2.0/24 = network/mask = freeze first 24 bits

private nets 10.0.0.0/8, 192.168.0.0/16, 172.16.0.0/12

cmds 

ping
ip: config
netstat: connections 
host, sysctl 


DHCP auto ip assignment, lease based 

dns resolution: app → library → nsswitch.conf → /etc/hosts → DNS

/etc/services maps port numbers to service names


firewall, iptables

NAT: share single public ip for internal network 

